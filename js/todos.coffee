###
	Todos practice from codeschool
###
# CLasses
#MODEL
TodoModel = Backbone.Model.extend
	defaults: 
		title: "todo item"
		content: "kajdlkasjdlkasj askdjalkjdla ksajdlkasjdaljd ..."
		clicks: 0
	clickPlusOne: ->
		click = @get 'clicks'
		click = parseInt(click) + 1
		@set 'clicks', click
		console.log @get('clicks')
#MODEL VIEW
TodoView = Backbone.View.extend
	template: _.template "
	<h1><%= title %></h1>
	<p><%= content %></p>
	Clicks: <%= clicks %>
	"
	render: -> 		
		str = @template @model.toJSON()
		@.$el.html str
	events: 
		"click" : "clickPlusOne"
	clickPlusOne: ->
		@model.clickPlusOne()
	initialize: ->
		@model.on "change", @render, @
todos = [
	{
		id: 1
		title: "todo item"
		content: "kajdlkasjdlkasj askdjalkjdla ksajdlkasjdaljd ..."
		clicks: 0
	},
	{	
		id: 2
		title: "todo item 2"
		content: "kajdlkasjdlkasj askdjalkjdla ksajdlkasjdaljd ..."
		clicks: 0
	}	
]

todo1 = new TodoModel
view1 = new TodoView
	model: todo1
view1.render()
# DOM READY
$(document).ready ->
	$("#container").html view1.el