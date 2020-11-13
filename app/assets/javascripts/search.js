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

  function setSelect2() {
    $("select:not([multiple=multiple])").select2({
      theme: "amplify",
      minimumResultsForSearch: Infinity
    });
  }

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
  loadTranscripts();
  setSelect2();
})
