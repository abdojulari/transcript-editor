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
