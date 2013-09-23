'use strict';

var _app = angular.module('main');

_app.factory('TodosStorage',function(){
	var storageID = 'angular-todo-app';
	return {
		get: function(){
			// console.log('get');
			return JSON.parse(localStorage.getItem(storageID) || '[]');
		},
		put: function(todos){
			// console.log('save');
			localStorage.setItem(storageID,JSON.stringify(todos));
		}
	};
});

_app.factory('underscore', function(){
	return window._;
});

_app.factory('$', function(){
	return window.$;
});

_app.factory('Todo', ['underscore' , function Todo(_){
	return function(params){
		if(params === undefined || params === null){
			params = {};
		}

		if (params.description !== undefined || params.description !== null){
			if (params.description.trim().length === 0){
				delete params.description;
			}
		}

		return _.extend({
			title: 'Hello world',
			description: 'create youre first yeoma app with angular-generator',
			done: false
		},params);
	};
}]);
