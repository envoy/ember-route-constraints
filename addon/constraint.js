import { guidFor } from '@ember/object/internals';
import { isArray, A } from '@ember/array';

/**
 * Based on Edward Faulkner <ef@alum.mit.edu> work on liquid-fire -
 * https://github.com/ef4/liquid-fire/blob/7935d4f/addon/constraint.js
 *
 * Represents a constraint, that is the set of routes where the rule
 * will apply.
 *
 * @param {string} matcher - the route or routes where we want to
 * apply the rule.

 * Notes from original implementor:
 * Every rule constraint has a target and either `keys` or
 * `predicate`. key-based constraints are cheaper because we can check
 * them with O(1) lookups, whereas predicates must be searched O(n).
 */
export default class Constraint {
  constructor(matcher) {
    if (matcher instanceof RegExp) {
      this.predicate = function(value) { return matcher.test(value); };
    } else if (typeof matcher === 'function') {
      this.predicate = matcher;
    } else if (typeof matcher === 'boolean') {
      this.predicate = function(value) { return matcher ? value : !value; };
    } else {
      this.keys = constraintKeys(matcher);
    }
  }
}

export var EMPTY = '__route_constraints_EMPTY__';
export var ANY = '__route_constraints_ANY__';

export function constraintKeys(matcher) {
  if (typeof matcher === 'undefined' || matcher === null) {
    matcher = [ EMPTY ];
  } else if (!isArray(matcher)) {
    matcher = [matcher];
  }
  return A(matcher).map((elt) => {
    if (typeof elt === 'string') {
      return elt;
    } else {
      return guidFor(elt);
    }
  });
}
