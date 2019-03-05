app.views.TranscriptLineVerify = app.views.Base.extend({

  id: "transcript-line-verify",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_line_verify.ejs']),

  events: {
    "click .option": "select",
    "click .submit": "submit",
    "click .none-correct": "noneCorrect",
    "click .toggle-play": "togglePlay"
  },

  initialize: function(data){
    var _this = this;

    this.data = _.extend({}, data);
    this.data.title = this.data.title || "Choose the best transcription";
    this.data.active = this.data.active || false;

    PubSub.subscribe('transcript.edits.load', function(ev, data) {
      _this.data.line = data.line;
      _this.showEdits(data.edits);
    });
  },

  noneCorrect: function(e){
    e.preventDefault();
    var _this = this,
        line = this.data.line;

    PubSub.publish('transcript.edit.delete', line);

    // make all edits inactive
    this.$el.find('.option').removeClass('active');
    this.data.edits = _.map(this.data.edits, function(edit){
      edit.active = false;
      return edit;
    });

    setTimeout(function(){
      _this.submit();
    }, 800);
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  select: function(e){
    e.preventDefault();

    var line = this.data.line,
        $options = this.$el.find('.option'),
        $option = $(e.currentTarget),
        edit_id = parseInt($option.attr('edit-id'));

    $options.not('[edit-id="'+edit_id+'"]').removeClass('active').attr('aria-checked', 'false');
    $option.toggleClass('active');

    // set selected edit as active
    this.data.edits = _.map(this.data.edits, function(edit){
      edit.active = false;
      if (edit.id == edit_id && $option.hasClass('active')) {
        edit.active = true;
      }
      return edit;
    });

    // edit is selected
    if ($option.hasClass('active')) {
      $option.attr('aria-checked', 'true');
      PubSub.publish('transcript.line.verify', {line: line, text: $option.text()});

    // edit is deleted
    } else {
      PubSub.publish('transcript.edit.delete', line);
    }
  },

  showEdits: function(edits){
    this.data.edits = edits;
    this.render();
    PubSub.publish('transcripts.play_all', false);
    PubSub.publish('modal.invoke', this.id);
  },

  submit: function(e){
    e && e.preventDefault();

    PubSub.publish('transcript.line.submit', true);
  },

  togglePlay: function(e){
    e && e.preventDefault();

    PubSub.publish('player.toggle-play', true);
  }

});
