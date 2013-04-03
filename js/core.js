(function() {
  /*
  	richisCore v1.0
  	@Author @richistron
  	@description coffeeScript core
  	@License MIT
  */  var richisCore;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  richisCore = {
    init: function() {
      this.loadSections();
      $(document).on("click", "a", function(e) {
        return e.preventDefault();
      });
      $("footer").find("a").bind("click", function(e) {
        var link;
        link = $(this).attr("href");
        return window.open(link, "_blank");
      });
      this.navElements = $("#navigation").find("ul").find("li").find("a").not("a:eq(0)");
      $("#navigation").find("ul").find("li:eq(0)").addClass("active");
      return this.navElements.bind("click", this.navBehavior);
    },
    mainContainer: "#container",
    loaded: [],
    navBehavior: function(e) {
      var element, section;
      element = $(this);
      element.closest("ul").find("li").removeClass("active");
      element.closest("li").addClass("active");
      section = element.attr("href").replace("#", "");
      element.unbind();
      return richisCore.loadSection(section, element);
    },
    richistoken: function() {
      return Math.random().toString(36).substr(2);
    },
    loadSections: function() {
      return $.ajax({
        url: "feeds.php",
        dataType: "JSON",
        type: "POST",
        data: {
          token: this.richistoken()
        }
      }).done(__bind(function(data) {
        return this.initSections(data);
      }, this));
    },
    initSections: function(response) {
      var element, section;
      this.response = response != null ? response : false;
      element = $("#navigation").find("ul").find("li").find("a:eq(0)");
      section = element.attr("href").replace("#", "");
      return this.loadSection(section, element.selector, true);
    },
    loadSection: function(sectionStrID, selector, initReplace) {
      var currentSelector;
      this.sectionStrID = sectionStrID;
      if (initReplace == null) {
        initReplace = false;
      }
      currentSelector = selector;
      return $.each(this.response, __bind(function(index, item) {
        var elements, html, id, initElements;
        if (this.sectionStrID === index) {
          html = this.sectionTpl(item, this.sectionStrID);
          if (initReplace === true) {
            $(this.mainContainer).html(html);
            $("" + currentSelector).bind("click", this.toggleSection);
          } else {
            $(this.mainContainer).append(html);
            id = $(selector).attr("href");
            elements = $(this.mainContainer).find("section");
            elements.hide();
            elements.filter(id).show();
            $(selector).bind("click", this.toggleSection);
          }
          initElements = $("#" + this.sectionStrID).find("div.box");
          return initElements.bind("click", this.loadRssInit);
        }
      }, this));
    },
    loadRssInit: __bind(function(e) {
      var element, feedConf, rssLink;
      $(e.currentTarget).unbind("click", this.loadRssInit);
      element = $(e.currentTarget);
      rssLink = element.find("a.readmore").attr("href");
      feedConf = {
        feeds: {
          feed1: rssLink
        },
        max: 10,
        onComplete: function(data) {
          return richisCore.parseEntries(data, element);
        },
        loadingTemplate: richisCore.loadingTemplate
      };
      return element.feeds(feedConf);
    }, this),
    loadingTemplate: "<img src=\"/img/loading.gif\" alt=\"loading...\" />",
    parseEntries: function(data, element) {
      var articles, logo, paginationA;
      logo = $(element).data("logo");
      $(element).html(this.entrieTemplate(data, logo));
      articles = $(element).find("article");
      articles.css("opacity", 1);
      articles.not(":eq(0)").hide();
      articles.on("click", "a", function(e) {
        var link;
        link = $(this).attr("href");
        return window.open(link, "_blank");
      });
      paginationA = $(element).find(".articlePagination").find("a");
      paginationA.filter(":eq(0)").addClass("active");
      return paginationA.bind("click", __bind(function(e) {
        return this.changeEntrie(e);
      }, this));
    },
    changeEntrie: function(e) {
      var box, clicked, paginationDiv;
      clicked = $(e.currentTarget).attr("href");
      clicked = clicked.replace("#", "");
      box = $(e.currentTarget).closest(".box");
      box.find("article").hide();
      box.find("article").filter(":eq(" + clicked + ")").show();
      paginationDiv = $(e.currentTarget).closest("div");
      paginationDiv.find("a.active").removeClass("active");
      return $(e.currentTarget).addClass("active");
    },
    toggleSection: function() {
      var container, id, liItems, sections;
      liItems = $(this).closest("ul").find("li");
      liItems.removeClass("active");
      $(this).closest("li").addClass("active");
      id = $(this).attr("href");
      container = $(id).closest("div");
      sections = container.find("section");
      sections.hide();
      return sections.filter(id).show();
    },
    sectionTpl: function(data, elementID) {
      var tpl;
      data.id = elementID;
      tpl = "			<section id=\"<%= data.id %>\">				<% _.each(data, function(rss) { %>					<div class=\"box\" data-logo=\"<%= rss.logo %>\">						<article>							<header>                            								<h1>									<a href=\"<%= rss.url %>\">										<%= rss.title %>									</a>								</h1>							</header>                        							<div class=\"thumb\">								<img src=\"<%= rss.logo %>\" alt=\"logo\"/>							</div>							<p>								<%= rss.slogan %>								<a href=\"<%= rss.urlFeed %>\" class=\"readmore\">Rss</a>							</p>                        							<span class=\"author\"> 								Author: <strong> <%= rss.author %> </strong> 							</span>						</article>					</div>					<% }); %>			</section>		";
      return _.template(tpl, {
        data: data
      });
    },
    entrieTemplate: function(data, logo) {
      var params, tpl;
      if (logo == null) {
        logo = "/img/cats/120x120.jpg";
      }
      tpl = "			<% _.each(data, function(rss) { %>				<article>					<header>                            						<h1>							<a href=\"<%= rss.link %>\">								<%= rss.title %>							</a>						</h1>					</header>                        					<div class=\"thumb\">						<img src=\"<%= logo %>\" alt=\"logo\"/>					</div>					<p>						<%= rss.contentSnippet %>						<a href=\"<%= rss.link %>\" class=\"readmore\">Leer más</a>					</p>                        					<span class=\"author\"> 						Author: <strong> <%= rss.author %> </strong>					</span>				</article>			<% }); %>			<div class=\"articlePagination\">				<% _.each(data,function(item,i){ %>					<a href=\"#<%= i %>\"><%= i + 1 %></a>				<% }); %>			</div>		";
      params = {
        data: data,
        logo: logo
      };
      return _.template(tpl, params);
    }
  };
  /*
  	DOM ready
  */
  $(document).ready(function() {
    return richisCore.init();
  });
}).call(this);
