app.views.AdminDashboard = app.views.Base.extend({

  className: 'dashboard',
  template: _.template(TEMPLATES['admin_dashboard.ejs']),

  initialize: function(data){
    // preserve whatever stuff was in data var to new {}
    this.data = _.extend({}, data);
    this.render()
  },

  render: function() {
    this.$el.html( this.template(this.data));
    return this;
  }

});
