app.views.Page = app.views.Base.extend({

  template: _.template(TEMPLATES['page.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);

    this.data.content = this.data.content || '';

    this.getPageContent();

    if (this.el) this.render();

    this.displayQueryStringAlert();
  },

  getPageContent: function(){
    var page_key = this.data.page_key;
    var pages = this.data.project.pages;

    if (!page_key) return false;
    
    // add .md extension if we can't find the page
    if (!pages[page_key]) page_key += '.md';

    if (pages[page_key]) {
      var template = _.template(pages[page_key]);
      this.data.content = template(this.data);
    }
  },

  getPageTitle: function() {
    if (!!this.data.page_key) {
      var matches = this.data.content.match(/<h1.*>([^<]+)<\/h1>/);
      if (!!matches) {
        return matches[1];
      }
    }
    return '';
  },

  render: function() {
    this.$el.html(this.toString());
    var pageTitle = this.getPageTitle();
    if (!!pageTitle.length) {
      document.title = app.pageTitle(pageTitle);
    }
    return this;
  },

  toString: function(){
    return this.template(this.data);
  },

  displayQueryStringAlert: function() {
    // Determine if we need to throw out an alert on load.
    // Do some rough query string param parsing to get the value
    // of show_alert, which we use in lieu of flash.
    if (!!window.location.search && window.location.search.length) {
      var might_show_alert = window.location.search.match(/show_alert=([^&]+)/);
      if (!!might_show_alert) {
        $(window).trigger('alert', [
          decodeURIComponent(might_show_alert[1]).replace(/\+/g, ' '),
          true,
        ]);

        // Strip alert from URL and force refresh.
        var newUrl = window.location.href
          .replace("show_alert=" + might_show_alert[1])
          .replace(/(&+)/, '&')
          .replace(/(\?&)/, '?');
        window.history.pushState({}, document.title, newUrl);
      }
    }
  }

});
