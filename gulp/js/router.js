app.routers.DefaultRouter = Backbone.Router.extend({

  routes: {
    "":                     "index",
    "transcripts/:id":      "transcriptEdit",
    "page/:id":             "pageShow"
  },

  before: function( route, params ) {
    $('#main').empty().addClass('loading');
  },

  after: function( route, params ) {
    window.scrollTo(0, 0);
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
    main.$el.removeClass('loading');
  },

  transcriptEdit: function(id) {
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var toolbar = new app.views.TranscriptToolbar(_.extend({}, data, {el: '#secondary-navigation'}));

    var transcript_model = new app.models.Transcript({id: id});
    var main = new app.views.TranscriptEdit(_.extend({}, data, {el: '#main', model: transcript_model}));
  },

  _getData: function(data){

    var user = {};
    if ($.auth.user && $.auth.user.signedIn) {
      user = $.auth.user;
    }

    data = data || {};
    data = $.extend({}, {project: PROJECT, user: user, debug: DEBUG}, data);

    return data;
  }

});
