'use strict';

var module = angular.module('main');

module.filter('titleize', function () {
	return function(text){
		return text.trim().substring(0,1).toUpperCase() + text.trim().substring(1);
	};
});

module.filter('completedTodos', function () {
	return function(todos,hideComplete){
		if(hideComplete === undefined || hideComplete === null || hideComplete === false){
			return todos;
		}
		return _.filter(todos,function(todo){
			return !todo.done;
		});
	};
});