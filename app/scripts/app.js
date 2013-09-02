'use strict';

angular.module('main', []).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'FeedsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});