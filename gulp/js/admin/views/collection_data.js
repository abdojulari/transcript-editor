app.views.CollectionData = app.views.Base.extend({

  className: 'collection_data',

  template: _.template(TEMPLATES['collection_data.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);
    this.render()
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }
});
