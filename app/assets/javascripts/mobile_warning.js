// @file
// mobile_warning.js

$(document).ready(function() {
  // Setting up two seperate dismissing scripts for each different pop=up type

  var homeWarning = $('#mobile-warning[data-page="home"]')
  var transcriptWarning = $('#mobile-warning[data-page="transcript"]')

  var homeDismissed = window.localStorage.getItem('Amplify.UI.MobileWarning.HomeDismissed');
  var transcriptDismissed = window.localStorage.getItem('Amplify.UI.MobileWarning.TranscriptDismissed');

  homeWarning.find('.button').click(function() {
    window.localStorage.setItem('Amplify.UI.MobileWarning.HomeDismissed', '1');
    setTimeout(function() {
      homeWarning.attr('aria-hidden', 'true');
    }, 0);
  });

  transcriptWarning.find('.button').click(function() {
    window.localStorage.setItem('Amplify.UI.MobileWarning.TranscriptDismissed', '1');
    setTimeout(function() {
      transcriptWarning.attr('aria-hidden', 'true');
    }, 0);
  });

  if ($(window).width() < 768 && !homeDismissed) {
    homeWarning.removeAttr('aria-hidden');
  }
  if ($(window).width() < 768 && !transcriptDismissed) {
    transcriptWarning.removeAttr('aria-hidden');
  }
});
