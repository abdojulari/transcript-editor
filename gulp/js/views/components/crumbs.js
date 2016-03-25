app.views.Crumbs = app.views.Base.extend({

  template: _.template(TEMPLATES['crumbs.ejs']),

  initialize: function(data){
    this.data = data;

    this.data.crumbs = this.data.crumbs || [];

    this.listenForCrumbs();

    this.render();
  },

  listenForCrumbs: function(){
    var _this = this;

    // check for transcript load
    PubSub.subscribe('transcript.load', function(ev, data) {
      var crumb = {'label': data.label || data.transcript.title};
      if (data.transcript.image_url) crumb.image = data.transcript.image_url;
      if (data.transcript.url) {
        crumb.url = data.transcript.url;
        crumb.title = 'Return To Main Site';
        _this.data.crumbs = [crumb, {label: 'Transcript'}];

      } else {
        _this.data.crumbs = [crumb];
      }

      _this.render();
    });


  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
