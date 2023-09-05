app.views.TranscriptsCompletedData = app.views.Base.extend({

  className: 'transcripts_completed_data',
  template: _.template(TEMPLATES['transcripts_completed_data.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);
    this.render()
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
