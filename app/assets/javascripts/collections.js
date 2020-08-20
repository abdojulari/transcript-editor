// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  var institutionId = 0;

  $('#data_institution_id').on('change', function(){
    institutionId = $(this).val();
    loadCollections();
  });

  function loadCollections(){
    data = {
      institution_id: institutionId,
    };
    $(".collect-list").html('<div class="lds-ripple"><div></div><div></div></div>')
    $.ajax({
      type: "POST",
      url: "/collections/list",
      data: {institution_id: institutionId},
      error: function(jqXHR, textStatus, errorThrown){
        $(".collect-list").html('Error when reading collection..')
      }
    })
  }
  loadCollections()
})
