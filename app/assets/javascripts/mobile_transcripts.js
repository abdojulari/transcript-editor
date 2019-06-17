$(window).load(function(){
  // Hides the line text input on mobile
  // Replaces with static text
  
  if ($(window).width() < 768) {
    var $transcriptLineInputs = $('#transcript-lines .text-input')
    $.each($transcriptLineInputs, function() {
      var $input = $(this)
      var $text  = $input.val()
      var $container = $input.parent()

      $input.hide()
      $container.append('<span class="mobile-text">' + $text + '</span>')
    });
  }
});
