// Analytics functions
(function() {
  window.ANALYTICS = {};

  ANALYTICS.event = function(category, ev, label, value){
    // console.log(category, ev, label, value)
    if (ga) {
      if (label && value) ga('send', 'event', category, ev, label, value);
      else if (label) ga('send', 'event', category, ev, label);
      else ga('send', 'event', category, ev);
    }
  };
})();
