'use strict';

var _app = angular.module('main');

_app.controller('TodosCtrl', ['$scope', 'TodosStorage', 'Todo', 'underscore', function ( $scope, todosStorage, Todo, _ ) {

	$scope.todos = todosStorage.get();
	$scope.formTodoNewTitle = '';
	$scope.formTodoNewDescription = '';
	$scope.hideComplete = false;
	$scope.availableTodos = 0;

	$scope.clearForm = function(){
		$scope.formTodoNewTitle = '';
		$scope.formTodoNewDescription = '';
	};

	$scope.$watch('todos',function(newVal,oldVal){
		if(newVal !== oldVal){
			todosStorage.put($scope.todos);
		}
	},true);

	$scope.addTodo = function(){
		$scope.todos.push(new Todo({
			title: $scope.formTodoNewTitle,
			description: $scope.formTodoNewDescription,
		}));
		$scope.clearForm();
	};

	$scope.editTodo = function(current,fields){
		var _new = _.extend(current,fields);
		var _todos = _.filter($scope.todos,function(_item){
			if(_item.$$hashKey === _new.$$hashKey) {
				_item = _new.$$hashKey;
			}
			return _item;
		});
		$scope.todos = _todos;
		todosStorage.put($scope.todos);
		$scope.$digest();
	};

	$scope.deleteComplete = function(){
		var _todos = _.filter($scope.todos, function(_item){
			if(_item.done !== true){
				return _item;
			}
		});
		$scope.todos = _todos;
		todosStorage.put($scope.todos);
	};

	$scope.getTodosTotal = function(){
		if($scope.hideComplete !== true){
			return $scope.todos.length;
		}else{
			return (_.filter($scope.todos,function(todo){
							return !todo.done;
						})).length;
		}
	};

}]);
