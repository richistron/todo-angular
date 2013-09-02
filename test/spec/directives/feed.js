'use strict';

describe('Directive: feed', function () {

  // load the directive's module
  beforeEach(module('richistronFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<feed></feed>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the feed directive');
  }));
});
