app.models.Transcript = Backbone.Model.extend({

  parse: function(resp){
    return resp;
  },

  url: function(){
    return API_URL + '/transcripts/'+this.id+'.json';
  }

});
