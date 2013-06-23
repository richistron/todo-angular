
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
    App.Router = Backbone.Router.extend({
      routes: {
        "": "index",
        "*url": "routesHandler"
      },
      initialize: function() {
        this.docV = new App.Views.docV({
          el: document.body
        });
        this.responseC = new App.Collections.responseC;
        return this.reponseV = new App.Views.mainResponseV({
          el: $(this.docV.$el).find("#container"),
          collection: this.responseC
        });
      },
      index: function() {
        return Backbone.history.navigate($(this.docV.linkOne).attr("href"), {
          trigger: true
        });
      },
      routesHandler: function(url) {
        url = url.split("/");
        if (url.length >= 2) {
          this.reponseV.url = url;
          return this.reponseV.goTo(url[0]);
        } else {
          if (url[0] === "home") {
            url[0] = ($(this.docV.linkOne).attr("href")).replace("#", "");
          }
          if (this.reponseV.url != null) delete this.reponseV.url;
          return this.reponseV.goTo(url[0]);
        }
      }
    });
    return window.App = App;
  })(window);

}).call(this);
