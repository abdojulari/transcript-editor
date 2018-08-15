// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  var institutionId = 0;

  $('#institution_search').on('click', '.select-option', function(){
    institutionId = $(this).attr('data-id')
    loadCollections();
  });

  function loadCollections(){
    data = {
      institution_id: institutionId,
    };
    $(".collect-list").html('<div class="loading"></div>')
    $.ajax({
        type: "POST",
        url: "/collections/list",
        data: {institution_id: institutionId},
      success: function(data, textStatus, jqXHR){
      },
      error: function(jqXHR, textStatus, errorThrown){
      }
    })
  }
  loadCollections()
})
