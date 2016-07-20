import Constraints from '../route-constraints';

export default {
  name:       'route-constraints',
  initialize: function(instance) {
    var service;

    if (typeof instance.lookup === 'function') {
      service = instance.lookup('service:route-constraints');
    } else {
      service = instance.container.lookup('service:route-constraints');
    }

    service.map(Constraints);
  }
};
