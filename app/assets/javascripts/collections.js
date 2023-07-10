// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var institutionSlug;

  $('#institution').on('change', function(){
    institutionSlug = $(this).val();
    loadCollections();
  });

  function loadCollections(){
    data = {
      institution_slug: institutionSlug,
    };
    $(".collect-list").html('<div class="lds-ripple"><div></div><div></div></div>')
    $.ajax({
      type: "POST",
      url: "/collections/list",
      data: {institution_slug: institutionSlug},
      error: function(jqXHR, textStatus, errorThrown){
        $(".collect-list").html('Error when reading collection..')
      }
    })
  }
  loadCollections()
})
