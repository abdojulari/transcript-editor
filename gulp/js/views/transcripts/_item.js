app.views.TranscriptItem = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_item.ejs']),

  tagName: "a",
  className: "transcript-item",
  audioDelay: 500,

  events: {
    'mouseover': 'on',
    'mouseout': 'off'
  },

  initialize: function(data){
    this.data = _.extend({}, data);
    this.transcript = this.data.transcript;
    this.timeout = false;
    this.player = false;
    this.render();
    this.loadListeners();
  },

  audioInit: function(audio_urls){
    var _this = this;

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
    // attach to view so it gets destroyed when view gets destroyed
    this.$el.append($audio);
    this.player = $audio[0];

    // check for buffer time
    this.player.onwaiting = function(){
      _this.$el.addClass('buffering');
    };

    // check for time update
    this.player.ontimeupdate = function() {
      _this.$el.removeClass('buffering');
      if (_this.queue_pause) _this.audioPause();
    };
  },

  audioPause: function(){
    if (this.player) {
      this.player.pause();
    }
  },

  audioPlay: function(){
    if (!this.transcript.audio_urls.length) return false;

    PubSub.publish('player.playing', this.transcript.id);

    if (!this.player) {
      this.audioInit(this.transcript.audio_urls);
    }

    if (!this.player.playing && !this.queue_pause) {
      this.player.play();
    }
  },

  loadListeners: function(){
    var _this = this;

    // ensure only one player is playing at a time
    PubSub.subscribe('player.playing', function(e, id){
      if (_this.transcript.id != id) {
        _this.off();
      }
    });
  },

  off: function(e){
    this.queue_pause = true;
    if (this.timeout) clearTimeout(this.timeout);
    this.audioPause();
  },

  on: function(e){
    this.queue_pause = false;
    var _this = this;
    this.timeout = setTimeout(function(){_this.audioPlay()}, this.audioDelay);
  },

  render: function(){
    var transcript = this.transcript;

    // build title
    var title = transcript.title;
    if (transcript.collection_title) title = transcript.collection_title + ': ' + title;
    if (transcript.description) title = title + ' - ' + transcript.description;
    this.$el.attr('title', title);

    this.$el.attr('href', transcript.path);
    this.$el.html(this.template(transcript));
    return this;
  }

});
