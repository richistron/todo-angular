'use strict';

var _app = angular.module('main');

_app.directive('highlight', [function () {
	return {
		restrict: 'A',
		link: function(scope,el){
			el.data('toggle','tooltip');
			el.attr('title','Double click to edit todo');
			el.addClass('ng-class-highlight');
			el.bind('mouseenter mouseleave', function(){
				el.toggleClass('alert alert-info');
				el.tooltip('toggle');
			});
		}
	};
}]);

_app.directive('deleteComplete',function(){
	return {
		restrict: 'M',
		replace: true,
		template: '<button type="submit" class="btn btn-danger">'
		+'<span class="icon-minus"></span>Delete complete</button>',
		link: function(scope,el){
			el.click(function(){
				var _modal = el.closest('#container').find('.modal');
				if(_modal.length > 0){
					_modal.modal('show');
					_modal.find('.cancel').bind('click',function(){
						_modal.modal('hide');
					});
					_modal.find('.delete').bind('click',function(){
						_modal.modal('hide');
						scope.deleteComplete();
					});
				}
			});
		}
	};
});

_app.directive('modal',function(){
	return {
		restrict: 'M',
		replace: true,
		templateUrl: 'views/modal.html',
		link: function(){}
	};
});

_app.directive('toogleTodo', [function () {
	return {
		restrict: 'M',
		template: '<input toggle-done type="checkbox" />',
		replace: true,
		link: function(scope,el){
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
			el.find('.todoItemForm').addClass('hide');
			var _toggleClass = function(){
				el.find('.todoItem').toggleClass('hide');
				el.find('.todoItemForm').toggleClass('hide');				
			};
			var _dbclick = function(){
							el.closest('tr').bind('dblclick',function(){
								$(this).unbind('dblclick');
								_toggleClass();
							});			
						};
			_dbclick();
			el.find('.todoItemForm').bind('keydown keypress',function(e){
				// enter and scape keys		
				switch(e.keyCode){
					case 13: 
						_dbclick();
						return _toggleClass();
					case 27:
						_dbclick();
						return _toggleClass();
					default:						
						return;
				}				
			});
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
