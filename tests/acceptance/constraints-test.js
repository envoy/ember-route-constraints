import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

let application, currentUser;
moduleForAcceptance('Acceptance | Constraints', {
  beforeEach() {
    application = this.application;
    currentUser = application.__container__.lookup('service:current-user');
  }
});

test('Navigating between routes', function(assert) {
  assert.expect(10);
  visit('/');

  andThen(function() {
    assert.equal(currentRouteName(), 'index', 'navigates to index');
  });

  visit('royal-families');

  andThen(function() {
    assert.equal(currentRouteName(), 'demo', 'goes to demo page');
  });

  visit('targaryens');

  andThen(function() {
    assert.equal(currentRouteName(), 'demo', 'goes to demo page');
  });

  visit('lannisters');

  andThen(function() {
    assert.equal(currentRouteName(), 'demo', 'redirects to demo page');

    Ember.run(() => {
      currentUser.set('house', 'Lannister');
    });
  });

  visit('lannisters');

  andThen(function() {
    assert.equal(currentRouteName(), 'lannisters', 'goes to lannisters page');
  });

  visit('targaryens');

  andThen(function() {
    assert.equal(currentRouteName(), 'demo', 'redirects to demo');
  });

  visit('royal-families');

  andThen(function() {
    assert.equal(currentRouteName(), 'royal-families', 'goes to royal families');

    Ember.run(() => {
      currentUser.set('house', 'Targaryen');
    });
  });

  visit('targaryens');

  andThen(function() {
    assert.equal(currentRouteName(), 'targaryens', 'goes to targaryens');
  });

  visit('lannisters');

  andThen(function() {
    assert.equal(currentRouteName(), 'demo', 'goes to demo');
  });

  visit('royal-families');

  andThen(function() {
    assert.equal(currentRouteName(), 'royal-families', 'goes to royal families');
  });
});
