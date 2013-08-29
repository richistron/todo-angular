
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
			url = url.split "/"			
			if url.length >= 2
				@reponseV.url = url
				@reponseV.goTo(url[0])				
			else				
				if url[0] == "home"
					url[0] = ($(@docV.linkOne).attr "href").replace "#",""
				if @reponseV.url? 
					delete @reponseV.url
				@reponseV.goTo url[0]
	# App
	window.App = App
)(window)

