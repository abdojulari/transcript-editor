// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  var collectionId = 0;
  var institutionId = 0;
  var sortId = '';
  var searchText = '';
  var firstTimeLoad = true;
  var theme = '';

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
  })

  function scrollUp(){
    var target  = $('#transcript-results').offset().top;
    $('html, body').animate({
      scrollTop: (target - 170)
    }, 1000);
  }

  function loadFirstTime(){
    institutionId = $('#instution_selected_id').val();
    collectionId = $('#collection_selected_id').val();
    loadTranscripts()
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
