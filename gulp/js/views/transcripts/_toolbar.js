app.views.TranscriptToolbar = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_toolbar.ejs']),

  initialize: function(data){
    this.data = data;
    this.data.controls = this.data.project.controls;

    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  }

});
