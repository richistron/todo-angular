###
	richisCore v1.0
	@Author @richistron
	@description coffeeScript and backbone core
	@License MIT
### 

sectionModel = Backbone.Model.extend({})

APP =
	Models: 
		"sectionModel": sectionModel
	Views: 
		"sectionView": Backbone.View.extend
			tagName: "section"
			render: ->			
				@.$el.attr "id"	, (@model.get "id")
				@.$el.html (@model.get "id")
		"sectionCollectionView": Backbone.View.extend 			
			addAll: ->
				@collection.forEach @addOne , @
			addOne: (element)->				
				sectionView = new APP.Views.sectionView
					model: element
				sectionView.render()
				@.$el.append sectionView.el			
			showSection: (section) ->
				@.$el.find("section").hide()
				@.$el.find("section##{section}").show()
			initialize: ->
				@.$el.html ""
				@collection.on "add", @addOne, @
				@collection.on "reset", @addAll, @
	Collections: 
		"sectionCollection": Backbone.Collection.extend
			url: "feeds.php"
			model: sectionModel
			parse: (@response)->
				arr = []
				_.each @response , (item,index)->
					section = "id" : index
					arr.push section
				arr
	loading: "<img src=\"/img/loading.gif\" alt=\"loading...\" />"
App = Backbone.View.extend		
	Routers: new ( 
			Backbone.Router.extend
				initialize: ->					
					@sectionCollection = new APP.Collections.sectionCollection
					@sectionCollectionView = new APP.Views.sectionCollectionView
						el: $("#container")
						collection: @sectionCollection
					@sectionCollection.fetch 
						success: => @sectionCollectionView.showSection "blogs"
				routes: 
					"(:idStr)" : "index"					
				index: (id = "blogs")-> 
					@sectionCollectionView.showSection id
		)
	events: 
		"click #navigation a": (e)->
			e.preventDefault()			
			Backbone.history.navigate e.target.hash , trigger:true
	start: ->
		Backbone.history.start pushState:false
app = new App el: document.body
# DOM READY
$(document).ready ->
	app.start()