
deps = [
	"backbone",
	"mustache",
	"tools"
	"models/feed",
	"routes/feed",
	"views/feed",
	"collections/feeds",
	"templates/feeds",
]

define deps , (Backbone,Mustache,Tools,FeedModel,FeedRouter,FeedView,FeedsCollection,FeedTemplates) ->
	
	# console.log FeedRouter 

	class App extends Tools		
		constructor: (@router = new FeedRouter) ->
		models: 
			Feed: FeedModel
		views: 
			Feed: FeedView
		collections: 
			Feed: FeedsCollection
		templates: FeedTemplates
		router: null
		start: -> Backbone.history.start pushState:true 		

	# return new App	
	app = new App