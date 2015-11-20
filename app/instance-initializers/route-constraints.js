import Constraints from '../route-constraints';

export default {
  name:       'route-constraints',
  initialize: function(instance) {
    var service = instance.container.lookup('service:route-constraints');
    service.map(Constraints);
  }
};
