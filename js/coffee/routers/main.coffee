###
	Richistron frontend
	@richistron
	06/22/2013
	MIT License
###
( (window) ->
	# window
	App = window.App || {}
	# router
	App.Router = Backbone.Router.extend
		routes: 
			"" : "index"
			"*url" : "routesHandler"
		initialize: ->
			@docV = new App.Views.docV
				el: document.body
			@responseC = new App.Collections.responseC
			@reponseV = new App.Views.mainResponseV
				el: $(@docV.$el).find("#container")
				collection: @responseC
		index: -> Backbone.history.navigate $(@docV.linkOne).attr("href"), trigger:true 
		routesHandler: (url)-> 			
			if url == "home"
				url = ($(@docV.linkOne).attr "href").replace "#",""
			@reponseV.goTo url			
	# App
	window.App = App
)(window)