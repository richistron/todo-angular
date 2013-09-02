'use strict';

angular.module('main').controller('FeedsCtrl',function ($scope,$http) {
	// defaults
	if($scope.todos === undefined || $scope.todos === null){
		$scope.todosTotal = 1;
		$scope.todos = [
		{text: 'start withi Angular',done:true},
		{text: 'Learn Angular as a badass',done:false},
		{text: 'Create todo app',done:false},
		{text: 'Add local storage',done:false},
		];		
	}
	// done action
	$scope.toggleDone = function(todo){		
		if (todo.done === true) {
			todo.done = false;
		}else{
			todo.done = true;
		}
	};
	// addTodo action
	$scope.addTodo = function(){		
		if ($scope.formTodoNew === undefined || $scope.formTodoNew.trim() === ""){
			return false;
		}		
		$scope.todos.push({text: $scope.formTodoNew.trim(),done:false});	
		$scope.formTodoNew = '';
	};
	// clearTodos action
	$scope.clearTodos = function(){
		$scope.todos = _.filter($scope.todos,function(todo){
			return !todo.done;
		});
	};
});
