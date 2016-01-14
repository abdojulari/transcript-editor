var AccountView = HeaderView.extend({

  el: '#account',

  template: _.template(PROJECT['templates']['account.ejs']),

  events: {
    "click .auth-link": "doAuthFromLink",
    "click .sign-out-link": "signOut"
  },

  initialize: function(data){
    this.data = data;

    this.listenForAuth();

    this.render();
  },

  doAuth: function(provider){
    $.auth
      .oAuthSignIn({provider: provider})
      .fail(function(resp) {
        alert('Authentication failure: ' + resp.errors.join(' '));
      });
  },

  doAuthFromLink: function(e){
    e.preventDefault();
    var provider = $(e.currentTarget).attr('data-provider');
    this.doAuth(provider);
  },

  listenForAuth: function(){
    var _this = this;

    // check auth sign in
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      _this.onValidationSuccess($.auth.user);
      alert('Successfully signed in!');
    });

    // check auth validation
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      _this.onValidationSuccess(user);
    });

    // check sign out
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      _this.onSignOutSuccess();
    });
  },

  onSignOutSuccess: function(){
    this.data.user = {};
    this.render();
  },

  onValidationSuccess: function(user){
    this.data.user = user;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  },

  signOut: function(e){
    e && e.preventDefault();

    $.auth.signOut();
  }

});
