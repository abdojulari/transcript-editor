// @file
// mobile_warning.js

$(document).ready(function() {
  // Setting up two seperate dismissing scripts for each different pop-up type
  var homeWarning       = $('#mobile-warning[data-page="home"]');
  var transcriptWarning = $('#mobile-warning[data-page="transcript"]');

  var homeCookie        = 'Amplify.UI.MobileWarning.HomeDismissed';
  var transcriptCookie  = 'Amplify.UI.MobileWarning.TranscriptDismissed'

  var homeDismissed = window.localStorage.getItem(homeCookie);
  var transcriptDismissed = window.localStorage.getItem(transcriptCookie);

  homeWarning.find('.button').click(function() {
    dismissCookie(homeWarning, homeCookie);
  });

  transcriptWarning.find('.button').click(function() {
    dismissCookie(transcriptWarning, transcriptCookie);
  });

  if ($(window).width() < 768 && !homeDismissed) {
    homeWarning.removeAttr('aria-hidden');
  }
  if ($(window).width() < 768 && !transcriptDismissed) {
    transcriptWarning.removeAttr('aria-hidden');
  }
});

function dismissCookie(popUp, cookie) {
  window.localStorage.setItem(cookie, '1');
  setTimeout(function() {
    popUp.attr('aria-hidden', 'true');
  }, 0);
}
