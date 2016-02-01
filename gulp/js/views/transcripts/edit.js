app.views.TranscriptEdit = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_edit.ejs']),
  template_line: _.template(TEMPLATES['transcript_line.ejs']),

  initialize: function(data){
    this.data = data;
    this.data.template_line = this.template_line;
    this.loadTranscript();
  },

  loadListeners: function(){},

  loadPageContent: function(){
    this.data.page_content = '';

    if (this.data.project.pages['transcript_edit.md']) {
      var page_template = _.template(this.data.project.pages['transcript_edit.md']);
      this.data.page_content = page_template(this.data);
    }
  },

  loadTranscript: function(){
    var _this = this;

    this.$el.addClass('loading');

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
    this.data.debug && console.log("Transcript", transcript.toJSON());

    this.$el.removeClass('loading');

    PubSub.publish('transcript.load', {
      transcript: transcript.toJSON(),
      action: 'edit',
      label: 'Editing Transcript: ' + transcript.get('title')
    });

    this.data.transcript = transcript.toJSON();
    this.loadPageContent();
    this.render();
  },

  play: function(e){
    e && e.preventDefault();


  },

  render: function(){
    this.$el.html(this.template(this.data));
  }

});
