(function() {
  /*
  	richisCore v1.0
  	@Author @richistron
  	@description coffeeScript and backbone core
  	@License MIT
  */  var APP, App, app, sectionModel;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  sectionModel = Backbone.Model.extend({});
  APP = {
    Models: {
      "sectionModel": sectionModel
    },
    Views: {
      "sectionView": Backbone.View.extend({
        tagName: "section",
        render: function() {
          this.$el.attr("id", this.model.get("id"));
          return this.$el.html(this.model.get("id"));
        }
      }),
      "sectionCollectionView": Backbone.View.extend({
        addAll: function() {
          return this.collection.forEach(this.addOne, this);
        },
        addOne: function(element) {
          var sectionView;
          sectionView = new APP.Views.sectionView({
            model: element
          });
          sectionView.render();
          return this.$el.append(sectionView.el);
        },
        showSection: function(section) {
          this.$el.find("section").hide();
          return this.$el.find("section#" + section).show();
        },
        initialize: function() {
          this.$el.html("");
          this.collection.on("add", this.addOne, this);
          return this.collection.on("reset", this.addAll, this);
        }
      })
    },
    Collections: {
      "sectionCollection": Backbone.Collection.extend({
        url: "feeds.php",
        model: sectionModel,
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
    },
    loading: "<img src=\"/img/loading.gif\" alt=\"loading...\" />"
  };
  App = Backbone.View.extend({
    Routers: new (Backbone.Router.extend({
      initialize: function() {
        this.sectionCollection = new APP.Collections.sectionCollection;
        this.sectionCollectionView = new APP.Views.sectionCollectionView({
          el: $("#container"),
          collection: this.sectionCollection
        });
        return this.sectionCollection.fetch({
          success: __bind(function() {
            return this.sectionCollectionView.showSection("blogs");
          }, this)
        });
      },
      routes: {
        "(:idStr)": "index"
      },
      index: function(id) {
        if (id == null) {
          id = "blogs";
        }
        return this.sectionCollectionView.showSection(id);
      }
    })),
    events: {
      "click #navigation a": function(e) {
        e.preventDefault();
        return Backbone.history.navigate(e.target.hash, {
          trigger: true
        });
      }
    },
    start: function() {
      return Backbone.history.start({
        pushState: false
      });
    }
  });
  app = new App({
    el: document.body
  });
  $(document).ready(function() {
    return app.start();
  });
}).call(this);
