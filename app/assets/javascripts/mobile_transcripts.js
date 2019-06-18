$(window).load(function(){
  // Hides the line text input on mobile
  // Replaces with static text
  $('.mobile-toggle').removeClass('disabled');
  generateStaticText();

  $(window).on('resize', function(){
    toggleInput()
  });

});

function generateStaticText() {
  var $transcriptLineInputs = $('#transcript-lines .text-input')
  $.each($transcriptLineInputs, function() {
    var $input = $(this)
    var $text  = $input.val()
    var $container = $input.parent()

    $container.append('<span class="mobile-text">' + $text + '</span>')
  });
  toggleInput()
}

function hideInput() {
  $('#transcript-lines .text-input').hide();
  $('#transcript-lines .mobile-text').show();
}

function showInput() {
  $('#transcript-lines .text-input').show();
  $('#transcript-lines .mobile-text').hide();
}

function toggleInput() {
  if ($(window).width() < 768) {
    hideInput();
  } else {
    showInput();
  }
}
