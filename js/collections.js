
/*
	Collections
*/

(function() {
  var APP;

  APP = window.APP || {};

  APP.Collections = APP.Collections || {};

  APP.Collections = {
    "blogCollection": Backbone.Collection.extend({
      model: APP.Models.blogsModel,
      url: "feeds.php",
      parse: function(response) {
        this.response = response;
        return this.response;
      }
    }),
    "sectionCollection": Backbone.Collection.extend({
      url: "feeds.php",
      model: APP.Models.sectionModel,
      parse: function(response) {
        var arr;
        this.response = response;
        arr = [];
        _.each(this.response, function(item, index) {
          var section;
          section = {
            "id": index
          };
          return arr.push(section);
        });
        return arr;
      }
    })
  };

  window.APP = APP;

}).call(this);
