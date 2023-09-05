app.views.EditActivityData = app.views.Base.extend({

  className: 'edit_activity_data',
  template: _.template(TEMPLATES['edit_activity_data.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);
    this.render()
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
