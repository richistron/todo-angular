###
	richisCore v0.1
	@Author @richistron
	@description coffeScript core
	@License MIT
###
richisCore = 
	init: ->		
		# loading data from the server
		@loadSections()
		# prevent default all document
		$(document).on "click" , "a" , (e)-> e.preventDefault()
		# main navegation
		@navElements = $("#navigation")
		@navElements.bind "click" , @navBehavior
	navBehavior: (e) -> 
		console.log @
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
		console.log @response							
###
<div id="container">
<section>
<div class="box">
<article>
<header>                            
<h1>
<a href="#">
10 PHP code quality tools to avoid a mess in your projects
</a>
</h1>
</header>                        
<div class="thumb">
<img src="/img/cats/120x120.jpg" alt="logo"/>
</div>
<p>
When programming in any language there are certain common errors that everyone makes as they mature and evolve their ...
<a href="#" class="readmore">Leer más</a>
</p>                        
<span class="author"> Author: <strong> Fulanito </strong> | <time datetime="2011-01-26">Monday, January 26,2011</time></span>
</article>
</div>
###
###
	DOM ready
###
$(document).ready ->
	richisCore.init()