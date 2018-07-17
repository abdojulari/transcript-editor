$(document).ready(function(){
  $('.user_role').change(function(){
    var val = $(this).val()
    var user_id = $(this).attr('data-id')

    data = {
      'user': {
        'user_role_id': val
      }
    }
    updateUser(data, user_id)
  })

  $('.user_institution').change(function(){
    var val = $(this).val()
    var user_id = $(this).attr('data-id')

    data = {
      'user': {
        'institution_id': val
      }
    }
    updateUser(data, user_id);
  })

  function updateUser(data, userId){
    data = data;
    $.ajax({
      url: "/admin/users/" + userId + ".json",
      method: 'PUT',
      data: data,
      success: function(data, textStatus, jqXHR){
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    })

  }

})
