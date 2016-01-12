app.views.CommonHeader = Backbone.View.extend({

  el: '#header',

  template: _.template($('#header\\.ejs').html()),

  initialize: function(){
    this.render();
  },

  render: function() {
    var attr = {
      project: PROJECT
    };
    this.$el.html(this.template(attr));
    return this;
  }

});
