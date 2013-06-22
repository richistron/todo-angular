###
	Collections
###

APP = window.APP || {}

APP.Collections = APP.Collections || {}

APP.Collections =
	"blogCollection": Backbone.Collection.extend
		model: APP.Models.blogsModel
		url: "feeds.php"
		parse: (@response) ->
			@response
	"sectionCollection": Backbone.Collection.extend
		url: "feeds.php"
		model: APP.Models.sectionModel
		parse: (@response)->
			arr = []
			_.each @response , (item,index)->
				section = "id" : index
				arr.push section
			arr

window.APP = APP