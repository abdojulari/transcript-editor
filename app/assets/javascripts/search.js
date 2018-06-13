$(document).on('turbolinks:load',function(){

  var collectionId = 0;
  var searchText = '';


  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });

  $('.select-option').click(function(){
    if ($(this).attr('data-filter') == 'collection'){
      collectionId = $(this).attr('data-id');
    }
    loadTranscripts();
    scrollUp()
  })

  $("#search-form").submit(function(event){
    searchText = $('#keyword').val()
    event.preventDefault();
    loadTranscripts()
    scrollUp()
  })

  function scrollUp(){
    $(window).trigger('scroll-to', [$('#search-form'), 10]);
  }

  function loadTranscripts(){
    data = {
      collection_id: collectionId,
      q: searchText
    };
    $.ajax({
        url: "/search/query",
        data: data,
      success: function(data, textStatus, jqXHR){
        var instance = new Mark("a.item-line");
        instance.mark(searchText)
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })
  }
  loadTranscripts()
})
