app.models.Transcript = Backbone.Model.extend({

  parse: function(resp){
    return resp;
  },

  url: function(){
    var id = this.get('uid') || this.id;
    return API_URL + '/transcripts/'+id+'.json';
  }

});
