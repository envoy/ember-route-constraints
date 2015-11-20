import DSL from "./dsl";
import Ember from "ember";
import Constraints from "./constraints";

// Based on Edward Faulkner <ef@alum.mit.edu> work on liquid-fire -
// https://github.com/ef4/liquid-fire/blob/7935d4f/addon/transition-map.js

var ConstraintsMap = Ember.Service.extend({
  init: function() {
    this.constraints = new Constraints();
  },

  constraintFor: function(conditions) {
    return this.constraints.bestMatch(conditions);
  },


  map: function(handler) {
    if (handler){
      handler.apply(new DSL(this));
    }
    return this;
  },

  addRule: function(rule) {
    rule.validate(this);
    this.constraints.addRule(rule);
  }
});

export default ConstraintsMap;
