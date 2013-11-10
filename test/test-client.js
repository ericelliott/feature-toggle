/*global test, asyncTest, $, start,
  setFeatures, ok, deepEqual, equal*/
'use strict';

var getParams = function getParams() {
    var params = {};
    if (location.search) {
      var parts = location.search.slice(1).split('&');

      parts.forEach(function (part) {
        var pair = part.split('=');
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        params[pair[0]] = (pair[1] !== 'undefined') ?
          pair[1] : true;
      });
    }
    return params;
  },
  params = getParams(),
  feature;

if (!params.ft) {
  window.location = '?ft=foo,bar,baz&ft-off=not-active';
}
feature = setFeatures(['not-active']);

test('URL params', function () {
  var $body = $('body'),
    classesMock = [
      "existing-class",
      "leave-alone",
      "ft-foo",
      "ft-bar",
      "ft-baz"
    ],
    classes = $body.attr('class').split(' ');

  deepEqual(classes, classesMock,
    'Features should be represented by classes on ' +
    'the body tag');
});

test('ft-off param', function () {
  equal(feature.active('not-active'), false,
    'ft-off should disable features.');
});

asyncTest('.activate()', function () {
  var called = false, classes;
  feature.on('activated', function () {
    called = true;
  });
  feature.activate(['activate']);

  classes = $('body').attr('class').split(' ');

  setTimeout(function () {
    ok(called,
      'activated event should be called.');

    ok(classes.indexOf('ft-activate') > -1,
      'Should set feature class.');
    start();
  }, 0);
});

asyncTest('.deactivate()', function () {
  var called = false, classes;
  feature.on('deactivated', function () {
    called = true;
  });

  feature.deactivate(['foo']);

  classes = $('body').attr('class').split(' ');

  setTimeout(function () {
    ok(called,
      'activated event should be called.');

    ok(classes.indexOf('ft-foo') === -1,
      'Should unset feature class.');

    ok(classes.indexOf('leave-alone') > -1,
      'Should leave other classes alone.');

    start();
  }, 0);

});