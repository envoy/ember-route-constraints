import Ember from 'ember';
import Application from '../../../app';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

import { test, module } from 'qunit';

var application, t, defaultHandler;

Ember.run(function(){
  var options = {
    autoboot: false
  };

  if (hasEmberVersion(2,2) && !hasEmberVersion(2,3)) {
    options._bootSync = function() { };
  }

  application = Application.create(options);
});

module('Constraints DSL', {
  setup: function(){
    var instance = application.buildInstance();
    if (instance.lookup) {
      t = instance.lookup('service:route-constraints');
    } else {
      t = instance.container.lookup('service:route-constraints');
    }
  },
  teardown: function(){
    t = null;
  }
});


test('returns rule if there is a matching route', function(assert){
  assert.expect(7);

  t.map(function(){
    this.transition(
      this.toRoute(['foo']),
      this.check(function() {
        assert.ok(this.isFoo, 'calls with context');

        return true;
      })
    );
    this.transition(
      this.toRoute('bar'),
      this.check(() => {return true;}),
      this.redirectTo('baz')
    );
  });

  let rule = t.constraintFor('foo');

  assert.ok(rule, 'there is a route for foo');
  assert.ok(rule.check.run({isFoo: true}), 'check returns true');
  assert.equal(rule.redirectTo, 'index', 'redirects to info by default');

  rule = t.constraintFor('bar');

  assert.ok(rule, 'find rule for bar');
  assert.equal(rule.redirectTo, 'baz', 'redirects to baz');


  assert.ok(!t.constraintFor('baz'), 'there is no rule for baz');
});


test('matches lists of routes', function(assert){
  assert.expect(6);

  let routes = ['one', 'two', 'three'];

  t.map(function(){
    this.transition(
      this.toRoute(routes),
      this.check(function() {
        assert.ok(true, 'called check function');

        return true;
      })
    );
  });

  routes.forEach(function(route) {
    assert.ok(t.constraintFor(route), `finds constraints for ${route}`);
    t.constraintFor(route).check.run();
  });
});

test('matches routes by regex', function(assert){
  assert.expect(4);

  t.map(function(){
    this.transition(
      this.toRoute(/^foo/),
      this.check(function() {
        assert.ok(true, 'called check function');

        return true;
      })
    );
  });

  let routes = ['foo.bar', 'foo.baz'];

  routes.forEach(function(route) {
    assert.ok(t.constraintFor(route), `finds constraints for ${route}`);
    t.constraintFor(route).check.run();
  });
});

test('last constraint define has higher precedence', function(assert){
  assert.expect(2);

  t.map(function(){
    this.transition(
      this.toRoute('foo'),
      this.check(function() {
        assert.ok(false, 'is not called');

        return true;
      })
    );

    this.transition(
      this.toRoute('foo'),
      this.check(function() {
        assert.ok(true, 'calls correct check');

        return true;
      })
    );
  });

  let rule = t.constraintFor('foo');

  assert.ok(rule, `finds constraints for foo`);
  rule.check.run();
});


test('params order does not matter', function(assert){
  assert.expect(2);

  t.map(function(){
    this.transition(
      this.toRoute('foo'),
      this.check(function() {
        assert.ok(true, 'is called');

        return true;
      })
    );
  });

  let rule = t.constraintFor('foo');

  assert.ok(rule, `finds constraints for foo`);
  rule.check.run();
});
