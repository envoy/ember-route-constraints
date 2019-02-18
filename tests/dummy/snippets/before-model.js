import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    if (!this.get('currentUser.isAdmin')) {
      this.transitionTo('index');
    }
  }
});
