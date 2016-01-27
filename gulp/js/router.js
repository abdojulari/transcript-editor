app.routers.DefaultRouter = Backbone.Router.extend({

  routes: {
    "":                     "index",
    "transcripts/:id":      "transcriptEdit",
    "page/:id":             "pageShow"
  },

  index: function() {
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var main = new app.views.Home(data);
  },

  pageShow: function(id){
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var main = new app.views.Page(_.extend({}, data, {el: '#main', page_key: id}));
  },

  transcriptEdit: function(id) {
    var data = this._getData(data);
    var header = new app.views.Header(data);

    var transcript_model = new app.models.Transcript({id: id});
    var main = new app.views.TranscriptEdit(_.extend({}, data, {el: '#main', model: transcript_model}));
  },

  _getData: function(data){

    data = data || {};
    data = $.extend({}, {project: PROJECT, user: {}}, data);

    return data;
  }

});
