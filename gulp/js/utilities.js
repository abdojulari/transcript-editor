// Plugin: add "playing" property for media
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

// Plugin: get input selection (http://stackoverflow.com/a/2897510/5578115)
(function($) {
  $.fn.getInputSelection = function() {
    var input = this.get(0);
    var selection = {start: 0, end: 0, text: ''};
    if (!input) return; // No (input) element found
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      selection.start = input.selectionStart;
      selection.end = input.selectionEnd;
      selection.text = input.value.substring(selection.start, selection.end);
    } else if (document.selection) {
      // IE
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      selection.start = sel.text.length - selLen;
      selection.end = selection.start + selLen;
      selection.text = sel.text;
    }
    return selection;
  }
})(jQuery);

(function($) {
  $.fn.setInputPosition = function(position) {
    var input = this.get(0);
    if (!input) return; // No (input) element found
    input.focus();
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      input.setSelectionRange(position, position);
    } else if (input.createTextRange) {
      // IE
      var sel = input.createTextRange();
      sel.move('character', position);
      sel.select();
    }
  }
})(jQuery);

(function($) {
  $.fn.getTextSize = function() {
    var id = 'text-width-tester',
        text = this.val(),
        $tag = $('#' + id),
        styles = {
          fontWeight: this.css('font-weight'),
          fontSize: this.css('font-size'),
          fontFamily: this.css('font-family'),
          display: 'none'
        };
    if (!$tag.length) {
      $tag = $('<span id="' + id + '">' + text + '</span>');
      $tag.css(styles);
      $('body').append($tag);
    } else {
      $tag.css(styles).html(text);
    }
    return {
      width: $tag.width(),
      height: $tag.height()
    }
  }
})(jQuery);

// Utility functions
(function() {
  window.UTIL = {};

  UTIL.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  UTIL.formatNumberTiny = function(num, dec) {
    if (!dec && dec!==0) dec = 1;
    var formatted = num;
    if (num > 1000000) formatted = UTIL.round(num/1000000, dec) + 'M+';
    else if (num == 1000000) formatted = '1M';
    else if (num > 99999) formatted = UTIL.round(num/1000) + 'K+';
    else if (num > 1000) formatted = UTIL.round(num/1000, dec) + 'K+';
    else if (num == 1000) formatted = '1K';
    return formatted;
  };

  // Format seconds -> hh:mm:ss
  UTIL.formatTime = function(seconds, dec) {
    var s = seconds || 0,
        h = parseInt(Math.floor(s / 3600)) % 24,
        m = parseInt(Math.floor(s / 60)) % 60,
        s = UTIL.round(s % 60, dec),
        string;

    // create format hh:mm:ss
    string = (h > 0 ? h + ':' : '') + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    // remove starting zeros
    if (string[0] == '0') string = string.substring(1, string.length);
    return string;
  };

  // Format seconds -> 1h 20m
  UTIL.formatTimeAlt = function(seconds) {
    var s = seconds || 0,
        h = parseInt(Math.floor(s / 3600)) % 24,
        m = parseInt(Math.floor(s / 60)) % 60,
        s = UTIL.round(s % 60),
        string;
    // create format 1h 20m
    if (m > 0) {
      string = (h > 0 ? h + 'h ' : '') + m + 'm';
    } else {
      string = s + 's';
    }
    return string;
  };

  UTIL.formatTimeMs = function(milliseconds, dec) {
    return UTIL.formatTime(milliseconds*0.001, dec);
  };

  // Convert hh:mm:ss -> seconds
  UTIL.getSeconds = function(string, dec) {
    var parts = string.split(':').reverse(),
        seconds = 0;
    // go from hh:mm:ss to seconds
    for (var i=parts.length-1; i>=0; i--) {
      switch( i ) {
        case 2: // hours
          seconds += parseInt(parts[i]) * 60 * 60;
          break;
        case 1: // minutes
          seconds += parseInt(parts[i]) * 60;
          break;
        case 0: // seconds
          seconds += parseFloat(parts[i]);
          break
        default:
          break;
      }
    }
    return UTIL.round(seconds, dec);
  };

  // Make a random id
  UTIL.makeId = function(length){
    var text = "",
        alpha = "abcdefghijklmnopqrstuvwxyz",
        alphanum = "abcdefghijklmnopqrstuvwxyz0123456789",
    length = length || 8;
    for(var i=0; i < length; i++) {
      if (i <= 0) { // must start with letter
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
      } else {
        text += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
      }
    }
    return text;
  };

  UTIL.randomNumber = function(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  };

  // Round to decimal
  UTIL.round = function(num, dec) {
    num = parseFloat(num);
    dec = dec || 0;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  };

})();
