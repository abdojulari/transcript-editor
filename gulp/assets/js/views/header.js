var HeaderView = BaseView.extend({

  el: '#header',

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    app.views.navigation = new NavigationView(this.data);
    app.views.account = new AccountView(this.data);
    return this;
  }

});
