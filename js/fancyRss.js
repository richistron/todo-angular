(function() {
  jQuery(function($) {
    var linkBehavior, presetFeed, widgetTmpl;
    $.loadRss = function(elementID) {
      var elements;
      elements = $("" + elementID + " div.rssItem");
      return $.each(elements, function(index, element) {
        var elementPreset, logo, url;
        elementID = $(element).attr('id');
        elementID = "#" + elementID;
        url = $(elementID).data('feedurl');
        logo = $(elementID).data('feedlogo');
        elementPreset = presetFeed(url, 3, logo);
        return $(elementID).feeds(elementPreset);
      });
    };
    presetFeed = function(url, max, logo) {
      var confObj;
      confObj = {
        feeds: {
          feed: url
        },
        max: max,
        loadingTemplate: '<div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div>',
        preprocess: function(feed) {},
        entryTemplate: function(entry) {},
        onComplete: function(entries) {
          return $(this).fadeOut('fast', function() {
            return $(this).html(widgetTmpl(entries, logo, this)).carruselPagination().fadeIn(2000);
          });
        }
      };
      return confObj;
    };
    $.fn.carruselPagination = function() {
      return $(this).each(function() {
        var id, parentID;
        id = $(this).attr('id');
        parentID = "#" + id;
        $("" + parentID + " .thumbnail-feed").hide();
        $("" + parentID + " .thumbnail-feed:eq(0)").show();
        $("" + parentID + " .pagination ul li:eq(0)").addClass('active');
        return $("" + parentID + " .pagination ul li a").click(linkBehavior);
      });
    };
    linkBehavior = function(e) {
      var allSelector, item, parent, selector;
      e.preventDefault();
      if ($(this).parent().hasClass('active')) {
        return;
      }
      parent = $(this).attr('href');
      item = $(this).text();
      item = parseInt(item) - 1;
      $("" + parent + " .pagination ul li").removeClass('active');
      $(this).parent().addClass('active');
      selector = "" + parent + " .thumbnail-feed:eq(" + item + ")";
      allSelector = "" + parent + " .thumbnail-feed";
      return $(parent).fadeOut('slow', function() {
        $(allSelector).hide();
        $(selector).show();
        return $(this).fadeIn('slow');
      });
    };
    widgetTmpl = function(entries, logo, element) {
      var conteiner, feeds, items, pages, pagination, parent;
      parent = $(element).attr('id');
      feeds = [];
      pages = [];
      $.each(entries, function(index, item) {
        var pag, tmpl;
        tmpl = "<div class=\"row-fluid thumbnail thumbnail-feed\">			<img src=\"" + logo + "\" data-src=\"holder.js/120x120\" class=\"pull-left\" alt=\"" + item.author + "\"/>			<h3>" + item.title + "</h3><p>" + item.contentSnippet + "</p>			</div>";
        index = index + 1;
        pag = "<li><a href=\"#" + parent + "\">" + index + "</a></li>";
        pages.push(pag);
        return feeds.push(tmpl);
      });
      items = feeds.join(' ');
      pages = pages.join(' ');
      pagination = "<div class=\"pagination pagination-large\"><ul>" + pages + "</ul></div>";
      conteiner = "<div class=\"row-fluid\">" + items + " " + pagination + "</div>";
      return conteiner;
    };
  });
}).call(this);
