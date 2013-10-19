'use strict';

var _app = angular.module('main');

var _ = _ || window._;

_app.filter('titleize', function () {
	return function(text){
		return _.string.titleize(text);
	};
});

_app.filter('completedTodos', function () {
	return function(todos,hideComplete){
		if(hideComplete === false){
			return todos;
		}
		return _.filter(todos,function(todo){
			return !todo.done;
		});
	};
});