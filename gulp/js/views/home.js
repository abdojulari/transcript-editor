app.views.Home = app.views.Base.extend({

  el: '#main',

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {

    // write page contents
    var home_page = new app.views.Page(_.extend({}, this.data, {el: this.el, page_key: 'home.md'}));

    // get transcripts
    var transcript_collection = new app.collections.Transcripts();
    var transcripts_view = new app.views.TranscriptsIndex(_.extend({}, this.data, {el: this.el, collection: transcript_collection}));

    return this;
  }

});
