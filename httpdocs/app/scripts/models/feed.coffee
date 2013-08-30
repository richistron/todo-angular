###
	FeedModel

	RESTful and local storage feeds
	license MTI
	Author @richistron
###
class FeedModel extends Backbone.Model
	constructor:()->		
		@prom: $.Deferred()
		@preload().done =>
			console.log "done"
			super
	preload: ->
		@prom.resolve()
		@prom()
	defaults: 
		elID: 0
		title: ""
		slogan: ""
		url: ""
		urlFeed: ""
		author: ""
		logo: ""

# tests
feedModel = new FeedModel
console.log feedModel