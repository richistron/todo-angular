'use strict';

var _module = angular.module('main');

var _ = _ || window._;

_module.filter('titleize', function () {
	return function(text){
		return _.string.titleize(text);
	};
});

_module.filter('completedTodos', function () {
	return function(todos,hideComplete){
		if(hideComplete === undefined || hideComplete === null || hideComplete === false){
			return todos;
		}
		return _.filter(todos,function(todo){
			return !todo.done;
		});
	};
});