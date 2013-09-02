'use strict';

describe('Filter: feed', function () {

  // load the filter's module
  beforeEach(module('richistronFrontendApp'));

  // initialize a new instance of the filter before each test
  var feed;
  beforeEach(inject(function ($filter) {
    feed = $filter('feed');
  }));

  it('should return the input prefixed with "feed filter:"', function () {
    var text = 'angularjs';
    expect(feed(text)).toBe('feed filter: ' + text);
  });

});
