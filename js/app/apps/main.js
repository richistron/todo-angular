
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
    return App.start = (function() {
      App.bundle = new App.Router;
      return Backbone.history.start({
        pushState: false
      });
    })();
  })(window);

}).call(this);
