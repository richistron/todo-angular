'use strict';

angular.module('main').directive('highlight', [function () {
	return {
		restrict: 'A',
		link: function(scope,el){
			el.bind('mouseenter mouseleave', function(){
				el.toggleClass('alert alert-info');
			});
		}
	};
}]);

angular.module('main').directive('todoItem',function(){
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
