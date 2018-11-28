// @file
// mobile_warning.js

$(document).ready(function() {
  var dismissed = window.localStorage.getItem('Amplify.UI.MobileWarning.Dismissed');

  $('#mobile-warning button').click(function() {
    window.localStorage.setItem('Amplify.UI.MobileWarning.Dismissed', '1');
    setTimeout(function() {
      $('#mobile-warning').attr('aria-hidden', 'true');
    }, 0);
  });

  if ($(window).width() < 768 && !dismissed) {
    $('#mobile-warning').removeAttr('aria-hidden');
  }
});
