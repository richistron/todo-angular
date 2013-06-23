###
	Richistron frontend
	@richistron
	06/22/2013
	MIT License
###
( (window) ->
	# App
	App = window.App || {}
	# App.start
	App.start = (->
			App.bundle = new App.Router
			Backbone.history.start pushState:false
		)()
)(window)