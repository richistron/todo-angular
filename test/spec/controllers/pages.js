'use strict';

describe('Controller: PagesCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));

  var PagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PagesCtrl = $controller('PagesCtrl', {
      $scope: scope
    });
  }));

  it('expect two default pages', function () {
    expect(scope.pages.length).toBe(2);
  });
});
