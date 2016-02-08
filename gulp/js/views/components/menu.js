app.views.Menu = app.views.Base.extend({

  template: _.template(TEMPLATES['menu.ejs']),

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
