app.views.TranscriptLineVerify = app.views.Base.extend({

  id: "transcript-line-verify",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_line_verify.ejs']),

  events: {
    "click .option": "select",
    "click .submit": "submit",
    "click .none-correct": "noneCorrect"
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

  closeAndSubmit: function(){
    PubSub.publish('modals.dismiss', true);
    PubSub.publish('transcript.line.submit', true);
  },

  noneCorrect: function(e){
    e.preventDefault();
    var _this = this;

    this.$el.find('.option').removeClass('active');

    setTimeout(function(){
      _this.closeAndSubmit();
    }, 1000);
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

    $options.not('[edit-id="'+edit_id+'"]').removeClass('active');
    $option.toggleClass('active');

    // set selected edit as active
    this.data.edits = _.map(this.data.edits, function(edit){
      edit.active = false;
      if (edit.id == edit_id && $option.hasClass('active')) {
        edit.active = true;
      }
      return edit;
    });

    PubSub.publish('transcript.line.verify', {
      line: line,
      text: $option.text(),
      is_active: $option.hasClass('active') ? 1 : 0
    });
  },

  showEdits: function(edits){
    this.data.edits = edits;
    this.render();
    PubSub.publish('modal.invoke', this.id);
  },

  submit: function(e){
    e.preventDefault();

    this.closeAndSubmit();
  }

});
