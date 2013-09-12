'use strict';
var module = angular.module('main',[]);

module.config(['$routeProvider',function (router) {
	router.when('/', {
			templateUrl: 'views/main.html',
			controller: 'FeedsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);