
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
    App.Models = {};
    App.Models.blogItem = Backbone.Model.extend({
      initialize: function() {},
      sync: function(method, model, options) {
        return Backbone.sync.call(model, method, model, options);
      }
    });
    return window.App = App;
  })(window);

}).call(this);
