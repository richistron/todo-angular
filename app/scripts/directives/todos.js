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

_app.directive('toogleTodo', [function () {
	return {
		restrict: 'M',
		template: '<input toggle-done type="checkbox" />',
		replace: true,
		link: function(scope,el,attrs){						
			if(scope.todo.done === true){
				el.attr('checked',true);
			}
			el.bind('click',function(){
				el.closest('tr').find('.todo-item').toggleClass('todo-done-true');
				scope.editTodo(scope.todo,{done: el.is(':checked')});				
			});
		}
	};
}]);

_app.directive('todoItem',function(){
	return {
		restrict: 'M',
		templateUrl: 'views/todo.html',
		replace: true,
		link: function(scope,el){
			el.bind('mouseenter mouseleave',function(){
				el.find('p').toggleClass('hide');
			});
			el.find('p').addClass('hide');
		}
	};
});

_app.directive('controls',function(){
	return{
		restrict: 'M',
		templateUrl: 'views/controls.html',
		replace: true,
		link: function(){}
	};
});


_app.directive('todosList',function(){
	return{
		restrict: 'M',
		templateUrl: 'views/todos-list.html',
		replace: true,
		link: function(){}
	};
});
