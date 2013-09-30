'use strict';

describe('Directive: todos', function () {

	// load the directive's module
	beforeEach(module('main'));
	
	var element,
	scope;
	
	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));
	// btnDisabled directive
	it('btnDisabled', inject(function ($compile,$rootScope) {
		// element = angular.element('<button btn-disabled></button>');
		// element = $compile(element)($rootScope);		
		expect(true).toBeTruthy();
	}));
	// deleteComplete directive
	it('deleteComplete', inject(function ($compile) {
		// element = angular.element('<div delete-complete>');
		// console.log(element);
		// element = $compile(element)(scope);
		// console.log(element);
	}));
});
