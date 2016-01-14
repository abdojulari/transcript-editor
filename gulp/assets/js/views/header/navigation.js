var NavigationView = HeaderView.extend({

  el: '#navigation',

  template: _.template($('#header\\/navigation\\.ejs').html()),

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
