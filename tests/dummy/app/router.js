import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
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
