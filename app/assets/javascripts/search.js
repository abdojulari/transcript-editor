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

  function scrollUp(){
    var target  = $('#search-form').offset().top;
    $('html, body').animate({
      scrollTop: target
    }, 1000);
  }

  $("#search-form").submit(function(event){
    searchText = $('#keyword').val()
    event.preventDefault();
    loadTranscripts()
    scrollUp()
  })


  function loadTranscripts(){
    data = {
      institution_id: institutionId,
      collection_id: collectionId,
      q: searchText,
      theme: theme
    };

    $(".search_results").html('<div class="lds-ripple"><div></div><div></div></div>')
    $.ajax({
        url: "/search/query",
        data: {data: data},
      success: function(data, textStatus, jqXHR){
        if (!firstTimeLoad) {
          scrollUp()
        }
        firstTimeLoad = false;
        var instance = new Mark(".search_item");
        if (instance) {
          instance.mark(searchText)
        }
      }
    })
  }
  loadTranscripts()
})
