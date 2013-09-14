'use strict';

angular.module('main').directive('highlight', [function () {
	return {
		restrict: "A",
		link: function(scope,el,attrs){
			el.bind("mouseenter mouseleave", function(e){
				el.toggleClass('alert alert-info');
			});
		}
	};
}]);
