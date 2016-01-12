app.routers.MainRouter = Backbone.Router.extend({

  routes: {
    "":                     "index",
    "transcript/:id/edit":  "transcriptEdit",
    "transcript/:id":       "transcriptShow"
  },

  index: function() {
    this._loadHeader();
    // app.views.main = new app.views.TranscriptIndex();
  },

  transcriptEdit: function(id) {
    console.log('Route: edit ' + id);
  },

  transcriptShow: function(id) {
    console.log('Route: show ' + id);
  },

  _loadHeader: function(){
    app.views.header = new app.views.CommonHeader();
  }

});
