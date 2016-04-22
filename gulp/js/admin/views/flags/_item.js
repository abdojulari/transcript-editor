app.views.FlagItem = app.views.Base.extend({

  template: _.template(TEMPLATES['admin_flag_item.ejs']),

  tagName: "tr",
  className: "flag-item",

  initialize: function(data){
    this.data = _.extend({}, data);
    this.flag = this.data.flag;

    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.flag));
    return this;
  }

});
