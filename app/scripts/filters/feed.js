'use strict';

angular.module('main').filter('titleize', function () {
	return function(text){
		return text.trim().substring(0,1).toUpperCase() + text.trim().substring(1);
	};
});

angular.module('main').filter('completedTodos', function () {
	return function(todos,hideComplete){
		if(hideComplete === undefined || hideComplete === null || hideComplete === false){
			return todos;
		}
		var _ = window._;
		return _.filter(todos,function(todo){
			return !todo.done;
		});
	};
});