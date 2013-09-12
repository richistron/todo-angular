'use strict';

angular.module('main').controller('FeedsCtrl',['$scope',function (sc) {

	// defaults
	if(sc.todos === undefined || sc.todos === null){
		sc.todosTotal = 1;
		sc.hideComplete = false;
		sc.todos = [
			{text: 'start with Angular',done:true},
			{text: 'learn Angular as a badass',done:false},
			{text: 'create todo app',done:false},
			{text: 'add local storage',done:false}
		];
	}

	// ShowHide
	sc.ShowHide = function(){
		if(sc.hideComplete === true){
			return "Show";
		}
		return "Hide";		
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
		if (sc.formTodoNew === undefined || sc.formTodoNew.trim() === ''){
			return false;
		}
		sc.todos.push({text: sc.formTodoNew.trim(),done:false});
		sc.formTodoNew = '';
	};

	// clearTodos action
	sc.clearTodos = function(){
		sc.todos = _.filter(sc.todos,function(todo){
			return !todo.done;
		});
	};

}]);
