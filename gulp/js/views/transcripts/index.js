app.views.TranscriptsIndex = app.views.Base.extend({

  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_item.ejs']),

  events: {
    'click .list-next': 'nextPage'
  },

  initialize: function(data){
    this.data = data;

    this.loadTranscripts();
  },

  addList: function(transcripts){
    var list = this.template_list({transcripts: transcripts.toJSON(), template_item: this.template_item, has_more: transcripts.hasMorePages()});
    var $list = $(list);

    this.$el.append($list);

    if (transcripts.getPage() > 1) {
      $(window).trigger('scroll-to', [$list, 60]);
    }
  },

  loadTranscripts: function(){
    var _this = this;

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
  }

});
