(function() {
  /*
  	richisCore v1.0
  	@Author @richistron
  	@description coffeeScript and backbone core
  	@License MIT
  */  var App, Core;
  Core = {
    Models: {
      itemModel: Backbone.Model.extend({})
    },
    Views: {
      itemView: Backbone.View.extend({}),
      collectionView: Backbone.View.extend({})
    },
    Collections: {
      itemCollection: Backbone.Collection.extend({
        url: "feeds.php",
        parse: function(data) {
          console.log(data);
          return data;
        }
      })
    }
  };
  App = new (Backbone.Router.extend({
    routes: {
      "": "index"
    },
    initialize: function() {
      this.itemCollection = new Core.Collections.itemCollection;
      this.collectionView = new Core.Views.collectionView({
        collection: this.itemCollection
      });
      return console.log(this.collectionView.el);
    },
    start: function() {
      return Backbone.history.start({
        pushState: true
      });
    },
    index: function() {
      return this.itemCollection.fetch({
        data: {
          "blogs": true
        }
      });
    }
  }));
  $(document).ready(function() {
    return App.start();
  });
}).call(this);
