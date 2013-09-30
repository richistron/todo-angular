'use strict';

angular.module('main').controller('PagesCtrl', ['$scope', function ($scope) {
	// defaults
	(function(){
		$scope.pages = [
			{
				name: 'About',
				text: 'todoApp',
				path: '/about'
			},
			{
				name: 'Contact',
				text: 'richistron@gmail.com',
				path: '/contact'
			}
		];
	})();	
}]);