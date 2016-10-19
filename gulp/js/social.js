// Social media integration.
window.app.socialIntegration = function() {
  this.socialLoadInterval = null;
  this.initialised = false;

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
  };

  // Initialises social widgets.
  this.init = function() {
    if (!this.initialised) {
      this.initSocialScripts();
    }

    var attempts = 0, max = 100;
    window.socialLoadInterval = setInterval(function() {
      var ready = readyForSocial(window);
      if (!!ready) {
        clearInterval(window.socialLoadInterval);
        this.showSocialWidgets();
      }
      attempts++;
      if (attempts >= max) {
        console.error('Gave up on loading social widgets.');
        clearInterval(window.socialLoadInterval);
      }
    }.bind(this), 100);
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
    window.fbLoad = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.6&appId=" + facebookAppId;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Insert Twitter script.
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
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
    }(document, "script", "twitter-wjs"));
  };
};

window.app.social = new window.app.socialIntegration();
document.addEventListener("DOMContentLoaded", function(event) {
  window.app.social.init();
});
