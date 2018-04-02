import { equal } from '@ember/object/computed';
import Service from '@ember/service';

export default Service.extend({
  house: 'Stark',
  isLannister: equal('house', 'Lannister'),
  isTargaryen: equal('house', 'Targaryen')
});
