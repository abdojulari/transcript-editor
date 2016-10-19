// Social media integration.
window.app.socialIntegration = function() {
  this.socialLoadIntervalId = null;
  this.initialised = false;
  this.attempts = 0;
  this.maxAttempts = 100;
  this.shown = false;

  // Tests whether social media JS has loaded and initialised.
  var readyForSocial = function(win) {
    return (
      !!win.twttr &&
      !!win.twttr.widgets &&
      !!win.twttr.widgets.load &&
      !!win.FB &&
      !!win.FB.XFBML &&
      !!win.FB.XFBML.parse
    );
  };

  // Shows social media widgets.
  // Must be called after readyForSocial resolves to TRUE.
  this.showSocialWidgets = function() {
    window.twttr.widgets.load();
    FB.XFBML.parse();
    this.shown = true;
  };

  // Checks the progress of the loader so far.
  this.runInterval = function() {
    // Short circuit.
    if (this.shown) {
      return;
    }

    // Check to see if we are ready to display.
    var ready = readyForSocial(window);
    if (!!ready) {
      clearInterval(this.socialLoadIntervalId);
      this.showSocialWidgets();
      return;
    }

    // Check to see if we've let it go on too long.
    this.attempts++;
    if (this.attempts >= this.maxAttempts) {
      console.error('Gave up on loading social widgets.');
      clearInterval(this.socialLoadIntervalId);
      return;
    }
  }.bind(this);

  // Initialises social widgets.
  this.init = function() {
    if (!this.initialised) {
      this.initSocialScripts();
    }
    this.attempts = 0;
    this.socialLoadIntervalId = setInterval(this.runInterval, 100);
  };

  // Load Facebook.
  this.initFacebook = function(d, s, id, fbAppId) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.6&appId=" + fbAppId;
    fjs.parentNode.insertBefore(js, fjs);
    return true;
  };

  // Load Twitter.
  this.initTwitter = function(d, s, id) {
    var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  };

  // Initialise social media external Javascript,
  // and set up any HTML scaffolding.
  this.initSocialScripts = function() {
    // Insert fb-root element.
    var body = document.getElementsByTagName('body')[0];
    var fbRoot = document.createElement('div');
    fbRoot.setAttribute('id', 'fb-root');
    body.insertBefore(fbRoot, body.firstChild);

    // Insert Facebook script.
    window.fbLoad = this.initFacebook(document, 'script', 'facebook-jssdk', facebookAppId);

    // Insert Twitter script.
    window.twttr = this.initTwitter(document, "script", "twitter-wjs");
  };
};

window.app.social = new window.app.socialIntegration();
document.addEventListener("DOMContentLoaded", function(event) {
  window.app.social.init();
});
