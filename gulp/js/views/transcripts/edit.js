app.views.TranscriptEdit = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_edit.ejs']),
  template_line: _.template(TEMPLATES['transcript_line.ejs']),

  initialize: function(data){
    this.data = data;
    this.data.template_line = this.template_line;

    this.current_line_i = -1;

    this.loadTranscript();
  },

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

  lineSelect: function(i){
    // check if in bounds
    var lines = this.data.transcript.lines;
    if (i < 0 || i >= lines.length) return false;

    // select line
    this.current_line_i = i;
    this.current_line = this.data.transcript.lines[i];

    // update UI
    $('.line.active').removeClass('active');
    var $active = $('.line[sequence="'+i+'"]').first();
    $active.addClass('active');
    this.centerOn($active);
    $active.find('input').focus();

    // play audio
    this.pause_at_time = this.current_line.end_time * 0.001;
    this.playerPlay(this.current_line.start_time);
  },

  lineSubmit: function(){
    if (this.current_line_i < 0) {
      this.lineSelect(0);
      this.playerPlay();
      return false;
    }

    this.lineNext();
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

  loadAudio: function(){
    var _this = this,
      audio_urls = this.data.project.use_vendor_audio && this.data.transcript.vendor_audio_urls.length ? this.data.transcript.vendor_audio_urls : [this.data.transcript.audio_url];

    // build audio string
    var audio_string = '<audio preload>';
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
    this.player_loaded = false;

    // wait for it to load
    this.player.oncanplay = function(){
      if (_this.player_loaded) {
        _this.message('');
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

    $('.start-play').on('click', function(e){
      e.preventDefault();
      _this.start();
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

  message: function(text){
    $('#transcript-notifications').text(text);
  },

  onAudioLoad: function(){
    this.render();
    this.$el.removeClass('loading');
    this.loadListeners();
    this.message('Loaded transcript');
  },

  onLoad: function(transcript){
    this.data.debug && console.log("Transcript", transcript.toJSON());

    PubSub.publish('transcript.load', {
      transcript: transcript.toJSON(),
      action: 'edit',
      label: 'Editing Transcript: ' + transcript.get('title')
    });

    this.data.transcript = transcript.toJSON();
    this.loadPageContent();
    this.loadAudio();
  },

  onTimeUpdate: function(){
    if (this.pause_at_time !== undefined && this.player.currentTime >= this.pause_at_time) {
      this.playerPause();
    }
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

  selectTextRange: function(increment){
    var $input = $('.line.active input').first();
    if (!$input.length) return false;

    var sel_index = $input.attr('data-sel-index') ? parseInt($input.attr('data-sel-index')) : -1,
        input = $input[0],
        text = input.value,
        words = text.split(' '),
        start = 0,
        end = 0;

    // determine word selection
    sel_index += increment;
    if (sel_index >= words.length) {
      sel_index = 0;
    }
    if (sel_index < 0) {
      sel_index = words.length - 1;
    }

    $.each(words, function(i, w){
      if (i==sel_index) {
        end = start + w.length;
        return false;
      }
      start += w.length + 1;
    });

    if (input.setSelectionRange){
      input.setSelectionRange(start, end);
      $input.attr('data-sel-index', sel_index);
    }
  },

  start: function(){
    this.lineSelect(0);
  },

  wordPrevious: function(){
    this.selectTextRange(-1);
  },

  wordNext: function(){
    this.selectTextRange(1);
  }

});
