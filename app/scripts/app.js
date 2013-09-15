'use strict';

var _app = angular.module('main',[]);

_app.config(['$routeProvider',function (router) {
	router.when('/', {
		templateUrl: 'views/main.html',
		controller: 'TodosCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
