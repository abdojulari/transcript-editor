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
      _this.renderUsers(data.entries);
    });
  },

  render: function() {
    this.$el.html(this.template(this.data));

    return this;
  },

  renderUsers: function(users){
    var $users = this.$('#users-container');

    $users.empty();

    _.each(users, function(user){
      var userView = new app.views.UserItem({user: user});
      $users.append(userView.$el);
    });
  }

});
