// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  var collectionId = 0;
  var sortId = '';
  var searchText = '';


  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });

  $('.select-option').click(function(){
    if ($(this).attr('data-filter') == 'collection'){
      collectionId = $(this).attr('data-id');
    }
    if ($(this).attr('data-filter') == 'sorting'){
      sortId = $(this).attr('data-id');
    }
    loadTranscripts();
    scrollUp()
  })

  $("#search-form").submit(function(event){
    searchText = $('#searchText').val()
    event.preventDefault();
    loadTranscripts()
    scrollUp()
  })

  function scrollUp(){
    $(window).trigger('scroll-to', [$('#search-form'), 10]);
  }

  function loadTranscripts(){
    data = {
      collectionId: collectionId,
      sortId: sortId,
      text: searchText
    };
    $.ajax({
        type: "POST",
        url: "/home/transcripts",
        data: {data: data},
      success: function(data, textStatus, jqXHR){
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })
  }
  loadTranscripts()
})
