app.views.TranscriptLine = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_line.ejs']),

  events: {
    "click": "select",
    "click .star": "star",
    "click .flag": "flag",
    "click .verify": "verify"
  },

  initialize: function(data){
    this.data = _.extend({}, data);
    this.line = this.data.line || {};
    this.edits = this.data.edits || [];
    this.render();
  },

  flag: function(e){
    e.preventDefault();
    $(e.currentTarget).toggleClass('active');
  },

  loadEdits: function(onSuccess){
    var _this = this;
    $.getJSON("/transcript_edits.json", {transcript_line_id: this.line.id}, function(data) {
      if (data.length) {
        _this.edits = _this.parseEdits(data);
        onSuccess && onSuccess();
      }
    });
  },

  parseEdits: function(_edits){
    var line = this.line,
        edits = [],
        texts = [];

    _.each(_edits, function(edit, i){
      if (!_.contains(texts, edit.text)) {
        if (line.user_text == edit.text) {
          edit.active = true;
        }
        texts.push(edit.text);
        edits.push(edit);
      }
    });

    return edits;
  },

  render: function(){
    this.$el.html(this.template(this.line));
  },

  select: function(e){
    e && e.preventDefault();
    PubSub.publish('transcript.line.select', this.line);
  },

  star: function(e){
    e.preventDefault();
    $(e.currentTarget).toggleClass('active');
  },

  verify: function(e){
    e && e.preventDefault();
    this.select();

    var _this = this;

    if (!this.edits.length) {
      this.loadEdits(function(){
        _this.verify();
      });
      return false;
    }

    PubSub.publish('transcript.edits.load', {
      edits: this.edits,
      line: this.line
    });
  }

});
