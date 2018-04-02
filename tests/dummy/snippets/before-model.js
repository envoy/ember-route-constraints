import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    if (!this.get('currenUser.isAdmin')) {
      this.transitionTo('index');
    }
  }
});
