(function() {
  /*
  	Todos practice from codeschool
  */  var App, TodoList, TodoListView, TodoModel, TodoView;
  TodoModel = Backbone.Model.extend({
    defaults: {
      title: "todo item",
      content: "kajdlkasjdlkasj askdjalkjdla ksajdlkasjdaljd ...",
      clicks: 0
    },
    clickPlusOne: function() {
      var click;
      click = this.get('clicks');
      click = parseInt(click) + 1;
      this.set('clicks', click);
      return App.navigate("todos/" + (this.get('id')), {
        trigger: true
      });
    }
  });
  TodoView = Backbone.View.extend({
    template: _.template("	<h1><%= title %></h1>	<p><%= content %></p>	Clicks: <%= clicks %>	"),
    render: function() {
      var str;
      str = this.template(this.model.toJSON());
      return this.$el.html(str);
    },
    events: {
      "click": "clickPlusOne"
    },
    clickPlusOne: function() {
      return this.model.clickPlusOne();
    },
    initialize: function() {
      return this.model.on("change", this.render, this);
    }
  });
  TodoList = Backbone.Collection.extend({
    url: 'feeds.php',
    model: TodoModel,
    showOne: function(id) {
      alert("aslkjasdlkjasd " + id);
      return console.log(this);
    }
  });
  TodoListView = Backbone.View.extend({
    initialize: function() {
      this.collection.on("add", this.addItem, this);
      return this.collection.on("reset", this.addAll, this);
    },
    render: function() {
      return this.addAll();
    },
    addAll: function() {
      return this.collection.forEach(this.addItem, this);
    },
    addItem: function(item) {
      var html, todoView;
      todoView = new TodoView({
        model: item
      });
      todoView.render();
      html = todoView.el;
      return this.$el.append(html);
    }
  });
  App = new (Backbone.Router.extend({
    routes: {
      "": "index",
      "todos/:id": "show"
    },
    initialize: function() {
      this.todoList = new TodoList;
      this.todoListView = new TodoListView({
        collection: this.todoList
      });
      return $("#container").html(this.todoListView.el);
    },
    start: function() {
      return Backbone.history.start({
        pushState: true
      });
    },
    show: function(id) {
      return this.todoList.showOne(id);
    },
    index: function() {
      return this.todoList.fetch();
    }
  }));
  $(document).ready(function() {
    return App.start();
  });
}).call(this);
