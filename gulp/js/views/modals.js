app.views.Modals = app.views.Base.extend({

  el: '#app',

  events: {
    "click .modal-dismiss": "dismissModals",
    "click .modal-invoke": "invokeModalFromLink"
  },

  initialize: function(data){
    this.data = data;
    this.lastInvoked = false;

    this.loadListeners();
    this.render();
  },

  dismissModals: function(){
    this.$('.modal').removeClass('active');
  },

  invokeModal: function(id){
    this.$('#'+id).find('.modal').addClass('active');
    this.lastInvoked = id;
  },

  invokeModalFromLink: function(e){
    e.preventDefault();

    this.invokeModal($(e.currentTarget).attr('data-modal'));
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('modal.invoke', function(ev, id) {
      _this.invokeModal(id);
    });
  },

  render: function() {
    // modals have already been rendered
    if (this.$('.modal').length) return this;

    var _this = this,
        pages = this.data.project.pages;

    _.each(this.data.project.modals, function(modal, id){
      // render modal
      var data = _.extend({}, modal, {id: id, project: _this.data.project});
      var modal = new app.views.Modal(data);
      _this.$el.append(modal.$el);
    });

    return this;
  }

});
