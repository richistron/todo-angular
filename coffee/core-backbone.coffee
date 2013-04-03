###
	richisCore v1.0
	@Author @richistron
	@description coffeeScript and backbone core
	@License MIT
###
a = {}
a.Model = Backbone.Model.extend({})
a.View = Backbone.View.extend
	className: "box"
	template: "			
	<article data-logo=\"{{logo}}\">
		<header>                            
			<h1>
				<a href=\"{{url}}\">					
					{{title}}
				</a>
			</h1>
		</header>                        
		<div class=\"thumb\">
			<img src=\"{{logo}}\" alt=\"logo\"/>
		</div>
		<p>
			{{slogan}}
			<a href=\"{{urlFeed}}\" class=\"readmore\">Rss</a>
		</p>                        
		<span class=\"author\"> 
			Author: <strong> {{author}} </strong> 
		</span>
	</article>
	"
	render: ->				
		tpl = Mustache.compile @template		
		@.$el.html tpl(@model.toJSON())
a.CollectionView = Backbone.View.extend	
	render: ->		
		@.$el.attr "id", "blogs"
		html = @addAll()
		@.$el.html html		
	tagName: "section"
	addOne: (item)->		
		rssItemViewm = new a.View
			model: item
		rssItemViewm.render()
		@.$el.append rssItemViewm.el
	addAll: ->
		@collection.forEach @addOne, @	
	initialize: ->
		@collection.on "add", @addOne, @
		@collection.on "reset", @addAll, @
a.Collection = Backbone.Collection.extend
	url: "feeds.php"	
	model: a.Model
	parse: (data) ->
		data		
# App router	
App = new ( Backbone.Router.extend 
		initialize: ->
			@rssCollection = new a.Collection
			@rssCollectionView = new a.CollectionView
				collection: @rssCollection
			container = $("#container")
			@rssCollectionView.render()
			container.html @rssCollectionView.el
		start: -> Backbone.history.start pushState: true
		routes:
			"":"index"
		index: ->			
			@rssCollection.fetch 
				data:
					section: "blogs"
	)
#window.App = App
# DOM READY
$(document).ready ->
	App.start()