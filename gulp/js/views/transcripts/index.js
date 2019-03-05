app.views.TranscriptsIndex = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_index.ejs']),
  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_item.ejs']),

  className: 'transcripts-wrapper',

  events: {
    'click .list-next': 'nextPage'
  },

  initialize: function(data){
    this.data = data;
    this.render();

    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');
    this.transcripts = [];

    // Allow config to specify default sort name and order.
    this.defaultSortName = null;
    this.defaultSortOrder = null;
    if (!!Amplify.getConfig('homepage.search.sort_options.active_sort')) {
      this.sortName = this.defaultSortName = Amplify.getConfig('homepage.search.sort_options.active_sort');
    }
    if (!!Amplify.getConfig('homepage.search.sort_options.active_order')) {
      this.sortOrder = this.defaultSortOrder = Amplify.getConfig('homepage.search.sort_options.active_order');
    }
    if (this.data.queryParams) {
      this.loadParams(this.data.queryParams);
    }
    this.loadTranscripts();
    this.loadCollections();
    this.loadListeners();
  },

  addList: function(transcripts) {
    this.transcripts = this.transcripts.concat(transcripts.toJSON());

    if (this.isFaceted()) {
      this.facet();
    }
    else {
      // Use default sort.
      if (!!this.defaultSortName) {
        this.transcripts = this.sortTranscripts(this.transcripts, this.defaultSortName, this.defaultSortOrder);
      }
      // Instead of using .toJSON on the original collectiom,
      // we send the sorted array.
      this.addListToUI(this.transcripts, transcripts.hasMorePages(), true, (transcripts.getPage() > 1));
    }
  },

  addListToUI: function(transcripts, has_more, append, scroll_to){
    var list = this.template_list({has_more: has_more});
    var $list = $(list);
    var $target = $list.first();

    if (append) {
      this.$transcripts.append($list);
    }
    else {
      this.$transcripts.empty();
      if (transcripts.length){
        this.$transcripts.html($list);
      }
      else {
        this.$transcripts.html('<p>No transcripts found!</p>');
      }
    }
    this.$transcripts.removeClass('loading');

    _.each(transcripts, function(transcript){
      var transcriptView = new app.views.TranscriptItem({transcript: transcript});
      $target.append(transcriptView.$el);
    });

    if (scroll_to) {
      $(window).trigger('scroll-to', [$list, 110]);
    }
  },

  facet: function(){
    // we have all the data, so just facet on the client
    if (this.collection.hasAllPages()) {
      this.facetOnClient();
    }
    // we don't have all the data, we must request from server
    else {
      this.facetOnServer();
    }
  },

  /**
   * Sorts transcripts according to a given field name and order.
   *
   * A random sort doesn't use a fieldname, just sorts randomly.
   *
   * @param array transcripts
   *   The array of transcripts.
   * @param string sortName
   *   The field name to sort on.
   * @param string sortOrder
   *   The sort ordering.
   *
   * @return array
   *   The sorted transcripts.
   */
  sortTranscripts: function(transcripts, sortName, sortOrder) {
    var sortedTranscripts = _.sortByNat(transcripts, function(transcript) {
      if (sortName == 'random') {
        return Math.floor(Math.random() * transcripts.length);
      }
      else {
        return transcript[sortName];
      }
    });
    if (sortOrder.toLowerCase() == 'desc') {
      sortedTranscripts = sortedTranscripts.reverse();
    }
    return sortedTranscripts;
  },

  facetOnClient: function(){
    var _this = this,
        filters = this.filters || {},
        keyword = this.searchKeyword || '',
        transcripts = _.map(this.transcripts, _.clone);

    // do the filters
    _.each(filters, function(value, key) {
      transcripts = _.filter(transcripts, function(transcript) {
        return !_.has(transcript, key) || transcript[key]==value;
      });
    });

    // do the searching
    if (keyword.length) {

      // Use Fuse for fuzzy searching
      var f = new Fuse(transcripts, { keys: ["title", "description"], threshold: 0.2 });

      // Combine the results of a string match and fuzzy search.
      transcripts = _.union(
        _.filter(transcripts, function(transcript) {
          return (
            transcript.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
            transcript.description.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
          );
        }),
        f.search(keyword)
      );
    }

    // Do the sorting.
    if (this.sortName) {
      transcripts = this.sortTranscripts(transcripts, this.sortName, this.sortOrder);
    }

    this.renderTranscripts(transcripts);
  },

  facetOnServer: function() {
    // TODO: request from server if not all pages are present

    this.facetOnClient();
  },

  filterBy: function(name, value){
    this.filters = this.filters || {};
    this.filters[name] = value;
    // omit all filters with value "ALL"
    this.filters = _.omit(this.filters, function(value, key){ return value=='ALL'; });
    this.facet();
    this.updateUrlParams();
  },

  isFaceted: function() {
    return (
      this.filters ||
      (!!this.sortName && this.sortName != this.defaultSortName) ||
      (!!this.sortOrder && this.sortOrder != this.defaultSortOrder) ||
      this.searchKeyword
    );
  },

  loadCollections: function(){
    var _this = this;

    this.collections = this.collections || this.data.collections;

    this.collections.fetch({
      success: function(collection, response, options){
        _this.renderFacets(collection.toJSON());
      },
      error: function(collection, response, options){
        _this.renderFacets([]);
      }
    });
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcripts.filter', function(ev, filter) {
      _this.filterBy(filter.name, filter.value);
    });

    PubSub.subscribe('transcripts.sort', function(ev, sort_option) {
      _this.sortBy(sort_option.name, sort_option.order);
    });

    PubSub.subscribe('transcripts.search', function(ev, keyword) {
      _this.search(keyword);
    });
  },

  loadParams: function(params){
    var _this = this;

    this.filters = this.filters || {};

    _.each(params, function(value, key){
      // sort name
      if (key == 'sort_by') {
        _this.sortName = value;
      }
      // sort order
      else if (key == 'order') {
        _this.sortOrder = value;
      }
      // keyword
      else if (key == 'keyword') {
        _this.searchKeyword = value;
      }
      // otherwise, assume it's a filter
      else {
        _this.filters[key] = value;
      }
    });
  },

  loadTranscripts: function(){
    var _this = this;

    this.$transcripts.addClass('loading');

    this.collection.fetch({
      success: function(collection, response, options) {
        _this.addList(collection);
      },
      error: function(collection, response, options) {
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  nextPage: function(e){
    e.preventDefault();
    $(e.currentTarget).remove();
    this.collection.nextPage();
    this.loadTranscripts();
  },

  render: function(){
    this.$el.attr('role', 'main');
    this.$el.html(this.template(this.data));
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections, queryParams: this.data.queryParams});
    this.$facets.html(this.facetsView.render().$el);
  },

  renderTranscripts: function(transcripts){
    this.addListToUI(transcripts, false, false, true);
  },

  search: function(keyword){
    this.searchKeyword = keyword;
    this.facet();
  },

  sortBy: function(name, order){
    this.sortName = name;
    this.sortOrder = order;
    this.facet();
    this.updateUrlParams();
  },

  updateUrlParams: function(){
    var data = {};
    // check for sorting
    if (this.sortName && this.sortOrder) {
      data.sort_by = this.sortName;
      data.order = this.sortOrder;
    }
    // check for filters
    if (this.filters) {
      _.each(this.filters, function(value, key){
        data[key] = value;
      });
    }
    // update URL if there's facet data
    if (_.keys(data).length > 0 && window.history) {
      var url = '/' + this.data.route.route + '?' + $.param(data);
      window.history.pushState(data, document.title, url);
    }
    else if (window.history) {
      var url = '/' + this.data.route.route;
      window.history.pushState(data, document.title, url);
    }
  }

});
