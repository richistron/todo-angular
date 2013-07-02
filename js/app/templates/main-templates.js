
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
    App.Templates = {};
    App.Templates.Woops = ":-/ something went wrong";
    App.Templates.boxItem = "		{{#items}}			<div data-modelId=\"{{id}}\" class=\"box\">Loading... <img src=\"/img/loading.gif\" alt=\"loading...\" />{{title}}</div>		{{/items}}	";
    App.Templates.entries = "	{{#entries}}		<article>			<header><h1><a href=\"{{link}}\">{{title}}</a></h1></header>			<div class=\"thumb\"><img src=\"{{model.logo}}\" alt=\"{{model.title}}\"></div>			<p>{{&contentSnippet}} <a href=\"{{link}}\" target=\"_blank\" class=\"readmore\">Leer m&aacute;s</a></p>			<span class=\"author\">Author: <strong>{{author}}</strong></span>		</article>	{{/entries}}	";
    App.Templates.pagination = "	<div class=\"articlePagination\">		{{#items}}			<a href=\"#\">{{index}}</a>		{{/items}}	</div>	";
    App.Templates.modalBox = "	<div class=\"modalBox\">	    <div class=\"modalcontainer\">	    	<a href=\"#\" class=\"close\">X</a>			<div class=\"modalEntrie\"></div>		</div>	</div>	";
    App.Templates.modalBoxEntriePub = "	<div class=\"pub300x250\">{{&Pub}}</div>				<div class=\"entrieEntrie\"></div>	";
    App.Templates.modalBoxEntrie = "					<h1 class=\"entrieTitle\">{{title}}</h1>	<p class=\"seeOriginal\"><a href=\"{{link}}\">Ver original en sitio</a></p>	<p> {{&content}} </p>	<p> Publicado {{publishedDate}} </p>		<p>Author {{feedAuthor}}</p>		";
    App.Templates.pub300250 = "	<span class=\"pubLabel\">Publicidad</span>	<!-- r300x250 -->	<div id='div-gpt-ad-1372719961964-0' style='width:300px; height:250px;'>	<script type='text/javascript'>	googletag.cmd.push(function() { googletag.display('div-gpt-ad-1372719961964-0'); });	</script>	</div>	";
    return window.App = App;
  })(window);

}).call(this);
