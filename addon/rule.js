import { A } from '@ember/array';
import Check from './check';
import RouteName from './route-name';

/**
 * Based on Edward Faulkner <ef@alum.mit.edu> work on liquid-fire -
 * https://github.com/ef4/liquid-fire/blob/7935d4f/addon/rule.js
 *
 * Represent a new roule.
 *
 * @param {string, array} toRoute - Route or routes affected by this
 * rule.
 * @param {function} check - If this function returns true the
 *                           transtion continues otherwise there is a
 *                           redirect.
 * @param {string} transtionTo - Route to transition if check returns
 *                               false. This argument is optional and
 *                               defaults to the index route.
 */
export default class Rule {
  constructor() {
    this.constraints = A();
    this.toRoute = null;
    this.check = null;
    this.redirectTo = null;
  }

  add(thing) {
    if (thing instanceof Check) {
      var prop = 'check';

      if (this[prop]) {
        throw new Error(`More than one check statement in the same transition rule is not allowed`);
      }
      this[prop] = thing;
    } else if (thing instanceof RouteName) {
      if (this['redirectTo']) {
        throw new Error(`More than one redirectTo statement in the same transition rule is not allowed`);
      }
      this.redirectTo = thing.name;
    } else if (thing === 'debug') {
      this.debug = true;
    } else {
      this.constraints.push(thing);
    }
  }

  /** validates inclusion of the required properties and sets defaults. */
  validate() {
    let required = ['check'];

    required.forEach( (prop) => {
      if (!this[prop]) {
        throw new Error(`Every transition rule must include a "${prop}" statement`);
      }
    });

    if (!this.constraints.length) {
      throw new Error(`Every transition rule must include a "toRoute" statement`);
    }

    if (!this.redirectTo) {
      this.redirectTo = 'index';
    }
  }
}
