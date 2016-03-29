app.views.AdminUsers = app.views.Base.extend({

  el: '#main',

  initialize: function(data){
    this.data = _.extend({}, data);

    this.render();
  },

  render: function() {
    // this.$el.html(this.template(this.data));
    this.$el.html('<p>Hello Admin - Users</p>');

    return this;
  }

});
