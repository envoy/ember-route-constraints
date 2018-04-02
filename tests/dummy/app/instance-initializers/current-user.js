export default {
  name: 'current-user-and-notify',
  initialize: function(application) {
    application.inject('route', 'currentUser', 'service:current-user');
    application.inject('controller', 'currentUser', 'service:current-user');

    application.inject('route', 'notify', 'service:notify');
    application.inject('controller', 'notify', 'service:notify');
  }
};
