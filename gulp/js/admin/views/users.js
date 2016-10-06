app.views.AdminUsers = app.views.Base.extend({

  template: _.template(TEMPLATES['admin_users.ejs']),

  className: 'users',

  initialize: function(data){
    this.data = _.extend({}, data);

    this.render();
    this.loadData();
  },

  loadData: function(){
    var _this = this;
    $.getJSON("/admin/users.json", function(data) {
      _this.renderUsers(data);
    });
  },

  render: function() {
    this.$el.html(this.template(this.data));

    return this;
  },

  renderUsers: function(data){
    var $users = this.$('#users-container');
    var users = data.users;
    var roles = data.roles;

    $users.empty();

    _.each(users, function(user){
      var userView = new app.views.UserItem({user: user, roles: roles});
      $users.append(userView.$el);
    });
  }

});
