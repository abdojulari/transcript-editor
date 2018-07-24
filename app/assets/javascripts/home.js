// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  var collectionId = 0;
  var institutionId = 0;
  var sortId = '';
  var searchText = '';
  var firstTimeLoad = true;
  var theme = '';


  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });

  $('#collection_search').on('click', '.select-option', function(){
    collectionId = $(this).attr('data-id')
    loadTranscripts();
  });

  $('.select-option').on('click', function(){
    if (this.classList.contains('menu-item')) {
      return true
    }
    if ($(this).attr('data-filter') === 'collection'){
      collectionId = $(this).attr('data-id');
    }
    if ($(this).attr('data-filter') === 'institution'){
      institutionId = $(this).attr('data-id');
      // when institution changes, reset the collection id
      collectionId = 0;
    }
    if ($(this).attr('data-filter') === 'sorting'){
      sortId = $(this).attr('data-id');
    }
    if ($(this).attr('data-filter') === 'theme'){
      theme = $(this).attr('data-id');
    }

    loadTranscripts();
  })

  $("#search-form").submit(function(event){
    searchText = $('#searchText').val()
    event.preventDefault();
    loadTranscripts()
  })

  $("#searchText").on('keyup',function(e){
    if (($(this).val() == "") && (e.keyCode == 8)){
      searchText = "";
      loadTranscripts()
    }
  })


  function scrollUp(){
    var target  = $('#search-form').offset().top;
    $('html, body').animate({
      scrollTop: target
    }, 1000);
  }

  function loadTranscripts(){
    data = {
      institution_id: institutionId,
      collection_id: collectionId,
      sort_id: sortId,
      text: searchText,
      theme: theme
    };
    $(".transcript-list").html('<div class="loading"></div>')
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
  loadTranscripts()
})
