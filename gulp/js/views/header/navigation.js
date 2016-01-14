var NavigationView = HeaderView.extend({

  el: '#navigation',

  template: _.template(PROJECT['templates']['navigation.ejs']),

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
