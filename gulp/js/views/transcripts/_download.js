app.views.TranscriptDownload = app.views.Base.extend({

  id: "transcript-download",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_download.ejs']),

  events: {
    "click .download": "download",
    "submit .download-form": "download",
    "change .formatOption": "selectFormat",
    "change .format-options input": "updateURL"
  },

  initialize: function(data){
    var _this = this;

    this.data = _.extend({}, data);
    this.data.active = false;
    this.data.transcript = false;

    this.base_url = API_URL + '/transcript_files/' + this.data.transcript_id;

    // check for transcript load
    PubSub.subscribe('transcript.load', function(ev, data) {
      _this.onTranscriptLoad(data.transcript);
    });
  },

  download: function(e){
    e && e.preventDefault();

    var url = this.$('#transcript-download-url').val();
    window.open(url);
  },

  onTranscriptLoad: function(transcript){
    this.data.transcript = transcript;
    this.render();
    this.updateURL();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  selectFormat: function(e){
    var $input = $(e.currentTarget),
        format = $input.val();

    this.$('.format-options').removeClass('active');
    this.$('.format-options[data-format="'+format+'"]').addClass('active');

    this.updateURL();
  },

  updateURL: function(e){
    var format = this.$('input:radio[name="format"]:checked').val();
    var options = this.$('.format-options.active input').serialize();
    var url = this.base_url + '.' + format;

    if (options.length) {
      url += "?" + options;
    }

    this.$('#transcript-download-url').val(url);
  }

});
