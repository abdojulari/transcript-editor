// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
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

  $(".home-form").submit(function(event){
    $(this).find(":input").filter(function(){ return !this.value; }).attr("disabled", "disabled");
    $("#transcript-results").html('<div class="lds-ripple"><div></div><div></div></div>');
  })

  function setSelect2() {
    $("select:not([multiple=multiple])").select2({
      theme: "amplify",
      minimumResultsForSearch: Infinity
    });
  }

  function scrollDown(){
    var results = $('#transcript-results');
    if (results[0]) {
      var target  = results.offset().top;
      $('html, body').animate({
        scrollTop: (target - 200)
      }, 1000);
    }
  }

  $(document).on("turbolinks:before-cache", function() {
    $("select:not([multiple=multiple])").select2('destroy');
  });

  $(document).on('turbolinks:load', function() {
    $(".home-form").find( ":input" ).prop( "disabled", false );
    setSelect2();
    scrollDown();

    $('#institution').change(function() {
      $(this.form).submit();
    });
  });
})

// Turbolinks scroll
Turbolinks.scroll = {};

document.addEventListener("turbolinks:load", function() {

  const elements = document.querySelectorAll("[data-turbolinks-scroll]");

  elements.forEach(function(element){

    element.addEventListener("click", function() {
      Turbolinks.scroll['top'] = document.scrollingElement.scrollTop;
    });

    element.addEventListener("submit", function() {
      Turbolinks.scroll['top'] = document.scrollingElement.scrollTop;
    });

  });

  if (Turbolinks.scroll['top']) {
    document.scrollingElement.scrollTo(0, Turbolinks.scroll['top']);
  }

  Turbolinks.scroll = {};
});