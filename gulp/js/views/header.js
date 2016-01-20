app.views.Header = app.views.Base.extend({

  el: '#header',

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    var navigation = new app.views.Navigation(this.data);
    var account = new app.views.Account(this.data);
    return this;
  }

});
