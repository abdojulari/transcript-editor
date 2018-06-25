$(document).ready(function(){
  $('.user_role').change(function(){
    var val = $(this).val()
    var user_id = $(this).attr('data-id')

    data = {
      'user': {
        'user_role_id': val
      }
    }

    $.ajax({
      url: "/admin/users/" + user_id + ".json",
      method: 'PUT',
      data: data,
      success: function(data, textStatus, jqXHR){
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })

  })
})
