###
	FeedModel

	RESTful and local storage feeds
	license MTI
	Author @richistron
###


define ['tools'], (Tools)->
	
	t = new Tools
	
	class FeedModel extends Backbone.Model
		constructor:()-> super
		defaults: 
			elID: 0
			title: ""
			slogan: ""
			url: ""
			urlFeed: ""
			author: ""
			logo: ""
	return FeedModel