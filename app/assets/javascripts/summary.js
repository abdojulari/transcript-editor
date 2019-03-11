$(document).ready(function(){
  $('#institution_id').change(function() {
   if (!$(this).val() || !$(this).val().length) {
     $('#collection').val('');
   }
   loadSummary();
  });

  $('#collection').on("change", "#collection_select", function() {
    loadSummary();
  });

  function loadSummary() {
    var institutionId = $("#institution_id").val() || 0
    var collectionId = (
      institutionId === 0 ?
      0 :
      $("#collection_select").val() || 0
    );
    $.ajax({
      method: 'get',
      url: '/admin/summary/details',
      data: {
        institution_id: institutionId,
        collection_id: collectionId
      }
    });
  }
})
