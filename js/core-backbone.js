
/*
	richisCore v1.0
	@Author @richistron
	@description coffeeScript and backbone core
	@License MIT
*/

(function() {
  var APP, App, app, blogsModel, sectionModel;

  sectionModel = Backbone.Model.extend({});

  blogsModel = Backbone.Model.extend({});

  APP = {
    Models: {
      "blogsModel": blogsModel,
      "sectionModel": sectionModel
    },
    Views: {
      "blogView": Backbone.View.extend({
        events: {
          "click a": function(e) {
            e.preventDefault();
            return console.log(e);
          }
        },
        tagName: "div",
        className: "box",
        render: function() {
          var html, html_;
          html_ = Mustache.compile(this.template);
          html = html_(this.model.toJSON());
          return this.$el.append(html);
        },
        template: "				<article>					<header>						<h1>							<a href=\"{{urlFeed}}\">								{{title}}							</a>						</h1>					</header>					<div class=\"thumb\">					<img src=\"{{logo}}\" alt=\"{{title}}\">					</div>					<p>						{{slogan}}						<a href=\"{{urlFeed}}\" class=\"readmore\">							Rss						</a>					</p>					<span class=\"author\">						Author: <strong>{{author}}</strong>					</span>				</article>			"
      }),
      "blogViewCollections": Backbone.View.extend({
        tagName: "p",
        initialize: function() {
          this.collection.on("add", this.addOne, this);
          return this.collection.on("reset", this.addAll, this);
        },
        addAll: function() {
          return this.collection.forEach(this.addOne, this);
        },
        addOne: function(element) {
          var blogView;
          blogView = new APP.Views.blogView({
            model: element
          });
          blogView.render();
          return this.$el.append(blogView.el);
        }
      }),
      "sectionView": Backbone.View.extend({
        tagName: "section",
        render: function() {
          var section;
          section = this.model.get("id");
          this.blogCollection_ = new APP.Collections.blogCollection;
          this.blogViewCollections_ = new APP.Views.blogViewCollections({
            collection: this.blogCollection_
          });
          this.blogCollection_.fetch({
            data: {
              "section": section
            }
          });
          this.blogViewCollections_.render();
          this.$el.attr("id", this.model.get("id"));
          return this.$el.html(this.blogViewCollections_.el);
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
      "blogCollection": Backbone.Collection.extend({
        model: blogsModel,
        url: "feeds.php",
        parse: function(response) {
          this.response = response;
          return this.response;
        }
      }),
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
        var _this = this;
        this.sectionCollection = new APP.Collections.sectionCollection;
        this.sectionCollectionView = new APP.Views.sectionCollectionView({
          el: $("#container"),
          collection: this.sectionCollection
        });
        this.defaultSection = "blogs";
        return this.sectionCollection.fetch({
          success: function() {
            var section;
            section = window.location.hash;
            if (section === "") {
              section = _this.defaultSection;
            } else {
              section = section.replace("#", "");
            }
            return _this.sectionCollectionView.showSection(section);
          }
        });
      },
      routes: {
        "(:idStr)": "index"
      },
      index: function(id) {
        if (id == null) id = "blogs";
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
