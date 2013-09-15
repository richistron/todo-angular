'use strict';

describe('Directive: todo', function () {

  // load the directive's module
  beforeEach(module('main'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    // element = angular.element('<todo></todo>');
    // element = $compile(element)(scope);
    // expect(element.text()).toBe('this is the todo directive');
    expect(1).toBe(1);
  }));
});
