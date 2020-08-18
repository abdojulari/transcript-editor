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
    var container2 = $("#data_collection_id_");
    var handler = $("#theme-filter:not('.open')");
    var handler2 = $("#collection-filter:not('.open')");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $("#theme-filter").removeClass('open');
      container.hide();
    }

    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
      $("#collection-filter").removeClass('open');
      container2.hide();
    }

    if (handler.is(e.target) || handler.has(e.target).length > 0) {
      handler.addClass('open');
      container.show();
    }

    if (handler2.is(e.target) || handler2.has(e.target).length > 0) {
      handler2.addClass('open');
      container2.show();
    }
  });

  $("select:not([multiple=multiple])").select2({
    theme: "amplify",
    minimumResultsForSearch: Infinity
  });

  $('#data_theme_').change(function() {
    var size = $(this).find('input[type=checkbox]:checked').size();
    $('#theme-filter').text("Themes (" + size + ")");
  });

  $('#data_theme_ input[type=checkbox]').change(function() {
    $(this).parent(".option").toggleClass("checked");
  });

  $('#data_institution_id').change(function() {
    $(this.form).submit();
  });

  $('#reset').on('click', function(e){
    collectionId = 0;
    institutionId = 0;
    sortId = '';
    searchText = '';
    firstTimeLoad = true;
    theme = '';
    e.preventDefault();
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
