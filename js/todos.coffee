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
#Collection
TodoList = Backbone.Collection.extend
	url: 'feeds.php'
	model: TodoModel
#Collection View
TodoListView = Backbone.View.extend
	initialize: ->
		@collection.on "add", @addItem, @
		@collection.on "reset", @addAll, @
	render: ->
		@addAll()
	addAll: ->
		@collection.forEach @addItem, @
	addItem: (item)->
		todoView = new TodoView
			model: item
		todoView.render()
		html = todoView.el
		@.$el.append html

# INIT 
todoList = new TodoList
todoListView = new TodoListView
	collection: todoList
todoListView.render()
# DOM READY
$(document).ready ->
	$("#container").html todoListView.el
	todoList.fetch()