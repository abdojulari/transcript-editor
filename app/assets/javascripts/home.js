// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  var collectionId = 0;
  var institutionId = 0;
  var sortId = '';
  var searchText = '';
  var firstTimeLoad = true;
  var theme = '';

  $(document).mouseup(function(e) {
    var container = $("#data_theme_");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.hide();
      $('.toggle-data_theme_').css('visibility','visible');
    }

    var container2 = $("#data_collection_id_");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container2.is(e.target) && container2.has(e.target).length === 0)
    {
      container2.hide();
      $('.toggle-data_collection_id_').css('visibility','visible');
    }
  });

  $('.toggle-data_theme_').click(function() {
    $('.toggle-data_theme_').css('visibility','hidden')
    $('#data_theme_').show();
  });

  $('.toggle-data_collection_id_').click(function() {
    $('.toggle-data_collection_id_').css('visibility','hidden')
    $('#data_collection_id_').show();
  });

  $('#reset').on('click', function(){
    collectionId = 0;
    institutionId = 0;
    sortId = '';
    searchText = '';
    firstTimeLoad = true;
    theme = '';
    preventDefault();
    loadTranscripts();
  });

  $(".home-form").submit(function(event){
    $("#transcript-results").html('<div class="lds-ripple"><div></div><div></div></div>')
    scrollUp();
  })

  function scrollUp(){
    var target  = $('#transcript-results').offset().top;
    $('html, body').animate({
      scrollTop: (target - 200)
    }, 1000);
  }

  function loadFirstTime(){
    institutionId = $('#instution_selected_id').val();
    collectionId = $('#collection_selected_id').val();
    loadTranscripts();
  }

  function loadTranscripts(){
    data = {
      institution_id: institutionId,
      collection_id: collectionId,
      sort_id: sortId,
      text: searchText,
      theme: theme
    };

    $("#transcript-results").html('<div class="lds-ripple"><div></div><div></div></div>')

    $.ajax({
        type: "POST",
        url: "/home/transcripts",
        data: {data: data},
      success: function(data, textStatus, jqXHR){
        if (!firstTimeLoad) {
          scrollUp()
        }
        firstTimeLoad = false;
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })
  }

  loadFirstTime();
})
