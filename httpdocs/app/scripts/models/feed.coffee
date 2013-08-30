###
	FeedModel

	RESTful and local storage feeds
	license MTI
	Author @richistron
###

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

console.log FeedModel