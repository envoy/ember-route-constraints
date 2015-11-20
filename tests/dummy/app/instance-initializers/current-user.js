export default {
  name: 'current-user-and-notify',
  initialize: function(instance) {
    instance.registry.injection('route', 'currentUser', 'service:current-user');
    instance.registry.injection('controller', 'currentUser', 'service:current-user');

    instance.registry.injection('route', 'notify', 'service:notify');
    instance.registry.injection('controller', 'notify', 'service:notify');
  }
};
