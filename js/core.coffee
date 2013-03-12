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
		@navElements = $("#navigation").find("ul").find("li").find("a").not("a:eq(0)")
		@navElements.bind "click" , @navBehavior
	mainContainer: "#container"
	loaded: []
	navBehavior: (e) -> 		
		element = $(@)		
		section = element.attr("href").replace "#" , ""
		console.log "loading section "		
		console.log section
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
				html = @sectionTpl item , @sectionStrID
				$(@mainContainer).html html				
				$("#{currentSelector}").bind "click" , @toggleSection				
				initElements = $("##{@sectionStrID}").find("div.box")				
				initElements.bind "click" , @loadRssInit
	loadRssInit: (e) =>
		$(e.currentTarget).unbind "click" , @loadRssInit
		element = $(e.currentTarget)
		rssLink = element.find("a.readmore").attr("href")
		feedConf = 
			feeds:
				feed1: rssLink
			max: 5
			onComplete: (data)->
				console.log data
		element.feeds feedConf
		# here
		console.log rssLink
		console.log feedConf
	toggleSection: -> console.log "toggleSection"
	sectionTpl: (data,elementID)->
		data.id = elementID
		tpl = "
			<section id=\"<%= data.id %>\">
				<% _.each(data, function(rss) { %>
					<div class=\"box\">
						<article>
							<header>                            
								<h1>
									<a href=\"<%= rss.url %>\">
										<%= rss.title %>
									</a>
								</h1>
							</header>                        
							<div class=\"thumb\">
								<img src=\"<%= rss.logo %>\" alt=\"logo\"/>
							</div>
							<p>
								<%= rss.slogan %>
								<a href=\"<%= rss.urlFeed %>\" class=\"readmore\">Rss</a>
							</p>                        
							<span class=\"author\"> 
								Author: <strong> <%= rss.author %> </strong> | <time datetime=\"<%= rss.date %>\"><%= rss.date %></time>
							</span>
						</article>
					</div>
					<% }); %>
			</section>
		"
		_.template tpl, data: data
###
	DOM ready
###
$(document).ready ->
	richisCore.init()