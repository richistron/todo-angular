(function() {
  /*
  	richisCore v1.0
  	@Author @richistron
  	@description coffeeScript and backbone core
  	@License MIT
  */  var App, a;
  a = {};
  a.Model = Backbone.Model.extend({});
  a.View = Backbone.View.extend({
    className: "box",
    template: "				<article data-logo=\"{{logo}}\">		<header>                            			<h1>				<a href=\"{{url}}\">										{{title}}				</a>			</h1>		</header>                        		<div class=\"thumb\">			<img src=\"{{logo}}\" alt=\"logo\"/>		</div>		<p>			{{slogan}}			<a href=\"{{urlFeed}}\" class=\"readmore\">Rss</a>		</p>                        		<span class=\"author\"> 			Author: <strong> {{author}} </strong> 		</span>	</article>	",
    render: function() {
      var tpl;
      tpl = Mustache.compile(this.template);
      return this.$el.html(tpl(this.model.toJSON()));
    }
  });
  a.CollectionView = Backbone.View.extend({
    render: function() {
      var html;
      this.$el.attr("id", "blogs");
      html = this.addAll();
      return this.$el.html(html);
    },
    tagName: "section",
    addOne: function(item) {
      var rssItemViewm;
      rssItemViewm = new a.View({
        model: item
      });
      rssItemViewm.render();
      return this.$el.append(rssItemViewm.el);
    },
    addAll: function() {
      return this.collection.forEach(this.addOne, this);
    },
    initialize: function() {
      this.collection.on("add", this.addOne, this);
      return this.collection.on("reset", this.addAll, this);
    }
  });
  a.Collection = Backbone.Collection.extend({
    url: "feeds.php",
    model: a.Model,
    parse: function(data) {
      return data;
    }
  });
  App = new (Backbone.Router.extend({
    initialize: function() {
      var container;
      this.rssCollection = new a.Collection;
      this.rssCollectionView = new a.CollectionView({
        collection: this.rssCollection
      });
      container = $("#container");
      this.rssCollectionView.render();
      return container.html(this.rssCollectionView.el);
    },
    start: function() {
      return Backbone.history.start({
        pushState: true
      });
    },
    routes: {
      "": "index"
    },
    index: function() {
      return this.rssCollection.fetch({
        data: {
          section: "blogs"
        }
      });
    }
  }));
  $(document).ready(function() {
    return App.start();
  });
}).call(this);
