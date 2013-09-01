
define ["tools"],(Tools)->	
	t = new Tools
	class FeedRouter extends Backbone.Router				
		constructor: -> super
		routes: 
			"" : "index"
		index: -> 
			# Backbone.history.navigate "home"
	return FeedRouter