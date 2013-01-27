###
	richisCore v0.1
	@Author @richistron
	@description coffeScript core
	@License MIT
###
# Model Class
ItemLiModel = Backbone.Model.extend	
	urlRoot: "/feeds"
	# load feed data
	getData: (e)->		
		e.preventDefault()		
		conf = this.feedConf(@)		
		view.$el.feeds conf
	# feed loading conf
	feedConf: (element)->
		element = element		
		console.log element
		feeds:
			"feedUrl": element.get "feedUrl"
		onComplete: (data)->							
			element.set "feedData" , data	
			console.log ( element.get "feedData" )
# View Class
ItemView = Backbone.View.extend
	tagName: "div"
	className: "box"
	initialize: ->
		@.model.on "change", @.render, @
	events: 
		"click a": "getData"
	#get feed data
	getData: _.once (e)->
		e.preventDefault()
		console.log @.model				
		@.model.getData(e)
	# Render function
	render: ->
		data = @.model.toJSON()
		@.$el.html ( @.template data )
	template: _.template "
			<article>
				<header>                            
					<h1>
						<a href='#<%= id %>'>
							<%= feedTitle %>
						</a>
					</h1>
				<div class='thumb'>
					<img src='<%= feedLogo %>' alt='<%= id %>_logo'/>
				</div>
				<p>
					<%= feedDescription %>
					<a href='<%= feedLink %>' class='readmore'>Leer más</a>				
				</p>     
				<span class='author'> Author: <strong> <%= feedAutor %> </strong></span>                   			
			</article>
		"
# Collection
ItemCollection = Backbone.Collection.extend({})
itemCollection = new ItemCollection
	model: ItemLiModel
feedData = [
	{
		id: "richistron"
		feedUrl: "http://blog.richistron.com/feeds/posts/default"
		feedTitle: "El blog del richistron"
		feedLogo: "/img/cats/120x120.jpg"
		feedDescription: "When programming in any language there are certain common errors that everyone makes as they mature and evolve their ..."
		feedLink: "http://blog.richistron.com/"
		feedAutor: "Ricardo Rivas"	
		feedData: {}
	}
	{
		id: "asasdadasdas"
		feedUrl: "http://blog.richistron.com/feeds/posts/default"
		feedTitle: "kljaslkdjalskdjalsdjlk"
		feedLogo: "/img/cats/120x120.jpg"
		feedDescription: "When programming in any language there are certain common errors that everyone makes as they mature and evolve their ..."
		feedLink: "http://blog.richistron.com/"
		feedAutor: "Ricardo Rivas"	
		feedData: {}
	}
]	
itemCollection.reset(feedData)
# collection class
ColletionView = Backbone.View.extend
	render: ->
		@.collection.forEach @.renderItem, @
	renderItem: (element) ->
		itemView_ = new ItemView
			model: element
		itemView_.render()
		@.$el.append itemView_.el
# colection view
colletionView = new ColletionView
	collection: itemCollection
colletionView.render()
# conteiner selector
selector = "#sitios"
# DOM ready
$(document).ready ->
	$( selector ).html ->
		colletionView.el