window.API_URL = PROJECT.apiUrl || window.location.protocol + '//' + window.location.hostname;
if (window.location.port && !PROJECT.apiUrl) window.API_URL += ':' + window.location.port

window.DEBUG = true;

window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  initialize: function(){
    // init auth
    var auth_provider_paths = _.object(_.map(PROJECT.authProviders, function(provider) { return [provider.name, provider.path]; }));
    // NOTE: Authentication is now done via rails
    //
    // $.auth.configure({
    //   apiUrl: API_URL,
    //   authProviderPaths: auth_provider_paths
    // });

    // Debug
    // DEBUG && console.log("Project", PROJECT);
    // PubSub.subscribe('auth.validation.success', function(ev, user) {
    //   DEBUG && console.log('User', user);
    // });

    // Force a hard refresh after sign in/out
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      window.location.reload(true);
    });
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      window.location.reload(true);
    });

    // load the main router
    var mainRouter = new app.routers.DefaultRouter();

    // Enable pushState for compatible browsers
    var enablePushState = true;
    var pushState = !!(enablePushState && window.history && window.history.pushState);

    // Start backbone history
    Backbone.history = Backbone.history || new Backbone.History({});
    Backbone.history.start({
      pushState:pushState
    });

    // Backbone.history.start();
  }
};

/**
 * Configurable page title.
 *
 * @TODO: Move this to a view or something.
 */
window.app.pageTitle = function(pagename) {
  if (!pagename) {
    pagename = '';
  }
  var titleElems = document.getElementsByTagName('title');
  if (!titleElems.length) {
    return '';
  }
  var titleElem = titleElems[0];
  var sitename = (
    !!titleElem.getAttribute('data-title-sitename') ?
    titleElem.getAttribute('data-title-sitename') :
    titleElem.textContent
  );
  var template = (
    !!titleElem.getAttribute('data-title-template') ?
    titleElem.getAttribute('data-title-template') :
    ''
  );
  if (!pagename.length || !template.length) {
    return titleElem.textContent;
  }
  return template.replace('{{sitename}}', sitename)
    .replace('{{pagename}}', pagename);
};

// Init backbone app
$(function(){
  app.initialize();
});
