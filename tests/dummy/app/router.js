import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('lannisters');
  this.route('royal-families');
  this.route('targaryens');
  this.route('install');
  this.route('constraints');
  this.route('demo');
});

export default Router;
