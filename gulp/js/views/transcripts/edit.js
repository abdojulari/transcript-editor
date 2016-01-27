app.views.TranscriptEdit = app.views.Base.extend({

  template_lines: _.template(TEMPLATES['transcript_lines.ejs']),
  template_line: _.template(TEMPLATES['transcript_line.ejs']),

  events: {
  },

  initialize: function(data){
    this.data = data;

    this.loadTranscript();
  },

  loadTranscript: function(){
    var _this = this;

    this.model.fetch({
      success: function(model, response, options){
        _this.onLoad(model);
      },
      error: function(model, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading this transcript. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  onLoad: function(transcript){
    console.log(transcript.toJSON());
    this.render();
  },

  render: function(){
    this.$el.html('');
  }

});
