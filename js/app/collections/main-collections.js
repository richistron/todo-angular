
/*
	Richistron frontend
	@richistron
	06/22/2013
	MIT License
*/

(function() {

  (function(window) {
    var App;
    App = window.App || {};
    App.Collections = App.Collections || {};
    App.Collections.responseC = Backbone.Collection.extend({
      url: "feeds.php",
      sync: function(method, model, options) {
        switch (method) {
          case "read":
            if (options.url == null) options.url = this.url;
            return Backbone.sync.call(model, method, model, options);
          default:
            return false;
        }
      },
      parse: function(data) {
        var items;
        this.data = data;
        items = [];
        _.each(this.data, function(item, index) {
          var section;
          section = {};
          section.name = index;
          section.items = item;
          return items.push(section);
        });
        return items;
      }
    });
    return window.App = App;
  })(window);

}).call(this);
