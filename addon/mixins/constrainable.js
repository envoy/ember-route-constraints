import Ember from 'ember';
import runConstraintRedirect from '../helpers/run-constraint-redirect';

const { service } = Ember.inject;


/**
  __This mixin is used to run constraints checks again a given route

  ```js
  // app/routes/route-with-constraint.js
  import Constrainable from 'ember-route-constraints/mixins/constrainable';

  export default Ember.Route.extend(Constrainable);
  ```

  @class ConstrainableMixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    The constraints service.

    @property constraints
    @readOnly
    @type RouteContraintsService
    @public
  */
  constraints: service('route-constraints'),

  /**
    Checks it there is a constraint for this route and run it.
    @method beforeModel
    @param {Transition} transition The transition that lead to this route
    @public
  */
  beforeModel(transition) {
    let constraint = this.get('constraints').constraintFor(this.routeName);
    if (constraint && !constraint.check.run(this, transition)) {
      runConstraintRedirect(this, constraint, transition);
    } else {
      return this._super(...arguments);
    }
  }
});
