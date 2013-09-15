'use strict';

angular.module('main').controller('FeedsCtrl',['$scope',function (sc) {

	var _ = _ || window._;
	var confirm = confirm;

	// defaults
	(function(sc){
		if(sc.todos === undefined || sc.todos === null){
			sc.todosTotal = 1;
			sc.hideComplete = false;
			sc.todos = [
				{
					title: 'start with Angular todo',
					text: 'start with Angular description',
					done:true
				},
				{
					title: 'learn Angular as a badass todo',
					text: 'learn Angular as a badass description',
					done:false
				},
				{
					title: 'create todo app todo',
					text: 'create todo app description',
					done:false
				},
				{
					title: 'add local storage todo',
					text: 'add local storage description',
					done:false
				}
			];
		}
	})(sc);

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
		if (sc.getNewTodoTitle === undefined || sc.getNewTodoTitle.trim() === ''){
			return false;
		}
		if (sc.getNewTodoText === undefined || sc.getNewTodoText.trim() === ''){
			sc.getNewTodoText = 'no description given';
		}

		sc.todos.push({
			title: sc.getNewTodoTitle.trim(),
			text: sc.getNewTodoText.trim(),
			done:false
		});

		sc.clearTodosForm();

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

}]);
