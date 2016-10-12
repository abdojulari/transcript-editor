app.views.Search = app.views.Base.extend({

  el: '#main',
  template: _.template(TEMPLATES['transcript_search.ejs']),
  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_search_item.ejs']),

  events: {
    "submit .search-form": "searchFromForm",
    "keyup .search-form input": "searchFromInput"
  },

  initialize: function(data){
    var defaults = {
      queryParams: {}
    };

    this.data = _.extend({}, defaults, data);

    this.render();
    this.loadListeners();
    this.loadTranscripts();
    this.loadCollections();
  },

  loadCollections: function(){
    var _this = this;

    this.collections = this.collections || new app.collections.Collections();

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
      var data = {};
      data[filter.name] = filter.value;
      _this.setParams(data);
    });

    PubSub.subscribe('transcripts.sort', function(ev, sort_option) {
      _this.setParams({
        'sort_by': sort_option.name,
        'order': sort_option.order
      });
    });

    PubSub.subscribe('transcripts.search', function(ev, keyword) {
      _this.setParams({
        'q': keyword
      });
    });
  },

  loadTranscripts: function(){
    var _this = this;
    var params = this.data.queryParams;

    // do a deep search
    params.deep = 1;

    this.$transcripts.addClass('loading');
    this.transcripts = this.transcripts || new app.collections.Transcripts({
      endpoint: '/search.json',
      params: params
    });

    this.transcripts.fetch({
      success: function(collection, response, options){
        _this.renderTranscripts(collection);
      },
      error: function(collection, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  render: function() {
    this.$el.html(this.template(this.data));
    this.$el.removeClass('loading');
    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');
    document.title = app.pageTitle('Search');
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections, queryParams: this.data.queryParams, disableSearch: true, disableSort: true});
    this.$facets.html(this.facetsView.render().$el);
  },

  renderTranscripts: function(transcripts){
    var _this = this;
    var transcriptsData = transcripts.toJSON();

    var list = this.template_list({has_more: transcripts.hasMorePages()});
    var $list = $(list);
    var $target = $list.first();
    var query = transcripts.getParam('q') || '';

    if (transcripts.getPage() > 1) {
      this.$transcripts.append($list);

    } else {
      this.$transcripts.empty();
      if (transcriptsData.length){
        this.$transcripts.html($list);
      } else {
        this.$transcripts.html('<p>No transcripts found!</p>');
      }
    }
    this.$transcripts.removeClass('loading');

    _.each(transcriptsData, function(transcript){
      var item = _this.template_item(_.extend({}, transcript, {query: query}));
      $target.append($(item));
    });

    $(window).trigger('scroll-to', [this.$('#search-form'), 110]);
  },

  search: function(keyword){
    PubSub.publish('transcripts.search', keyword);
  },

  searchFromForm: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget),
        keyword = $form.find('input[name="keyword"]').val();

    keyword = keyword.trim().toLowerCase();

    this.search(keyword);
  },

  searchFromInput: function(e){
    var $input = $(e.currentTarget),
        keyword = $input.val();

    keyword = keyword.trim();

    // only submit if empty
    if (!keyword.length)
      this.search(keyword);
  },

  setParams: function(params){
    this.$transcripts.empty().addClass('loading');
    params.page = 1;
    this.transcripts.setParams(params);
    this.loadTranscripts();
    this.updateUrlParams();
  },

  updateUrlParams: function(){
    // get params
    var params = this.transcripts.getParams();
    // update URL if there's facet data
    if (_.keys(params).length > 0 && window.history) {
      var url = '/' + this.data.route.route + '?' + $.param(params);
      window.history.pushState(params, document.title, url);
    }
    else if (window.history) {
      var url = '/' + this.data.route.route;
      window.history.pushState(params, document.title, url);
    }
  }

});
