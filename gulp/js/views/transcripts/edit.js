app.views.TranscriptEdit = app.views.Transcript.extend({

  template: _.template(TEMPLATES['transcript_edit.ejs']),

  initialize: function(data){
    this.data = data;

    this.loadConventions();
    this.loadTranscript();
    // this.loadTutorial();
    this.listenForAuth();
  },

  lineEditDelete: function(i){
    if (i < 0) return false;

    var $input = $('.line[sequence="'+i+'"] .text-input').first();
    if (!$input.length) return false;
    var line = this.data.transcript.lines[i];

    // display the original text
    $input.val(line.display_text);

    // update UI
    $input.attr('user-value', '');
    $input.closest('.line').removeClass('user-edited');

    // submit edit
    this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: '', is_deleted: 1});
  },

  lineSave: function(i){
    if (i < 0) return false;

    var $input = $('.line[sequence="'+i+'"] .text-input').first();
    if (!$input.length) return false;

    var line = this.data.transcript.lines[i];
    var text = $input.val();
    var userText = $input.attr('user-value');

    // implicit save; save even when user has not edited original text
    // only save if line is editable
    if (text != userText && line.is_editable) {

      // update UI
      $input.attr('user-value', text);
      $input.closest('.line').addClass('user-edited');

      // submit edit
      this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: text, is_deleted: 0});
    }
  },

  lineVerify: function(data){
    var line = data.line,
        text = data.text;

    var $input = $('.line[sequence="'+line.sequence+'"] .text-input').first();
    if (!$input.length) return false;

    // update UI
    $input.val(text);
    $input.attr('user-value', text);
    $input.closest('.line').addClass('user-edited');

    // submit edit
    this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: text, is_deleted: 0});
  },

  loadListeners: function(){
    var _this = this,
        controls = this.data.project.controls;

    // remove existing listeners
    $('.control').off('click.transcript');
    $(window).off('keydown.transcript');
    PubSub.unsubscribe('transcript.line.select');
    PubSub.unsubscribe('transcript.line.submit');
    PubSub.unsubscribe('transcript.line.verify');
    PubSub.unsubscribe('transcript.edit.delete');
    this.$el.off('click.transcript', '.start-play');

    // add link listeners
    $('.control').on('click.transcript', function(e){
      e.preventDefault();
      var $el = $(this);

      _.each(controls, function(control){
        if ($el.hasClass(control.id)) {
          _this[control.action]();
        }
      });

    });

    // add keyboard listeners
    $(window).on('keydown.transcript', function(e){
      _.each(controls, function(control){
        if (control.keyCode == e.keyCode && (control.shift && e.shiftKey || !control.shift)) {
          e.preventDefault();
          _this[control.action] && _this[control.action]();
          return false;
        }
      });
    });

    // add line listeners
    PubSub.subscribe('transcript.line.select', function(ev, line) {
      _this.lineSelect(line.sequence);
    });
    PubSub.subscribe('transcript.line.submit', function(ev, data){
      _this.lineSubmit();
    });

    // add verify listener
    PubSub.subscribe('transcript.line.verify', function(ev, data) {
      _this.lineVerify(data);
    });

    // add edit delete listener
    PubSub.subscribe('transcript.edit.delete', function(ev, line) {
      _this.lineEditDelete(line.sequence);
    });

    // add edit delete listener
    PubSub.subscribe('player.toggle-play', function(ev, data) {
      _this.lineToggle();
    });

    // add start listener
    this.$el.on('click.transcript', '.start-play', function(e){
      e.preventDefault();
      _this.start();
    });
  },

  loadPageContent: function(){
    this.data.page_content = '';

    if (this.data.project.pages['transcript_edit.md']) {
      var page = new app.views.Page(_.extend({}, this.data, {page_key: 'transcript_edit.md'}))
      this.data.page_content = page.toString();
    }
  },

  loadTutorial: function(){
    var _this = this,
        tutorial = this.data.project.modals['tutorial_edit'];

    // show the tutorial if it hasn't been seen yet or should always be seen
    if (tutorial && (tutorial.displayMethod=="always" || !$.cookie('tutorial_edit-tutorial'))) {
      PubSub.publish('modal.invoke', 'tutorial_edit');
      $.cookie('tutorial_edit-tutorial', 1);
    }
  },

  onAudioLoad: function(){
    this.data.debug && console.log("Loaded audio files");

    this.render();
    this.$el.removeClass('loading');
    this.$('.start-play').removeClass('disabled');
    this.loadListeners();
    this.message('Loaded transcript');
    if (!this.loaded) this.loaded = true;
    if (this.queue_start) this.start();
    this.queue_start = false;
  },

  onTranscriptLoad: function(transcript){
    this.data.debug && console.log("Transcript", transcript.toJSON());

    PubSub.publish('transcript.load', {
      transcript: transcript.toJSON(),
      action: 'edit',
      label: transcript.get('title')
    });

    this.data.transcript = transcript.toJSON();
    this.parseTranscript();
    this.loadPageContent();
    this.loadAudio();
  },

  onTimeUpdate: function(){
    if (this.player.playing) this.playerState('playing');
    if (this.pause_at_time !== undefined && this.player.currentTime >= this.pause_at_time) {
      this.playerPause();
    }
  },

  selectTextRange: function(increment){
    var $input = $('.line.active input').first();
    if (!$input.length) return false;

    var input = $input[0],
        text = input.value.replace(/\s{2,}/g, ' ').trim(),
        words = text.split(/\ +/),
        start = 0,
        end = 0;

    // remove multiple spaces
    if (text.length != input.value.length) {
      var cursorPos = $input.getInputSelection().start;
      $input.val(text);
      $input.setInputPosition(cursorPos);
    }

    // default to select where the cursor is
    var selection = $input.getInputSelection(),
        sub_text = text.substring(0, selection.start),
        sel_index = sub_text.split(/\ +/).length - 2;

    // text is selected
    if (selection.end > selection.start) {
      sel_index++;

    // no text selected
    } else {

      // moving left
      if (increment < 0) sel_index+=2;

      // if beginning of word
      if (selection.start <= 0 || text.charAt(selection.start-1)==' ') {
        if (increment < 0) sel_index--;

      // if end of word
      } else if (selection.start >= text.length-1 || text.charAt(selection.start)==' ') {
        if (increment > 0) sel_index++;
      }
    }

    // determine word selection
    sel_index += increment;
    if (sel_index >= words.length) {
      sel_index = 0;
    }
    if (sel_index < 0) {
      sel_index = words.length - 1;
    }

    // determine start/end of current word
    $.each(words, function(i, w){
      if (i==sel_index) {
        end = start + w.length;
        return false;
      }
      start += w.length + 1;
    });

    if (input.setSelectionRange){
      input.setSelectionRange(start, end);
    }
  },

  wordPrevious: function(){
    this.selectTextRange(-1);
  },

  wordNext: function(){
    this.selectTextRange(1);
  }

});
