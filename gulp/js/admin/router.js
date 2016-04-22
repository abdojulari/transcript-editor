app.routers.DefaultRouter = Backbone.Router.extend({

  routes: {
    "admin":                "stats"
  },

  before: function(route, params) {

  },

  after: function(route, params) {

  },

  stats: function(){
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var stats = new app.views.AdminStats(data);
    var users = new app.views.AdminUsers(data);
    var flags = new app.views.AdminFlags(data);
    var footer = new app.views.Footer(data);

    var $containerLeft = $('<div class="col"></div>');
    var $containerRight = $('<div class="col"></div>');
    $containerLeft.append(stats.$el);
    $containerLeft.append(flags.$el);
    $containerRight.append(users.$el);
    $('#main').append($containerLeft);
    $('#main').append($containerRight);
  },

  _getData: function(data){

    var user = {};
    if ($.auth.user && $.auth.user.signedIn) {
      user = $.auth.user;
    }

    data = data || {};
    data = $.extend({}, {project: PROJECT, user: user, debug: DEBUG, route: this._getRouteData()}, data);

    DEBUG && console.log('Route', data.route);

    return data;
  },

  _getRouteData: function(){
    var Router = this,
        fragment = Backbone.history.fragment,
        routes = _.pairs(Router.routes),
        route = null, action = null, params = null, matched, path;

    matched = _.find(routes, function(handler) {
      action = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
      return action.test(fragment);
    });

    if(matched) {
      params = Router._extractParameters(action, fragment);
      route = matched[0];
      action = matched[1];
    }

    path = fragment ? '/#/' + fragment : '/';

    return {
      route: route,
      action: action,
      fragment : fragment,
      path: path,
      params : params
    };
  }

});
