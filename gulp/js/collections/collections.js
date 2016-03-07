app.collections.Collections = Backbone.Collection.extend({

  url: function() {
    return API_URL + '/collections.json';
  }

});
