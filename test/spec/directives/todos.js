'use strict';

describe('Directive: todos', function () {

	// load the directive's module
	beforeEach(module('main'));
	
	var element,
	scope;
	
	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));
	// highlight directive
	it('highlight', inject(function ($compile,$rootScope) {
		element = angular.element('<todos highlight></todos>');
		element = $compile(element)($rootScope);		
		expect(element.hasClass('ng-class-highlight')).toBeTruthy();
	}));
	// deleteComplete directive
	it('deleteComplete', inject(function ($compile) {
		// element = angular.element('<div delete-complete>');
		// console.log(element);
		// element = $compile(element)(scope);
		// console.log(element);
	}));
});
