'use strict';

var _app = angular.module('main');

_app.controller('TodosCtrl',['$scope','Todos', 'Todo', function (sc,Todos,Todo) {

	// jshint prevent errors
	var _ = _ || window._;
	var confirm = confirm;

	// ShowHide
	sc.ShowHide = function(){
		if(sc.hideComplete === true){
			return 'Show';
		}
		return 'Hide';
	};

	// done action
	sc.toggleDone = function(todo){
		if (todo.done === true) {
			todo.done = false;
		}else{
			todo.done = true;
		}
	};

	// addTodo action
	sc.addTodo = function(){

		if (sc.getNewTodoTitle.length === 0) return;

		sc.todos.push(new Todo({
			title: sc.getNewTodoTitle.trim(),
			text: sc.getNewTodoText.trim()
		}));

		return sc.clearTodosForm();

	};

	// clearTodos action
	sc.clearTodos = function(){
		if (confirm('Are you sure?')){
			sc.todos = _.filter(sc.todos,function(todo){
				return !todo.done;
			});
		}
	};

	sc.clearTodosForm = function(){
		sc.getNewTodoTitle = '';
		sc.getNewTodoText = '';
	};

	sc.getTodosTotal = function(){
		if(sc.hideComplete === true){
			var items = [];
			items = _.filter(sc.todos,function(todo){
				return !todo.done;
			});
			return items.length;
		}
		return sc.todos.length;
	};

	// defaults
	(function(sc){
		if(sc.todos === undefined || sc.todos === null){
			sc.todosTotal = 1;
			sc.hideComplete = false;
			sc.todos = Todos.todos;
		}
		sc.clearTodosForm();
	})(sc);

}]);
