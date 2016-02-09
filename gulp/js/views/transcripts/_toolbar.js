app.views.TranscriptToolbar = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_toolbar.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);

    this.data.controls = this.data.controls || this.data.project.controls;

    this.loadMenu();
    this.render();
  },

  loadMenu: function(){
    var menu = this.data.menu,
        menus = this.data.project.menus;

    this.data.menu = "";

    if (menu && menus[menu]) {
      var data = _.extend({}, this.data, {tagName: "div", menu_key: "transcript_edit"});
      var menuView = new app.views.Menu(data);
      this.data.menu = menuView.toString();
    }
  },

  render: function(){
    this.$el.html(this.template(this.data));
  }

});
