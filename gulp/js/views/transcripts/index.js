app.views.TranscriptsIndex = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_index.ejs']),
  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_item.ejs']),

  className: 'transcripts-wrapper',

  events: {
    'click .list-next': 'nextPage'
  },

  initialize: function(data){
    var defaults = {
      queryParams: {}
    };
    this.data = _.extend({}, defaults, data);

    this.render();

    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');

    // init collection so we can search and facet
    this.transcripts = this.transcripts || new app.collections.Transcripts({
      endpoint: '/search.json',
      params: this.data.queryParams
    });

    if (this.data.queryParams) this.loadParams(this.data.queryParams);
    this.loadTranscripts();
    this.loadCollections();
    this.loadListeners();
  },

  // addList: function(transcripts){
  //   this.transcripts = this.transcripts.concat(transcripts.toJSON());

  //   if (this.isFaceted()) {
  //     this.facet();

  //   } else {
  //     this.addListToUI(transcripts.toJSON(), transcripts.hasMorePages(), true, (transcripts.getPage() > 1));
  //   }
  // },

  // addListToUI: function(transcripts, has_more, append, scroll_to){
  //   var list = this.template_list({has_more: has_more});
  //   var $list = $(list);
  //   var $target = $list.first();

  //   if (append) {
  //     this.$transcripts.append($list);
  //   } else {
  //     this.$transcripts.empty();
  //     if (transcripts.length){
  //       this.$transcripts.html($list);
  //     } else {
  //       this.$transcripts.html('<p>No transcripts found!</p>');
  //     }
  //   }
  //   this.$transcripts.removeClass('loading');

  //   _.each(transcripts, function(transcript){
  //     var transcriptView = new app.views.TranscriptItem({transcript: transcript});
  //     $target.append(transcriptView.$el);
  //   });

  //   if (scroll_to) {
  //     $(window).trigger('scroll-to', [$list, 110]);
  //   }
  // },

  facet: function(){

    // this is silly v
    // we have all the data, so just facet on the client
    // if (this.collection.hasAllPages()) {
    //   this.facetOnClient();

    // // we don't have all the data, we must request from server
    // } else {
    //   this.facetOnServer();
    // }

    console.log("FACET METHOD")
    console.log(this)    
    var keyword = this.searchKeyword || "";
    PubSub.publish('transcripts.search', keyword);

    return true;
  },


  // facetOnClient: function(){
  //   var _this = this,
  //       filters = this.filters || {},
  //       keyword = this.searchKeyword || '',
  //       transcripts = _.map(this.transcripts, _.clone);

  //   // do the filters
  //   _.each(filters, function(value, key){
  //     transcripts = _.filter(transcripts, function(transcript){ return !_.has(transcript, key) || transcript[key]==value; });
  //   });

  //   // do the searching
  //   if (keyword.length){

  //     // Use Fuse for fuzzy searching
  //     var f = new Fuse(transcripts, { keys: ["title", "description"], threshold: 0.2 });
  //     var result = f.search(keyword);

  //     // Search description if fuzzy doesn't work
  //     if (!result.length) {
  //       transcripts = _.filter(transcripts, function(transcript){
  //         return transcript.description.toLowerCase().indexOf(keyword) >= 0;
  //       });
  //     } else {
  //       transcripts = result;
  //     }

  //   }

  //   // do the sorting
  //   if (this.sortName){
  //     transcripts = _.sortBy(transcripts, function(transcript){ return transcript[_this.sortName]; });
  //     if (this.sortOrder.toLowerCase()=="desc")
  //       transcripts = transcripts.reverse();
  //   }

  //   this.renderTranscripts(transcripts);
  // },

  // facetOnServer: function(){
  //   // TODO: request from server if not all pages are present
  //   console.log('we went there!')

  //   // this.collection.where({})
  //   // this.filters.
  //   // $.get('/search.json?'+)
  //   // console.log( this.collection.fetch({data: $.param({uid: 'cpb-aacip_60-81wdc1hh'}) }) )
  //   // console.log( this.collection.fetch({
  //   //   data: $.param({uid: 'cpb-aacip_60-81wdc1hh'}),
  //   //   success: function(col, resp, opt){
  //   //     console.log("success!")
  //   //     console.log(col)
  //   //     console.log(resp)
  //   //   },
  //   //   error: function(col, resp, opt){
  //   //     console.log("shit!")
  //   //     console.log(resp)
  //   //   }

  //   // }) )


  //   // get keyword from this.searchKeyword
  //   // call search(keyword)
  //   // assign results to collection with
  //     // this.app.collection.reset(<newmodels>) ? maybe that happens already


  //   var keyword = this.searchKeyword;
  //   // copied from search.js, the ONLY way to hit it from the front
  //   // we are alrady listening to this because of index.js (subscribes)
  //   PubSub.publish('transcripts.search', keyword);
  //   return true;
  // },

  searchServer: function(keyword) {
    console.log("Search Server")
    var sort_name = this.sortName || 'title'
    var sort_order = this.sortOrder || 'asc'
    var combined_params = _.extend(this.filters, {'q': keyword, sort_by: sort_name, order: sort_order});
    this.setParams(combined_params);
  },

  setParams: function(params){
    this.$transcripts.empty().addClass('loading');
    params.page = 1;
    console.log("SEARCH SETPARAMS method")
    console.log(params)
    this.transcripts.setParams(params);
    this.updateUrlParams();
    this.loadTranscripts();
  },

  filterBy: function(name, value){
    this.filters = this.filters || {};
    this.filters[name] = value;
    
    // DONT OMIT HERE OR ELSE THERES NO WAY TO TELL BACKEND TO REMOVE COLLECTION FILTER AAAAAAH
    // console.log("SET FILTER " + name + " TO " +value)
    // // omit all filters with value "ALL"
    // this.filters = _.omit(this.filters, function(value, key){ return value=='ALL'; });
    // console.log(this.filters)
    // console.log("FILTERBY METHOD")
    // console.log(this)
    this.updateUrlParams();
    this.facet();
  },

  isFaceted: function(){
    return this.filters || this.sortName || this.sortOrder || this.searchKeyword;
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

  setQuery: function(query){
    this.searchKeyword = query;
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcripts.filter', function(ev, filter) {
      _this.setQuery(filter.q);


      console.log(filter.name)
      console.log(filter.value)

      _this.filterBy(filter.name, filter.value, filter.q);
    });

    PubSub.subscribe('transcripts.sort', function(ev, sort_option) {
      _this.setQuery(sort_option.q);
      _this.sortBy(sort_option.name, sort_option.order, sort_option.q);
    });

    PubSub.subscribe('transcripts.search', function(ev, keyword) {
      console.log('received search with'+keyword)
      _this.searchServer(keyword);
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

    // console.log(this.filters, this.sortName, this.sortOrder, this.searchKeyword)
  },

  // from search.js
  loadTranscripts: function(){
    var _this = this;
    var params = this.data.queryParams;

    // do a deep search
    // params.deep = 1;

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



  // this relies on old paging approach
  // loadTranscripts: function(){
  //   var _this = this;

  //   this.$transcripts.addClass('loading');

  //   this.collection.fetch({
  //     success: function(collection, response, options){
  //       _this.addList(collection);
  //     },
  //     error: function(collection, response, options){
  //       $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
  //     }
  //   });
  // },

  nextPage: function(e){
    e.preventDefault();
    $(e.currentTarget).remove();
    this.collection.nextPage();
    this.loadTranscripts();
  },

  render: function(){
    this.$el.attr('role', 'main');
    this.$el.html(this.template(this.data));
    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections, queryParams: this.data.queryParams});
    this.$facets.html(this.facetsView.render().$el);
  },

  // from search.js
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

    _.each(transcripts.models, function(transcript_model){
      var transcript = transcript_model.attributes;

      var transcriptView = new app.views.TranscriptItem({transcript: transcript});
      $target.append(transcriptView.$el);
    });

    // wrong view for search.js
    // _.each(transcriptsData, function(transcript){
    //   var item = _this.template_item(_.extend({}, transcript, {query: query}));
    //   $target.append($(item));
    // });
    // $(window).trigger('scroll-to', [this.$('#search-form'), 110]);
  },
  // old paging
  // renderTranscripts: function(transcripts){
  //   this.addListToUI(transcripts, false, false, true);
  // },

  // does nothing at this poing
  // search: function(keyword){
  //   this.searchKeyword = keyword;
  //   this.facet();
  // },

  sortBy: function(name, order){
    this.sortName = name;
    this.sortOrder = order;

    // console.log("SORTBY METHOD")
    // console.log(this)
    this.updateUrlParams();
    this.facet();
  },

  // dont need to adapt from search.js
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

    } else if (window.history) {
      var url = '/' + this.data.route.route;
      window.history.pushState(data, document.title, url);
    }
  }

});
