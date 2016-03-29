app.views.UserItem = app.views.Base.extend({

  template: _.template(TEMPLATES['admin_user_item.ejs']),

  tagName: "tr",
  className: "user-item",

  initialize: function(data){
    this.data = _.extend({}, data);
    this.user = this.data.user;

    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.user));
    return this;
  }

});
