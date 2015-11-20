import Ember from 'ember';

export default Ember.Service.extend({
  house: 'Stark',
  isLannister: Ember.computed.equal('house', 'Lannister'),
  isTargaryen: Ember.computed.equal('house', 'Targaryen')
});
