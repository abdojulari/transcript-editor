app.views.Page = app.views.Base.extend({

  template: _.template(TEMPLATES['page.ejs']),

  initialize: function(data){
    this.data = data;

    if (this.el) this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
