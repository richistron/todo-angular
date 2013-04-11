(function() {
  /*
  	richisCore v1.0
  	@Author @richistron
  	@description coffeeScript and backbone core
  	@License MIT
  */
  /*
  	models
  */  var APP, App, app, blogsModel, sectionModel;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  sectionModel = Backbone.Model.extend({});
  blogsModel = Backbone.Model.extend({});
  /*
  	APP
  */
  APP = {
    Models: {
      "blogsModel": blogsModel,
      "sectionModel": sectionModel
    },
    Views: {
      "blogView": Backbone.View.extend({
        events: {
          "click .articlePagination a": "pagBehavior"
        },
        tagName: "div",
        className: "box",
        pagBehavior: function(e) {
          var element, target;
          e.preventDefault();
          element = e.currentTarget;
          target = $(element).attr("href");
          target = target.replace("#", "");
          $(element).closest(".box").find("article").hide();
          $(element).closest(".box").find("article").filter(":eq(" + target + ")").show();
          $(element).closest(".articlePagination").find('a').removeClass("active");
          return $(element).addClass("active");
        },
        rssRender: function() {
          var data, htmlStr, htmlStr_, pagination, paginationTpl, tpl;
          tpl = "				{{#rssData}}					<article>						<header>							<h1>								<a href=\"{{link}}\" target=\"_blank\">									{{title}}								</a>							</h1>						</header>						<div class=\"thumb\">							<img src=\"{{model.logo}}\" alt=\"{{model.title}}\">						</div>						<p>							{{contentSnippet}}							<a href=\"{{link}}\" target=\"_blank\" class=\"readmore\">								Leer más							</a>						</p>						<span class=\"author\">							Author: <strong>{{author}}</strong>						</span>					</article>				{{/rssData}}								";
          paginationTpl = "				<div class=\"articlePagination\">					<% _.each(data,function(item,i){ %>						<a href=\"#<%= i %>\"><%= i + 1 %></a>					<% }); %>				</div>				";
          data = {
            model: this.model.toJSON(),
            rssData: this.rssData
          };
          htmlStr_ = Mustache.compile(tpl);
          htmlStr = htmlStr_(data);
          data = {
            data: this.rssData
          };
          pagination = _.template(paginationTpl, data);
          return htmlStr = "" + htmlStr + " " + pagination;
        },
        render: function() {
          var html, html_;
          html_ = Mustache.compile(this.template);
          html = html_(this.model.toJSON());
          this.$el.append(html);
          return this.loadRss();
        },
        loadRss: function() {
          var feedConf;
          feedConf = {
            feeds: {
              feed: this.model.get("urlFeed")
            },
            max: 10,
            loadingTemplate: APP.loading,
            onComplete: __bind(function(rssData) {
              this.rssData = rssData;
              $(this.$el).html(this.rssRender());
              $(this.$el).find("article").hide();
              $(this.$el).find("article").filter(':eq(0)').show();
              return $(this.$el).find(".articlePagination").find("a:eq(0)").addClass("active");
            }, this)
          };
          return $(this.$el).feeds(feedConf);
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
  /*
  	document view
  */
  App = Backbone.View.extend({
    Routers: new (Backbone.Router.extend({
      initialize: function() {
        this.sectionCollection = new APP.Collections.sectionCollection;
        this.sectionCollectionView = new APP.Views.sectionCollectionView({
          el: $("#container"),
          collection: this.sectionCollection
        });
        this.defaultSection = "blogs";
        return this.sectionCollection.fetch({
          success: __bind(function() {
            var section;
            section = window.location.hash;
            if (section === "") {
              section = this.defaultSection;
            } else {
              section = section.replace("#", "");
            }
            return this.sectionCollectionView.showSection(section);
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
      },
      "click footer a": function(e) {
        var link;
        e.preventDefault();
        link = e.currentTarget.href;
        return window.open(link, "_blank");
      }
    },
    start: function() {
      return Backbone.history.start({
        pushState: false
      });
    }
  });
  /*
  	new app
  */
  app = new App({
    el: document.body
  });
  $(document).ready(function() {
    return app.start();
  });
}).call(this);
