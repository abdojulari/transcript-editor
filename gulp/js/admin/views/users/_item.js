app.views.UserItem = app.views.Base.extend({

  template: _.template(TEMPLATES['admin_user_item.ejs']),

  tagName: "tr",
  className: "user-item",

  initialize: function(data){
    this.data = _.extend({}, data);

    this.render();
    this.loadListeners();
  },

  changeRole: function(user_role_id){
    if (this.data.user.user_role_id == user_role_id) return false;
    var _this = this;

    $.ajax({
      url: '/admin/users/'+this.data.user.id+'.json',
      data: {
        user: {
          user_role_id: user_role_id
        }
      },
      type: 'PUT',
      success: function(resp) {
        console.log(resp);
        _this.data.user.user_role_id = user_role_id;
      }
    });
  },

  loadListeners: function(){
    var _this = this;

    this.$el.on('change', '.roleSelect', function(e){
      _this.changeRole(parseInt($(this).val()));
    });
  },

  render: function(){
    this.$el.html(this.template(this.data));
    return this;
  }

});
