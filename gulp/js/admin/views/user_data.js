app.views.UserData = app.views.Base.extend({

  className: 'user_data',

  template: _.template(TEMPLATES['user_data.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);
    this.render()
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }
});
