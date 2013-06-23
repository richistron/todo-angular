
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
    App.Views = App.Views || {};
    App.Views.docV = Backbone.View.extend({
      initialize: function() {
        return this.linkOne = $(this.$el).find("nav#navigation").find("ul").find('li').find('a')[0];
      }
    });
    App.Views.mainResponseV = Backbone.View.extend({
      initialize: function() {
        var _this = this;
        this.collection.on("add", this.addOne, this);
        this.collection.on("reset", this.reset, this);
        this.collection.reset();
        this.fetchingColl = this.collection.fetch();
        return this.fetchingColl.fail(function() {
          return _this.errorMsg();
        });
      },
      addOne: function(item) {
        var view;
        view = new App.Views.sectionV({
          model: item
        });
        view.reder();
        return $(this.$el).append(view.el);
      },
      reset: function() {
        return $(this.$el).html("");
      },
      isIe: function() {
        if ($.browser != null) {
          if ($.browser.msie != null) {
            this.errorMsg();
            return true;
          }
        }
        return false;
      },
      errorMsg: function() {
        return $(this.$el).html(App.Templates.Woops);
      },
      goTo: function(url) {
        var _this = this;
        this.deferred = $.Deferred();
        this.deferred.done(function() {
          var blog;
          if (_this.url != null) {
            blog = _this.url[1].split(":");
            return _.each($(_this.$el).find("#" + _this.url[0]).find(".box"), function(item, index) {
              var modelId, target;
              modelId = $(item).data("modelid");
              if (modelId === blog[0]) {
                target = parseInt(blog[1]) - 1;
                return $($(item).find(".articlePagination").find("a")[target]).trigger("click");
              }
            });
          }
        });
        this.fetchingColl.done(function() {
          $(_this.$el).find("section").hide();
          return $(_this.$el).find("#" + url).show();
        });
        return this.deferred.promise();
      }
    });
    App.Views.sectionV = Backbone.View.extend({
      tagName: "section",
      reder: function() {
        var tpl, tplParams;
        $(this.$el).attr("id", this.model.get("name"));
        tplParams = {
          items: this.model.get("items"),
          name: this.model.get("name")
        };
        tpl = (Mustache.compile(App.Templates.boxItem))(tplParams);
        $(this.$el).html(tpl);
        $(this.$el).hide();
        return this.setItemModels();
      },
      setItemModels: function() {
        var boxes, items, name,
          _this = this;
        boxes = $(this.$el).find("div.box");
        if (this.allViews == null) this.allViews = {};
        name = this.model.get("name");
        items = [];
        _.each(boxes, function(box, index) {
          var id, model, res, view;
          id = $(box).data("modelid");
          res = _.find(_this.model.attributes.items, function(item) {
            if (item.id === id) return item;
          });
          model = new App.Models.blogItem(res);
          view = new App.Views.blogItemV({
            model: model,
            el: $(box)
          });
          view.load();
          return items.push(view);
        });
        return this.allViews[name] = items;
      },
      events: {
        "click .articlePagination a": "pagination",
        "click a.readmore": "viewNote",
        "click article header a": "viewNote"
      },
      viewNote: function(e) {
        e.preventDefault();
        return console.log(e);
      },
      pagination: function(e) {
        var articles, blog, box, id, section, target;
        e.preventDefault();
        $(e.currentTarget).closest("div").find("a").removeClass("active");
        $(e.currentTarget).addClass("active");
        target = parseInt($(e.currentTarget).html()) - 1;
        articles = $(e.currentTarget).closest("div.box").find("article");
        $(articles).hide();
        $($(articles)[target]).show();
        box = $(e.currentTarget).closest(".box");
        blog = $(box).data("modelid");
        section = $(e.currentTarget).closest("section");
        id = $(section).attr("id");
        return Backbone.history.navigate("" + id + "/" + blog + ":" + ($(e.currentTarget).html()), {
          trigger: true
        });
      }
    });
    App.Views.blogItemV = Backbone.View.extend({
      render: function() {
        var data, items, link, tpl;
        data = {
          entries: this.model.attributes.entries,
          model: this.model.attributes
        };
        tpl = (Mustache.compile(App.Templates.entries))(data);
        $(this.$el).html(tpl);
        $(this.$el).find("article").not(":eq(0)").hide();
        items = [];
        _.each(this.model.attributes.entries, function(item, index) {
          return items.push({
            "index": index + 1
          });
        });
        data = {
          "items": items
        };
        tpl = (Mustache.compile(App.Templates.pagination))(data);
        $(this.$el).append(tpl);
        link = $(this.$el).find(".articlePagination").find("a")[0];
        return $(link).addClass("active");
      },
      load: function() {
        var feedOptions, tmp,
          _this = this;
        this.deferred = $.Deferred();
        $(this.$el).append($('<div class="tmp"></div>'));
        tmp = $(this.$el).find(".tmp");
        $(tmp).hide();
        this.deferred.done(function() {
          _this.render();
          return $(_this.$el).find(".tmp").remove();
        });
        feedOptions = {
          feeds: {
            "feed": this.model.attributes.urlFeed
          },
          max: 10,
          onComplete: function(data) {
            _this.model.attributes.entries = data;
            _this.deferred.resolve();
            if (App.bundle.reponseV.url != null) {
              if (App.bundle.reponseV.url[1].split(":")[0] === _this.model.attributes.id) {
                return App.bundle.reponseV.deferred.resolve();
              }
            }
          }
        };
        $(tmp).feeds(feedOptions);
        return this.deferred.promise();
      }
    });
    return window.App = App;
  })(window);

}).call(this);
