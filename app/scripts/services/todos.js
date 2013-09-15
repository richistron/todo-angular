'use strict';

var _app = angular.module('main');

_app.service('Todos', ['Todo',function Todos(Todo) {		
	this.todos = [
		(new Todo({
			title: 'start with Angular todo',
			text: 'Create a todo app using angular and yeoman',
			done:true
		})),
		(new Todo({
			title: 'learn Angular as a badass todo'
		})),
		(new Todo({
			title: 'create todo app todo',
			done: true			
		}))		
	];
}]);

_app.factory('Todo',function(){

	return function(defaults){				
		if (defaults.text !== undefined && defaults.text !== null){
			if (defaults.text.length === 0 ) delete defaults.text;
		}
		return _.extend({
			title: '',
			text: 'no description given',
			done:false
		},defaults);
	};

});
