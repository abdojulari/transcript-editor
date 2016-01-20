app.routers.DefaultRouter = Backbone.Router.extend({

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

  _getData: function(data){

    data = data || {};
    data = $.extend({}, {project: PROJECT, user: {}}, data);

    return data;
  },

  _loadHeader: function(data){
    data = this._getData(data);
    var header = new app.views.Header(data);
  }

});
