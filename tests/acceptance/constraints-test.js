import { module, test } from 'qunit';
import { visit, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';

let currentUser;
module('Acceptance | Constraints', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    currentUser = this.owner.lookup('service:current-user');
  });
  test('Navigating between routes', async function(assert) {
    assert.expect(10);
    await visit('/');

    assert.equal(currentRouteName(), 'index', 'navigates to index');

    await visit('royal-families');

    assert.equal(currentRouteName(), 'demo', 'goes to demo page');

    await visit('targaryens');

    assert.equal(currentRouteName(), 'demo', 'goes to demo page');

    await visit('lannisters');

    assert.equal(currentRouteName(), 'demo', 'redirects to demo page');

    run(() => currentUser.set('house', 'Lannister'));

    await visit('lannisters');

    assert.equal(currentRouteName(), 'lannisters', 'goes to lannisters page');

    await visit('targaryens');

    assert.equal(currentRouteName(), 'demo', 'redirects to demo');

    await visit('royal-families');

    assert.equal(currentRouteName(), 'royal-families', 'goes to royal families');

    run(() => currentUser.set('house', 'Targaryen'));

    await visit('targaryens');

    assert.equal(currentRouteName(), 'targaryens', 'goes to targaryens');

    await visit('lannisters');

    assert.equal(currentRouteName(), 'demo', 'goes to demo');

    await visit('royal-families');

    assert.equal(currentRouteName(), 'royal-families', 'goes to royal families');
  });
});
