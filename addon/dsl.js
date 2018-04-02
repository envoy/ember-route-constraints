import Rule from './rule';
import Constraint from './constraint';
import Check from './check';
import RouteName from './route-name';

// Based on Edward Faulkner <ef@alum.mit.edu> work on liquid-fire -
// https://github.com/ef4/liquid-fire/blob/7935d4f/addon/dsl.js

export default class DSL {
  constructor(map) {
    this.map = map;
  }

  transition() {
    var rule = new Rule();
    var parts = Array.prototype.slice.apply(arguments).reduce(function(a, b) {
      return a.concat(b);
    }, []);

    for (var i = 0; i < parts.length; i++) {
      rule.add(parts[i]);
    }

    this.map.addRule(rule);
  }

  toRoute(routeName) {
    return [new Constraint(routeName)];
  }

  check(fun) {
    return new Check(fun);
  }

  redirectTo(routeName) {
    return new RouteName(routeName);
  }

  debug() {
    return 'debug';
  }
}
