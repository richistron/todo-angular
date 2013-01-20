###
	richisCore v0.1
	@Author @richistron
	@description coffeScript core
	@License MIT
###
# Model Class
ItemLiModel = Backbone.Model.extend	
	urlRoot: "/feeds.php?getRss=feeds"
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
# new Model
itemM = new ItemLiModel	
	id: "richistron"
	feedUrl: "http://blog.richistron.com/feeds/posts/default"
	feedTitle: "El blog del richistron"
	feedLogo: "/img/cats/120x120.jpg"
	feedDescription: "When programming in any language there are certain common errors that everyone makes as they mature and evolve their ..."
	feedLink: "http://blog.richistron.com/"
	feedAutor: "Ricardo Rivas"	
	feedData: {}
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
# new View
view = new ItemView
	model: itemM
# Render
view.render()
# conteiner selector
selector = "#sitios"
# DOM ready
$(document).ready ->
	$( selector ).html ->
		view.el