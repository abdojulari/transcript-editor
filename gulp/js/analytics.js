// Analytics functions
(function() {
  window.ANALYTICS = {};

  ANALYTICS.event = function(category, ev, label, value) {
    if (typeof(ga) !== 'undefined') {
      if (label && value) ga('send', 'event', category, ev, label, value);
      else if (label) ga('send', 'event', category, ev, label);
      else ga('send', 'event', category, ev);
    }
  };
})();
