app.views.TranscriptFacets = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_facets.ejs']),

  events: {
    "click .filter-by": "filterFromEl",
    "click .sort-by": "sortFromEl",
    "submit .search-form": "searchFromForm",
    "keyup .search-form input": "searchFromInput"
  },

  initialize: function(data){
    this.data = _.extend({}, data);

    this.initFacets();

    // turn sticky on
    $(window).trigger('sticky-on', ['#header']);
  },

  filter: function(name, value){
    PubSub.publish('transcripts.filter', {name: name, value: value});
  },

  filterFromEl: function(e){
    var $el = $(e.currentTarget);

    this.filter($el.attr('data-filter'), $el.attr('data-value'));
  },

  initFacets: function(){
    // add an "all collections" options
    if (this.data.collections.length) {
      var all_collections = {
        id: 'ALL',
        title: 'All Collections',
        active: true
      };
      this.data.collections.unshift(all_collections);
      this.data.active_collection = _.findWhere(this.data.collections, {active: true});
    }

    this.data.sort_options = [
      {id: 'title_asc', name: 'title', order: 'ASC', label: 'Title (A to Z)', active: true},
      {id: 'title_desc', name: 'title', order: 'DESC', label: 'Title (Z to A)'},
      {id: 'percent_completed_desc', name: 'percent_completed', order: 'DESC', label: 'Completeness (most to least)'},
      {id: 'percent_completed_asc', name: 'percent_completed', order: 'ASC', label: 'Completeness (least to most)'},
      {id: 'duration_asc', name: 'duration', order: 'ASC', label: 'Duration (short to long)'},
      {id: 'duration_desc', name: 'duration', order: 'DESC', label: 'Duration (long to short)'},
      {id: 'collection_asc', name: 'collection_id', order: 'ASC', label: 'Collection'}
    ];
    this.data.active_sort = _.findWhere(this.data.sort_options, {active: true});
  },

  render: function(){
    this.$el.html(this.template(this.data));
    return this;
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

  sortTranscripts: function(name, order){
    PubSub.publish('transcripts.sort', {name: name, order: order});
  },

  sortFromEl: function(e){
    var $el = $(e.currentTarget);

    this.sortTranscripts($el.attr('data-sort'), $el.attr('data-order'));
  }

});
