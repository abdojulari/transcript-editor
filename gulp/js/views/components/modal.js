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

    this.render();
  },

  tab: function(e){
    var $tab = $(e.currentTarget);
    this.data.active_page = parseInt($tab.attr('data-tab'));
    this.data.active = true;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});
