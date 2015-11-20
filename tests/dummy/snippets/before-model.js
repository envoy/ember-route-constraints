beforeModel() {
  if (!this.get('currenUser.isAdmin')) {
    this.transitionTo('index');
  }
}
