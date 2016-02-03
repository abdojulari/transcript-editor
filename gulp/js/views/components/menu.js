app.views.Menu = app.views.Base.extend({

  template: _.template(TEMPLATES['menu.ejs']),

  initialize: function(data){
    this.data = data;

    this.data.fragment = Backbone.history.getFragment() ? '/#/' + Backbone.history.getFragment() : '/';

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
