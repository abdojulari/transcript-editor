app.views.Home = app.views.Base.extend({

  el: '#main',

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {

    // write page contents
    var home_page = new app.views.Page(_.extend({}, this.data, {page_key: 'home.md'}));

    // get transcripts
    var transcript_collection = new app.collections.Transcripts();
    var collection_collection = new app.collections.Collections();
    var transcripts_view = new app.views.TranscriptsIndex(_.extend({}, this.data, {collection: transcript_collection, collections: collection_collection}));

    this.$el.append(home_page.render().$el);
    this.$el.append(transcripts_view.$el);
    this.$el.removeClass('loading');

    return this;
  }

});
