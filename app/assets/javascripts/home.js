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

  $('#collection_search').on('click', '.select-option', function(){
    collectionId = $(this).attr('data-id')
    if (collectionId == 0) {
      institutionId = 0;
    }
    loadTranscripts();
  });

  $('#institution_search').on('click', '.select-option', function(){
    institutionId = $(this).attr('data-id')
    if (institutionId == 0) {
      collectionId = 0;
    }
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
    // 8 = backspace
    if (($(this).val() == "") && (e.keyCode == 8)){
      searchText = "";
      loadTranscripts()
    }
    // 13 = enter
    if (e.keyCode == 13) {
      searchText = $('#searchText').val()
      event.preventDefault();
      loadTranscripts()
    }
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
