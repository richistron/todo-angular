'use strict';

var _app = angular.module('main');

_app.directive('highlight', [function () {
	return {
		restrict: 'A',
		link: function(scope,el){
			el.bind('mouseenter mouseleave', function(){
				el.toggleClass('alert alert-info');
			});
		}
	};
}]);

_app.directive('todoItem',function(){
	return {
		restrict: 'M',
		templateUrl: 'views/todo.html',
		replace: true,
		// scope, el, attrs
		link: function(scope,el){
			el.bind('mouseenter mouseleave',function(){
				el.find('p').toggleClass('hide');
			});
			el.find('p').addClass('hide');
		}
	};
});
