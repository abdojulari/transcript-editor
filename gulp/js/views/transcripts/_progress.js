app.views.TranscriptUserProgress = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_user_progress.ejs']),

  el: '#transcript-user-progress',

  events: {
    'click .progress-toggle': 'toggle'
  },

  initialize: function(data){
    var _this = this;

    this.data = {};

    // create a copy with only necessary values
    this.lines = _.map(data.lines, function(line, i){
      return {
        index: i,
        id: line.id,
        sequence: line.sequence,
        edited: line.user_text.length > 0
      }
    });

    this.calculate();
    this.render();
    this.loadListeners();
  },

  calculate: function(){
    var available_lines = this.lines.length;
    var edited_lines = _.reduce(this.lines, function(memo, line){
      var add = line.edited ? 1 : 0;
      return memo + add;
    }, 0);

    this.data.lines_edited = edited_lines;
    this.data.percent_edited = 0;
    this.data.lines_available = 0;

    if (available_lines > 0) {
      this.data.percent_edited = UTIL.round(edited_lines/available_lines*100, 1);
      this.data.lines_available = available_lines;
    }
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcript.edit.submit', function(ev, data) {
      _this.onLineEdit(data.transcript_line_id);
    });
  },

  onLineEdit: function(line_id){
    if (this.data.lines_available <= 0) return;

    var line = _.find(this.lines, function(line){ return line.id == line_id; });
    if (line && !line.edited) {
      this.lines[line.index].edited = true;
      this.calculate();
      this.render();
    }

    if (this.data.percent_edited >= 1) {
      PubSub.publish('transcript.finished', true);
    }
  },

  render: function(){
    if (this.data.lines_edited > 0) this.$el.addClass('active');
    this.$('.progress-content').html(this.template(this.data));
  },

  toggle: function(e){
    e.preventDefault();

    this.$el.toggleClass('minimized');
  }

});
