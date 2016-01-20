app.views.Navigation = app.views.Base.extend({

  el: '#navigation',

  template: _.template(TEMPLATES['navigation.ejs']),

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
