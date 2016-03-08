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

    this.loadTranscripts();
    this.loadCollections();
    this.loadListeners();
  },

  addList: function(transcripts){
    this.transcripts = this.transcripts.concat(transcripts.toJSON());
    this.addListToUI(transcripts);
  },

  addListToUI: function(transcripts){
    var list = this.template_list({transcripts: transcripts.toJSON(), template_item: this.template_item, has_more: transcripts.hasMorePages()});
    var $list = $(list);

    this.$transcripts.append($list);
    this.$transcripts.removeClass('loading');

    if (transcripts.getPage() > 1) {
      $(window).trigger('scroll-to', [$list, 60]);
    }
  },

  facet: function(){
    // we have all the data, so just facet on the client
    if (this.collection.hasAllPages()) {
      this.facetOnClient();

    // we don't have all the data, we must request from server
    } else {
      this.facetOnServer();
    }
  },

  facetOnClient: function(){
    var _this = this,
        filters = this.filters || {},
        keyword = this.searchKeyword || '',
        transcripts = _.map(this.transcripts, _.clone);

    // do the filters
    _.each(filters, function(value, key){
      transcripts = _.filter(transcripts, function(transcript){ return transcript[key]==value; });
    });

    // do the searching
    if (keyword.length){

      // Use Fuse for fuzzy searching
      var f = new Fuse(transcripts, { keys: ["title", "description"], threshold: 0.2 });
      var result = f.search(keyword);

      // Search description if fuzzy doesn't work
      if (!result.length) {
        transcripts = _.filter(transcripts, function(transcript){
          return transcript.description.toLowerCase().indexOf(keyword) >= 0;
        });
      } else {
        transcripts = result;
      }

    }

    // do the sorting
    if (this.sortName){
      transcripts = _.sortBy(transcripts, function(transcript){ return transcript[_this.sortName]; });
      if (this.sortOrder=="DESC")
        transcripts = transcripts.reverse();
    }

    this.renderTranscripts(transcripts);
  },

  facetOnServer: function(){
    // TODO: request from server if not all pages are present

    this.facetOnClient();
  },

  filterBy: function(name, value){
    this.filters = this.filters || {};
    this.filters[name] = value;
    // omit all filters with value "ALL"
    this.filters = _.omit(this.filters, function(value, key){ return value=='ALL'; });
    this.facet();
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

  loadTranscripts: function(){
    var _this = this;

    this.$transcripts.addClass('loading');

    this.collection.fetch({
      success: function(collection, response, options){
        _this.addList(collection);
      },
      error: function(collection, response, options){
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
    this.$el.html(this.template(this.data));
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections});
    this.$facets.html(this.facetsView.render().$el);
  },

  renderTranscripts: function(transcripts){
    var list = this.template_list({transcripts: transcripts, template_item: this.template_item, has_more: false});
    var $list = $(list);

    this.$transcripts.html($list);
    if (!transcripts.length){
      this.$transcripts.html('<p>No transcripts found!</p>');
    }
    $(window).trigger('scroll-to', [$list, 110]);
  },

  search: function(keyword){
    this.searchKeyword = keyword;
    this.facet();
  },

  sortBy: function(name, order){
    this.sortName = name;
    this.sortOrder = order;
    this.facet();
  }

});
