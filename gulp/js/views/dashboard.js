app.views.Dashboard = app.views.Base.extend({

  template: _.template(TEMPLATES['user_dashboard.ejs']),

  el: '#main',

  initialize: function(data){
    this.data = data;
    this.secondsPerLine = 5;
    this.listenForAuth();
  },

  listenForAuth: function(){
    var _this = this;

    // check auth validation
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      _this.loadData(user);
    });
  },

  loadData: function(user){
    var _this = this;

    this.data.transcripts = [];

    $.getJSON("/transcript_edits.json", {user_id: user.id}, function(data) {
      if (data.edits && data.edits.length) {
        _this.parseEdits(data.edits, data.transcripts);
      }
      _this.render();
    });
  },

  parseEdits: function(edits, transcripts){
    var _this = this;

    edits = _.map(edits, function(edit){
      var e = _.clone(edit);
      e.updated_at = Date.parse(e.updated_at)/1000;
      return e;
    });

    var transcripts = _.map(transcripts, function(transcript, i){
      var t = _.clone(transcript);
      t.index = i;
      t.edits = _.filter(edits, function(e){ return e.transcript_id==transcript.id; });
      t.edit_count = t.edits.length;
      t.seconds_edited = t.edit_count * _this.secondsPerLine;
      var last_edit = _.max(t.edits, function(e){ return e.updated_at; });
      if (last_edit) t.updated_at = last_edit.updated_at;
      return t;
    });

    this.data.transcripts = _.sortBy(transcripts, function(t){ return t.updated_at; }).reverse();
    this.data.edit_count = edits.length;
    this.data.seconds_edited = this.data.edit_count * this.secondsPerLine;
  },

  render: function() {
    this.$el.html(this.template(this.data));
    this.$el.removeClass('loading');

    return this;
  }

});
