
/*
	richisCore v1.0
	@Author @richistron
	@description coffeeScript core
	@License MIT
*/

(function() {
  var richisCore,
    _this = this;

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
      var _this = this;
      return $.ajax({
        url: "feeds.php",
        dataType: "JSON",
        type: "POST",
        data: {
          token: this.richistoken()
        }
      }).done(function(data) {
        return _this.initSections(data);
      });
    },
    initSections: function(response) {
      var element, section;
      this.response = response != null ? response : false;
      element = $("#navigation").find("ul").find("li").find("a:eq(0)");
      section = element.attr("href").replace("#", "");
      return this.loadSection(section, element.selector, true);
    },
    loadSection: function(sectionStrID, selector, initReplace) {
      var currentSelector,
        _this = this;
      this.sectionStrID = sectionStrID;
      if (initReplace == null) initReplace = false;
      currentSelector = selector;
      return $.each(this.response, function(index, item) {
        var elements, html, id, initElements;
        if (_this.sectionStrID === index) {
          html = _this.sectionTpl(item, _this.sectionStrID);
          if (initReplace === true) {
            $(_this.mainContainer).html(html);
            $("" + currentSelector).bind("click", _this.toggleSection);
          } else {
            $(_this.mainContainer).append(html);
            id = $(selector).attr("href");
            elements = $(_this.mainContainer).find("section");
            elements.hide();
            elements.filter(id).show();
            $(selector).bind("click", _this.toggleSection);
          }
          initElements = $("#" + _this.sectionStrID).find("div.box");
          return initElements.bind("click", _this.loadRssInit);
        }
      });
    },
    loadRssInit: function(e) {
      var element, feedConf, rssLink;
      $(e.currentTarget).unbind("click", _this.loadRssInit);
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
    },
    loadingTemplate: "<img src=\"/img/loading.gif\" alt=\"loading...\" />",
    parseEntries: function(data, element) {
      var articles, logo, paginationA,
        _this = this;
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
      return paginationA.bind("click", function(e) {
        return _this.changeEntrie(e);
      });
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
      if (logo == null) logo = "/img/cats/120x120.jpg";
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
