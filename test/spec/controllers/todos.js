'use strict';

describe('Controller: TodosCtrl', function () {
	// load the controller's module
	beforeEach(module('main'));
	var 
	// controller
	TodosCtrl,
	// scope
	scope,
	// new defaults
	newTitle = 'Test one',
	newDescription = 'tested with jasmine, grunt-karma',
	// common functions
	addTodos = function(len){		
		var 
		_newTitle = newTitle,
		_newDescription = newDescription,
		_scope = scope,
		i;
		// initial length should be 0
		expect(_scope.todos.length).toBe(0);		
		if ( len === undefined || len === null || typeof len !== 'number' )
			len = 1;
		for(i=0;i<len;i++){
			_scope.formTodoNewTitle = _newTitle + ':' + i;
			_scope.formTodoNewDescription = _newDescription + ':' + i;
			_scope.addTodo();
			if(_scope.todos[i].$$hashKey === undefined || _scope.todos[i].$$hashKey === null ) 
				_scope.todos[i].$$hashKey = 30 + i;
			expect(_scope.todos.length).toBe( i + 1);
			expect(_scope.todos[i].title).toBe(newTitle + ':' + i);
			expect(_scope.todos[i].description).toBe(newDescription + ':' + i);
			expect(_scope.todos[i].done).toBe(false);
		}
		// return _scope;
	};
	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		TodosCtrl = $controller('TodosCtrl', {
			$scope: scope
		});
	}));
	// check if scope is empty
	it('0 todos', function () {
		expect(scope.todos.length).toBe(0);
		addTodos();
		expect(scope.todos.length).toBe(1);
	});
	// $scope.addTodo
	it('addTodo', function () {
		addTodos(5);
		expect(scope.todos.length).toBe(5);
	});
	// $scope.clearForm
	it('clearForm',function(){
		scope.formTodoNewTitle = 'not empty';
		scope.formTodoNewDescription = 'not empty';
		scope.clearForm();
		expect(scope.formTodoNewTitle).toBe('');
		expect(scope.formTodoNewDescription).toBe('');
	});		
	// $scope.editTodo
	it('edit todo' , function(){
		addTodos();
		expect(scope.todos.length).toBe(1);
		expect(scope.todos[0].title).toBe(newTitle + ':' + 0);
		expect(scope.todos[0].description).toBe(newDescription + ':' + 0);
		expect(scope.todos[0].done).toBe(false);
		scope.editTodo(scope.todos[0],{
			title: 'updated',
			description: 'yep',
			done: true
		});
		expect(scope.todos[0].title).toBe('updated');
		expect(scope.todos[0].description).toBe('yep');
		expect(scope.todos[0].done).toBe(true);
	});
	// $scope.deleteComplete
	it('deleteComplete', function(){
		var 
			_total = 15,
			_totalDone = 5,
			_uncomplete = _total - _totalDone,
			i;
		scope.todos = [];
		//
		addTodos(_total);		
		expect(scope.todos.length).toBe(_total);
		for(i = 0; i < _totalDone; i++){
			scope.editTodo(scope.todos[i], { done:true });
		}
		expect(scope.todos.length).toBe(_total);
		scope.deleteComplete();
		expect(scope.todos.length).not.toBe(_total);
		expect(scope.todos.length).toBe(_uncomplete);
	});
});