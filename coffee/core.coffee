###
	richisCore v0.1
	@Author @richistron
	@description coffeScript core
	@License MIT
###
# Model Class
ItemLiModel = Backbone.Model.extend	
	urlRoot: "/feeds.php?getRss=feeds"
# new Model
itemM = new ItemLiModel	
	id: "richistron"
	feedUrl: "http://blog.richistron.com/feeds/posts/default"
	feedTitle: "El blog del richistron"
	feedLogo: "/img/cats/120x120.jpg"
	feedDescription: "When programming in any language there are certain common errors that everyone makes as they mature and evolve their ..."
	feedLink: "http://blog.richistron.com/"
	feedAutor: "Ricardo Rivas"
# View Class
ItemView = Backbone.View.extend
	tagName: "article"
	render: ->
		data = @.model.toJSON()
		@.$el.html ( @.template data )
	template: _.template "
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
		"
# new View
view = new ItemView
	model: itemM
# Render
view.render()
# DOM ready
$(document).ready ->
	$("#sitios .box").html ->
		view.el