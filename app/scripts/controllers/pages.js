'use strict';

angular.module('main').controller('PagesCtrl', ['$scope', function ($scope) {
	// defaults
	(function(){
		$scope.pages = [
			{
				name: 'About',
				text: 'Todo App 0.0.1 builded with yeoman. @richistron 2013',
				path: '/about'
			},
			{
				name: 'Contact',
				text: 'Github https://github.com/richistron',
				path: '/contact'
			}
		];
	})();
}]);