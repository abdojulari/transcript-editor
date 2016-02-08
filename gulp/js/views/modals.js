app.views.Modals = app.views.Base.extend({

  el: '#app',

  events: {
    "click .modal-dismiss": "dismissModals",
    "click .modal-invoke": "invokeModalFromLink"
  },

  initialize: function(data){
    this.data = data;

    this.render();
  },

  dismissModals: function(){
    this.$('.modal').removeClass('active');
  },

  invokeModal: function(id){
    this.$('#'+id).find('.modal').addClass('active');
  },

  invokeModalFromLink: function(e){
    e.preventDefault();

    this.invokeModal($(e.currentTarget).attr('data-modal'));
  },

  render: function() {
    // modals have already been rendered
    if (this.$('.modal').length) return this;

    var _this = this,
        pages = this.data.project.pages;

    _.each(this.data.project.modals, function(modal, id){
      var modal_pages = modal.page ? [modal.page] : modal.pages;

      // retrieve page contents
      _.each(modal_pages, function(page, i){
        modal_pages[i]['contents'] = pages[page.file];
      });

      // render modal
      var data = _.extend({}, modal, {id: id, pages: modal_pages});
      var modal = new app.views.Modal(data);
      _this.$el.append(modal.$el);
    });

    return this;
  }

});
