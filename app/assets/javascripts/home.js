// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){

  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });


  function loadTranscripts(){
    data = {};
    $.ajax({
        type: "POST",
        url: "/home/transcripts",
        data: data,
      success: function(data, textStatus, jqXHR){

      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })
  }

  loadTranscripts()
})
