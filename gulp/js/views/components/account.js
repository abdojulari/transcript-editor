app.views.Account = app.views.Base.extend({

  el: '#account-container',

  template: _.template(TEMPLATES['account.ejs']),

  events: {
    "click .auth-link": "doAuthFromLink",
    "click .check-auth-link": "checkAuthForLink",
    "click .sign-out-link": "signOut"
  },

  initialize: function(data){
    this.data = data;
    this.data.score = 0;
    this.loadListeners();
    this.loadUser();

    this.render();
  },

  // this function needs to be refactor later
  loadUser: function(){
    console.log('Logged in user');
    // Testing
    user = {"id":65,
        "provider":"google_oauth2",
        "uid":"102719382952152084692",
        "name":"Sameera Gayan",
        "nickname":null,
        "image":"https://lh3.googleusercontent.com/-0KsUqCpdSmU/AAAAAAAAAAI/AAAAAAAAAKY/F7zMcCGAy5o/photo.jpg",
        "email":"sameera@reinteractive.net",
        "user_role_id":4,
        "lines_edited":7
    }
    this.checkLogin()
    PubSub.publish('auth.validation.success', user)
    console.log("user 1 logs in...")
  },

  checkLogin: function(){
    console.log("check login...")
    user = {"id":65,
        "provider":"google_oauth2",
        "uid":"102719382952152084692",
        "name":"Sameera Gayan",
        "nickname":null,
        "image":"https://lh3.googleusercontent.com/-0KsUqCpdSmU/AAAAAAAAAAI/AAAAAAAAAKY/F7zMcCGAy5o/photo.jpg",
        "email":"sameera@reinteractive.net",
        "user_role_id":4,
        "lines_edited":7
    }


    // debugger
    // $.auth.data.user.signedIn = true;
    this.data.signedIn = true;
    this.data.user = user;
    this.data.score = user.lines_edited;
    // this.render();
  },

  doAuth: function(provider) {
    $.auth
      .oAuthSignIn({provider: provider})
      .fail(function(resp) {
        $(window).trigger('alert', ['Authentication failure: ' + resp.errors.join(' ')]);
      });
  },

  doAuthFromLink: function(e){
    e.preventDefault();
    var provider = $(e.currentTarget).attr('data-provider');
    this.doAuth(provider);
  },

  checkAuthForLink: function(e) {
    e.preventDefault();
    $.auth.validateToken()
    .then(function(user) {
      // Valid, redirect to destination path.
      console.log('checkAuthForLink success');
      window.location.href = e.target.href;
    })
    .fail(function() {
      // Failed, report error.
      console.log('checkAuthForLink failure');
      $(window).trigger('alert', [
        'You must log in as admin to access this section.',
        true,
      ]);
    });
  },

  listenForAuth: function(){
    var _this = this;

    // check auth sign in
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      _this.onValidationSuccess($.auth.user);
      $(window).trigger('alert', ['Successfully signed in as '+$.auth.user.name+'!  Refreshing page...', true]);
    });

    // check auth validation
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      _this.onValidationSuccess(user);
    });

    // check sign out
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      _this.onSignOutSuccess();
      $(window).trigger('alert', ['Successfully signed out! Refreshing page...', true]);
    });
  },

  loadListeners: function(){
    var _this = this;

    this.listenForAuth();

    // user submitted new edit; increment
    PubSub.subscribe('transcript.edit.submit', function(ev, data){
      if (data.is_new && _this.data.user.signedIn) {
        _this.data.score += 1;
        _this.updateScore();
      }
    });
  },

  onSignOutSuccess: function(){
    this.data.user = {};
    this.data.score = 0;
    // this.render();
    // Redirect to homepage when user logs out.
    window.history.pushState({}, document.title, '/');
  },

  onValidationSuccess: function(user){
    this.data.user = user;
    this.data.score = user.lines_edited;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  },

  signOut: function(e){
    e && e.preventDefault();

    $.auth.signOut();
  },

  updateScore: function(){
    this.$('.score').text(UTIL.formatNumberTiny(this.data.score)).addClass('active');
  }

});
