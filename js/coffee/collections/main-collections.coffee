
###
	Richistron frontend
	@richistron
	06/22/2013
	MIT License
###

( (window) ->
	# App
	App = window.App || {}

	App.Collections = App.Collections || {}

	App.Collections.responseC = Backbone.Collection.extend
		# localStorage: new Backbone.LocalStorage("app-richistron-storage")
		url: "feeds.php"
		sync: (method,model,options)->
			switch method	
				when "read"					
					unless options.url?
						options.url = @url
					Backbone.sync.call model, method, model, options
				else false
		parse: (@data)->
			items = []
			_.each @data , (item,index)->
				section = {}				
				section.name = index
				section.items = item
				items.push section			
			return items

	# App
	return window.App = App
)(window)

