window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  initialize: function(){
    // load the main router
    app.routers.main = new app.routers.MainRouter();

    // Enable pushState for compatible browsers
    var enablePushState = true;
    var pushState = !!(enablePushState && window.history && window.history.pushState);

    // Start backbone history
    Backbone.history = Backbone.history || new Backbone.History({});
    Backbone.history.start({
      pushState:pushState
    });
  }
};

// Init backbone app
$(function(){
  app.initialize();
});
