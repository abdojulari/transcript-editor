$(document).ready(function(){

  var collectionId = "";
  var searchText = '';


  $('.select.collection').click(function(){
    $(this).toggleClass( "active" )
  });

  $('.select-option').click(function(){
    if (this.classList.contains('menu-item')) {
      return true
    }

    if ($(this).attr('data-filter') == 'collection'){
      collectionId = $(this).attr('data-id');
    }
    loadTranscripts();
    scrollUp()
  })

  $("#keyword").on('keyup',function(e){
    if (($(this).val() == "") && (e.keyCode == 8)){
      searchText = "";
      loadTranscripts()
      scrollUp()
    }
  })


  $('.input').keypress(function (e) {
    if (e.which == 13) {
      $('#search-form').submit();
      return false;
    }
  });

  $("#search-form").submit(function(event){
    searchText = $('#keyword').val()
    event.preventDefault();
    loadTranscripts()
    scrollUp()
  })

  function scrollUp(){
    $(window).trigger('scroll-to', [$('#search-form'), 10]);
  }

  function progressHtml() {
    str = '<div class="progress"> \
        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" \
    style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div> \
      </div>'
    return str
  }

  function loadTranscripts(){
    searchText = $('#keyword').val()
    $(".transcript-list-search").html('<div class="loading"></div>')
    data = {
      collection_id: collectionId,
      q: searchText,
      deep: 1
    };
    $.ajax({
        url: "/search/query",
        data: data,
      success: function(data, textStatus, jqXHR){
        var instance = new Mark("a.item-line");
        if (instance) {
          instance.mark(searchText)
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })
  }
  loadTranscripts()
})
