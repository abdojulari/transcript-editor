app.views.Modal = app.views.Base.extend({

  tagName: "div",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['modal.ejs']),

  events: {
    "click .modal-tab": "tab"
  },

  initialize: function(data){
    this.data = _.extend({}, data);

    this.data.active_page = 0;
    this.data.active = false;

    this.loadContents();
    this.render();
  },

  loadContents: function(){
    var _this = this,
        modal_pages = this.data.page ? [this.data.page] : this.data.pages;

    // retrieve page contents
    _.each(modal_pages, function(page, i){
      var pageView = new app.views.Page(_.extend({}, _this.data, {page_key: page.file}));
      modal_pages[i]['contents'] = pageView.toString();
    });

    this.data.pages = modal_pages;
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  },

  tab: function(e){
    var $tab = $(e.currentTarget);
    this.data.active_page = parseInt($tab.attr('data-tab'));
    this.data.active = true;
    this.render();
  }

});
