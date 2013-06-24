
###
	Richistron frontend
	@richistron
	06/22/2013
	MIT License
###

( (window) ->
	# App
	App = window.App || {}
	
	App.Models = {}

	App.Models.blogItem = Backbone.Model.extend
		initialize: -> 
		sync: (method,model,options)-> Backbone.sync.call model, method, model, options

	# App
	window.App = App
)(window)
