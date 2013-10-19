'use strict';

var _app = angular.module('main',[]);

_app.config(['$routeProvider',function (router) {
	router.when('/', {
		templateUrl: 'views/main.html',
		controller: 'TodosCtrl'
	}).when('/about',{
		templateUrl: 'views/pages.html',
		controller: 'PagesCtrl'
	}).when('/contact',{
		templateUrl: 'views/pages.html',
		controller: 'PagesCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
