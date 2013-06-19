###
	richisCore v1.0
	@Author @richistron
	@description coffeeScript and backbone core
	@License MIT
### 

APP = window.APP || {}

###
	document view
###
App = Backbone.View.extend	
	Routers: new ( 
			Backbone.Router.extend
				initialize: ->					
					@sectionCollection = new APP.Collections.sectionCollection
					@sectionCollectionView = new APP.Views.sectionCollectionView
						el: $("#container")
						collection: @sectionCollection
					@defaultSection = "blogs"
					@sectionCollection.fetch 
						success: => 
							section = window.location.hash							
							if section == ""	
								section = @defaultSection
							else
								section = section.replace("#","")									
							@sectionCollectionView.showSection section
				routes: 
					"(:idStr)" : "index"					
				index: (id = "blogs")-> 
					@sectionCollectionView.showSection id
		)
	events: 
		"click #navigation a": (e)->
			e.preventDefault()			
			Backbone.history.navigate e.target.hash , trigger:true
		"click footer a" : (e) ->
			e.preventDefault()
			link = e.currentTarget.href
			window.open link , "_blank"
	start: ->
		Backbone.history.start pushState:false

APP.loading = "<img src=\"/img/loading.gif\" alt=\"loading...\" />"

window.APP = APP

###
	new app
###
app = new App el: document.body
$(document).ready ->
	app.start()
