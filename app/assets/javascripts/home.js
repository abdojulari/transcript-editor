// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('turbolinks:load',function(){
  var collectionId = 0;
  var sortId = '';
  var searchText = '';


  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });

  $('.select-option').click(function(){
    if (this.classList.contains('menu-item')) {
      return true
    }
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

  $("#searchText").on('keyup',function(e){
    if (($(this).val() == "") && (e.keyCode == 8)){
      searchText = "";
      loadTranscripts()
      scrollUp()
    }
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
    $(".transcript-list").html('<div class="loading"></div>')
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
