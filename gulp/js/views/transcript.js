// Core Transcript view to be extended
app.views.Transcript = app.views.Base.extend({

  current_line_i: -1,

  centerOn: function($el){
    var offset = $el.offset().top,
        height = $el.height(),
        windowHeight = $(window).height(),
        animationDuration = 500,
        animationPadding = 100,
        timeSinceLastAction = 9999,
        currentTime = +new Date(),
        scrollOffset;

    // determine time since last action to prevent too many queued animations
    if (this.lastCenterActionTime) {
      timeSinceLastAction = currentTime - this.lastCenterActionTime;
    }
    this.lastCenterActionTime = currentTime;

    // determine scroll offset
    if (height < windowHeight) {
      scrollOffset = offset - ((windowHeight / 2) - (height / 2));

    } else {
      scrollOffset = offset;
    }

    // user is clicking rapidly; don't animate
    if (timeSinceLastAction < (animationDuration+animationPadding)) {
      $('html, body').scrollTop(scrollOffset);
    } else {
      $('html, body').animate({scrollTop: scrollOffset}, animationDuration);
    }

  },

  lineNext: function(){
    this.lineSelect(this.current_line_i + 1);
  },

  linePrevious: function(){
    this.lineSelect(this.current_line_i - 1);
  },

  lineSave: function(i){
    // override me
  },

  lineSelect: function(i){
    // check if in bounds
    var lines = this.data.transcript.lines;
    if (i < 0 || i >= lines.length) return false;

    this.lineSave(this.current_line_i);

    // select line
    this.current_line_i = i;
    this.current_line = this.data.transcript.lines[i];

    // update UI
    $('.line.active').removeClass('active');
    var $active = $('.line[sequence="'+i+'"]').first();
    $active.addClass('active');
    this.centerOn($active);

    // focus on input
    var $input = $active.find('input');
    if ($input.length) $input.first().focus();

    // play audio
    this.pause_at_time = this.current_line.end_time * 0.001;
    this.playerPlay(this.current_line.start_time);
  },

  lineSubmit: function(){
    this.lineNext(true);
  },

  lineToggle: function(){
    // not started yet, initialize to first line
    if (this.current_line_i < 0) {
      this.lineSelect(0);

    // replay the line if end-of-line reached
    } else if (this.pause_at_time !== undefined && this.player.currentTime >= this.pause_at_time && !this.player.playing) {
      this.playerPlay(this.current_line.start_time);

    // otherwise, just toggle play
    } else {
      this.playerToggle();
    }
  },

  listenForAuth: function(){
    var _this = this;

    // check auth sign in
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      _this.refresh();
    });

    // check sign out
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      _this.refresh();
    });
  },

  loadAudio: function(){
    // Player already loaded
    if (this.player) {

      // Transcript audio already loaded
      if ($(this.player).attr('data-transcript') == ""+this.data.transcript.id) {
        this.onAudioLoad();
        return false;
      }
      $(this.player).remove();
    }

    var _this = this,
      audio_urls = this.data.project.useVendorAudio && this.data.transcript.vendor_audio_urls.length ? this.data.transcript.vendor_audio_urls : [this.data.transcript.audio_url];

    // build audio string
    var audio_string = '<audio data-transcript="'+this.data.transcript.id+'" preload>';
    _.each(audio_urls, function(url){
      var ext = url.substr(url.lastIndexOf('.') + 1),
          type = ext;
      if (ext == 'mp3') type = 'mpeg';
      audio_string += '<source src="'+url+'" type="audio/'+type+'">';
    });
    audio_string += '</audio>';

    // create audio object
    var $audio = $(audio_string);
    this.player = $audio[0];

    // wait for it to load
    this.player.oncanplay = function(){
      if (_this.player_loaded) {
        _this.messageHide('Buffering audio...');
      } else {
        _this.player_loaded = true;
        _this.data.debug && console.log("Loaded audio files");
        _this.onAudioLoad();
      }
    };

    // check for time update
    this.player.ontimeupdate = function() {
      _this.onTimeUpdate();
    };

    // check for buffer time
    this.player.onwaiting = function(){
      _this.message('Buffering audio...');
    };

  },

  loadListeners: function(){
    // override me
  },

  loadPageContent: function(){
    // override me
  },

  loadTranscript: function(){
    var _this = this;

    this.$el.addClass('loading');

    this.model.fetch({
      success: function(model, response, options){
        _this.onTranscriptLoad(model);
      },
      error: function(model, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading this transcript. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  loadTutorial: function(tutorialName){
    // override me
  },

  message: function(text){
    $('#transcript-notifications').text(text);
  },

  messageHide: function(text){
    if ($('#transcript-notifications').text()==text) {
      $('#transcript-notifications').text('');
    }
  },

  onAudioLoad: function(){
    // override me
  },

  onTranscriptLoad: function(transcript){
    // override me
  },

  onTimeUpdate: function(){
    // override me
  },

  parseTranscript: function(){
    var _this = this,
        lines = this.data.transcript.lines,
        user_edits = this.data.transcript.user_edits;

    // make object for easy lookup
    var user_edits_map = _.object(_.map(user_edits, function(edit) {
      return [""+edit.transcript_line_id, edit.text]
    }));

    // add user text to lines
    _.each(lines, function(line, i){
      if (_.has(user_edits_map, ""+line.id)) {
        _this.data.transcript.lines[i].user_text = user_edits_map[""+line.id];
      }
    });
  },

  refresh: function(){
    this.current_line_i = -1;

    this.loadTranscript();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  playerPause: function(){
    if (this.player.playing) {
      this.player.pause();
      this.message('Paused');
    }
  },

  playerPlay: function(ms){

    // set time if passed
    if (ms !== undefined) {
      this.player.currentTime = ms * 0.001;
    }

    if (!this.player.playing) {
      this.player.play();
    }
  },

  playerToggle: function(){
    if (this.player.playing) {
      this.playerPause();

    } else {
      this.playerPlay();
    }
  },

  start: function(){
    this.$('.start-play').addClass('disabled');
    this.lineSelect(0);
  },

  submitEdit: function(data){
    var _this = this;
    this.message('Saving changes...');

    $.post(API_URL + "/transcript_edits.json", {transcript_edit: data}, function(resp) {
      _this.message('Changes saved.');
    });
  }

});