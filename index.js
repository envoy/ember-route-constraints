'use strict';

module.exports = {
  name: 'ember-route-constraints',
  demoURL: 'http://envoy.github.io/ember-route-constraints/',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/ember-route-constraints/register-version.js');
  }
};
