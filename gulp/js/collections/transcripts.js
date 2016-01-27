app.collections.Transcripts = Backbone.Collection.extend({

  initialize: function() {
    this.page = 0;
  },

  getPage: function(){
    return this.page;
  },

  hasMorePages: function(){
    return (this.page * this.per_page < this.total);
  },

  nextPage: function(){
    this.page += 1;
  },

  parse: function(resp){
    this.page = resp.current_page;
    this.per_page = resp.per_page;
    this.total = resp.total_entries;
    return resp.entries;
  },

  url: function() {
    var params = '';
    if (this.page > 0) {
      params = '?' + $.param({page: this.page})
    }
    return API_URL + '/transcripts.json' + params;
  }

});
