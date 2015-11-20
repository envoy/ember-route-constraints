export default function() {
  this.transition(
    this.toRoute('lannisters'),
    this.check(function() {
      let isLannister = this.get('currentUser.isLannister');

      if(!isLannister) {
        this.get('notify').alert('Only Lannisters, sorry!');
      }

      return isLannister;
    }),
    this.redirectTo('demo')
  );

  this.transition(
    this.toRoute('targaryens'),
    this.check(function() {
      let isTargaryen = this.get('currentUser.isTargaryen');

      if(!isTargaryen) {
        this.get('notify').alert('Is hot here!');
      }

      return isTargaryen;
    }),
    this.redirectTo('demo')
  );

  this.transition(
    this.toRoute(/^royal-families/),
    this.check(function() {

      let canNavigate = this.get('currentUser.isTargaryen')  || this.
            get('currentUser.isLannister');

      if(!canNavigate) {
        this.get('notify').alert('Not today!');
      }

      return canNavigate;
    }),
    this.redirectTo('demo')
  );
}
