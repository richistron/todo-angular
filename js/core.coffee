###
	richisCore v0.1
	@Author @richistron
	@description coffeScript core
	@License MIT
###
richisCore = 
	init: ->		
		@loadSections()
		$(document).on "click" , "a" , (e)-> e.preventDefault()
		@navElements = $("#navigation").find("ul").find("li").find("a").not "a:eq(0)"
		@navElements.bind "click" , @navBehavior
	mainContainer: "#container"
	loaded: []
	navBehavior: (e) -> 		
		element = $(@)
		console.log "loading section #{element}"
		section = element.attr("href").replace "#" , ""
		element.unbind()			
		richisCore.loadSection section		
	richistoken: -> Math.random().toString(36).substr(2)
	loadSections: ->					
		$.ajax(
			url: "feeds.php"
			dataType: "JSON"
			type: "POST"
			data: 
				token: @richistoken()
		).done (data) =>			
			@initSections data
	initSections: (@response = false)-> 								
		element = $("#navigation").find("ul").find("li").find("a:eq(0)")
		section = element.attr("href").replace "#" , ""
		@loadSection section , element.selector		
	loadSection: (@sectionStrID,selector)-> 					
		currentSelector = selector
		$.each @response , (index,item) =>
			if @sectionStrID == index
				html = @sectionTpl item
				$(@mainContainer).html html
				$("#{currentSelector}").bind "click" , @toggleSection
	toggleSection: -> console.log "toggleSection"
	sectionTpl: (data)->
		tpl = "
			<section>
				<% _.each(data, function(rss) { %>
					<div class=\"box\">
						<article>
							<header>                            
								<h1>
									<a href=\"#\">
										<%= rss.title %>
									</a>
								</h1>
							</header>                        
							<div class=\"thumb\">
								<img src=\"/img/cats/120x120.jpg\" alt=\"logo\"/>
							</div>
							<p>
								When programming in any language there are certain common errors that everyone makes as they mature and evolve their ...
								<a href=\"#\" class=\"readmore\">Leer más</a>
							</p>                        
							<span class=\"author\"> 
								Author: <strong> Fulanito </strong> | <time datetime=\"2011-01-26\">Monday, January 26,2011</time>
							</span>
						</article>
					</div>
					<% }); %>
			<section>
		"
		_.template tpl, data: data
###
	DOM ready
###
$(document).ready ->
	richisCore.init()