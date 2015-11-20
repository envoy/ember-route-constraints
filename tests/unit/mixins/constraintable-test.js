import Ember from 'ember';
import ConstraintableMixin from '../../../mixins/constraintable';
import { module, test } from 'qunit';

module('Unit | Mixin | constraintable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ConstraintableObject = Ember.Object.extend(ConstraintableMixin);
  let subject = ConstraintableObject.create();
  assert.ok(subject);
});
