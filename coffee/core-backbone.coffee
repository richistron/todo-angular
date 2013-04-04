###
	richisCore v1.0
	@Author @richistron
	@description coffeeScript and backbone core
	@License MIT
### 

sectionModel = Backbone.Model.extend({})
blogsModel = Backbone.Model.extend({})
APP =
	Models: 
		"blogsModel" : blogsModel
		"sectionModel": sectionModel
	Views: 
		"blogView": Backbone.View.extend			
			events:
				"click a" : (e)->
					e.preventDefault()
					console.log e
			tagName: "div"
			className: "box"
			render:->
				html_ = Mustache.compile @template
				html = html_ @model.toJSON()
				@.$el.append html
			template: "
				<article>
					<header>
						<h1>
							<a href=\"{{urlFeed}}\">
								{{title}}
							</a>
						</h1>
					</header>
					<div class=\"thumb\">
					<img src=\"{{logo}}\" alt=\"{{title}}\">
					</div>
					<p>
						{{slogan}}
						<a href=\"{{urlFeed}}\" class=\"readmore\">
							Rss
						</a>
					</p>
					<span class=\"author\">
						Author: <strong>{{author}}</strong>
					</span>
				</article>
			"
		"blogViewCollections": Backbone.View.extend	
			tagName: "p"
			initialize: ->				
				@collection.on "add", @addOne, @
				@collection.on "reset", @addAll, @		
			addAll: ->
				@collection.forEach @addOne , @
			addOne: (element)->
				blogView = new APP.Views.blogView
					model: element
				blogView.render()
				@.$el.append blogView.el
		"sectionView": Backbone.View.extend
			tagName: "section"
			render: ->	
				section = @model.get "id"
				@blogCollection_ = new APP.Collections.blogCollection
				@blogViewCollections_ = new APP.Views.blogViewCollections		
					collection: @blogCollection_
				@blogCollection_.fetch 
					data:
						"section": section					
				@blogViewCollections_.render()				
				@.$el.attr "id"	, (@model.get "id")
				@.$el.html @blogViewCollections_.el
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
		"blogCollection": Backbone.Collection.extend
			model: blogsModel
			url: "feeds.php"
			parse: (@response) ->
				@response
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
					@defaultSection = "blogs"
					@sectionCollection.fetch 
						success: => 
							section = window.location.hash							
							if section == ""	
								section = @defaultSection
							else
								section = section.replace("#","")									
							@sectionCollectionView.showSection section
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