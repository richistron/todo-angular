###
	richisCore v1.0
	@Author @richistron
	@description coffeeScript core
	@License MIT
###
richisCore = 
	init: ->		
		@loadSections()
		$(document).on "click" , "a" , (e)-> e.preventDefault()
		$("footer").find("a").bind "click" , (e)-> 						
			link = $(@).attr "href"
			window.open link , "_blank"
		@navElements = $("#navigation").find("ul").find("li").find("a").not("a:eq(0)")
		$("#navigation").find("ul").find("li:eq(0)").addClass "active"
		@navElements.bind "click" , @navBehavior
	mainContainer: "#container"
	loaded: []
	navBehavior: (e) -> 		
		element = $(@)				
		element.closest("ul").find("li").removeClass "active"
		element.closest("li").addClass "active"
		section = element.attr("href").replace "#" , ""		
		element.unbind()					
		richisCore.loadSection section	, element	
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
		@loadSection section , element.selector	, true 	
	loadSection: ( @sectionStrID, selector, initReplace = false)-> 							
		currentSelector = selector
		$.each @response , (index,item) =>
			if @sectionStrID == index
				html = @sectionTpl item , @sectionStrID
				if initReplace == true
					$(@mainContainer).html html				
					$("#{currentSelector}").bind "click" , @toggleSection
				else
					$(@mainContainer).append html																	
					id = $(selector).attr "href"
					elements = $(@mainContainer).find "section" 					
					elements.hide()
					elements.filter(id).show()
					$(selector).bind "click" , @toggleSection
				initElements = $("##{@sectionStrID}").find("div.box")				
				initElements.bind "click" , @loadRssInit
	loadRssInit: (e) =>
		$(e.currentTarget).unbind "click" , @loadRssInit
		element = $(e.currentTarget)				
		rssLink = element.find("a.readmore").attr("href")
		feedConf = 
			feeds:
				feed1: rssLink
			max: 10
			onComplete: (data) ->				
				richisCore.parseEntries data , element
			loadingTemplate: richisCore.loadingTemplate
		element.feeds feedConf	
	loadingTemplate: "<img src=\"/img/loading.gif\" alt=\"loading...\" />"
	parseEntries: (data,element)-> 
		logo = $(element).data "logo"						
		$(element).html( @entrieTemplate data ,logo )
		articles = $(element).find("article")
		articles.css "opacity" , 1
		articles.not(":eq(0)").hide()		
		articles.on "click","a", (e)->
			link = $(@).attr "href"
			window.open link , "_blank"
		paginationA = $(element).find(".articlePagination").find("a")
		paginationA.filter(":eq(0)").addClass("active")
		paginationA.bind "click" , (e)=>
			@changeEntrie e
	changeEntrie: (e)->
		clicked = $(e.currentTarget).attr("href")
		clicked = clicked.replace "#" , ""
		box = $(e.currentTarget).closest ".box"				
		box.find("article").hide()
		box.find("article").filter(":eq(#{clicked})").show()
		paginationDiv = $(e.currentTarget).closest "div"
		paginationDiv.find("a.active").removeClass("active")
		$(e.currentTarget).addClass("active")
	toggleSection: -> 		
		liItems = $(@).closest("ul").find("li")
		liItems.removeClass "active"	
		$(@).closest("li").addClass "active"	
		id = $(@).attr "href"		
		container = $(id).closest "div"		
		sections = container.find "section"
		sections.hide()
		sections.filter(id).show()
	sectionTpl: (data,elementID)->
		data.id = elementID
		tpl = "
			<section id=\"<%= data.id %>\">
				<% _.each(data, function(rss) { %>
					<div class=\"box\" data-logo=\"<%= rss.logo %>\">
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
								Author: <strong> <%= rss.author %> </strong> 
							</span>
						</article>
					</div>
					<% }); %>
			</section>
		"
		_.template tpl, data: data
	entrieTemplate: (data,logo = "/img/cats/120x120.jpg")-> 		
		tpl = "
			<% _.each(data, function(rss) { %>
				<article>
					<header>                            
						<h1>
							<a href=\"<%= rss.link %>\">
								<%= rss.title %>
							</a>
						</h1>
					</header>                        
					<div class=\"thumb\">
						<img src=\"<%= logo %>\" alt=\"logo\"/>
					</div>
					<p>
						<%= rss.contentSnippet %>
						<a href=\"<%= rss.link %>\" class=\"readmore\">Leer más</a>
					</p>                        
					<span class=\"author\"> 
						Author: <strong> <%= rss.author %> </strong>
					</span>
				</article>
			<% }); %>
			<div class=\"articlePagination\">
				<% _.each(data,function(item,i){ %>
					<a href=\"#<%= i %>\"><%= i + 1 %></a>
				<% }); %>
			</div>
		"
		params = 
			data:data
			logo: logo
		_.template tpl , params
###
	DOM ready
###
$(document).ready ->
	richisCore.init()