app.views.TranscriptEdit = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_edit.ejs']),
  template_line: _.template(TEMPLATES['transcript_line.ejs']),

  initialize: function(data){
    this.data = data;
    this.data.template_line = this.template_line;
    this.loadTranscript();
  },

  lineNext: function(){},

  linePrevious: function(){},

  lineSelect: function(i){
    $('.line.active').removeClass('active');
    $('.line[sequence="'+i+'"]').addClass('active');
  },

  lineSubmit: function(){},

  loadListeners: function(){
    var _this = this,
        controls = this.data.project.controls;

    // add link listeners
    $('.control').on('click', function(e){
      e.preventDefault();
      var $el = $(this);

      _.each(controls, function(control){
        if ($el.hasClass(control.id)) {
          _this[control.action]();
        }
      })

    });

    // add keyboard listeners
    $(window).keydown(function(e){
      _.each(controls, function(control){
        if (control.keyCode == e.keyCode && (control.shift && e.shiftKey || !control.shift)) {
          e.preventDefault();
          _this[control.action]();
          return false;
        }
      });
    });

    // add line listener
    $('.line').on('click', function(e){
      e.preventDefault();
      _this.lineSelect(parseInt($(this).attr('sequence')));
    });


  },

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
    this.loadListeners();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  togglePlay: function(){


  },

  wordPrevious: function(){},

  wordNext: function(){}

});
