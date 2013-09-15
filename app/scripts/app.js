'use strict';

var _module = angular.module('main',[]);

_module.config(['$routeProvider',function (router) {
	router.when('/', {
		templateUrl: 'views/main.html',
		controller: 'TodosCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
