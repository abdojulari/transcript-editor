window.API_URL = PROJECT.api_url || window.location.protocol + '//' + window.location.hostname;
if (window.location.port && !PROJECT.api_url) window.API_URL += ':' + window.location.port

window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  initialize: function(){
    // init auth
    var auth_provider_paths = _.object(_.map(PROJECT.auth_providers, function(provider) { return [provider.name, provider.path]; }));
    $.auth.configure({
      apiUrl: API_URL,
      authProviderPaths: auth_provider_paths
    });

    // Debug
    console.log("Project", PROJECT);
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      console.log('User', user);
    });

    // load the main router
    var mainRouter = new app.routers.DefaultRouter();

    // Enable pushState for compatible browsers
    // var enablePushState = true;
    // var pushState = !!(enablePushState && window.history && window.history.pushState);
    //
    // // Start backbone history
    // Backbone.history = Backbone.history || new Backbone.History({});
    // Backbone.history.start({
    //   pushState:pushState
    // });

    Backbone.history.start();
  }
};

// Init backbone app
$(function(){
  app.initialize();
});
