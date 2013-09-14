'use strict';

angular.module('main').directive('getTodoActions', [function () {
	return {
		restrict: "A",
		link: function(scope,el,attrs){
			console.log(scope.todo);
			console.log(el);
			console.log(attrs);			
		}
	};
}]);
