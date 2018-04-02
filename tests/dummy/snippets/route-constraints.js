//create the file app/route-constraints.js

export default function() {
  this.transition(
    this.toRoute('lannisters'),
    this.check(function() {
      let isLannister = this.get('currentUser.isLannister');

      return isLannister;
    }),
    this.redirectTo('demo')
  );

  this.transition(
    this.toRoute('targaryens'),
    this.check(function() {
      let isTargaryen = this.get('currentUser.isTargaryen');

      return isTargaryen;
    }),
    this.redirectTo('demo')
  );

  this.transition(
    this.toRoute(/^royal-families/),
    this.check(function() {
      let canNavigate = this.get('currentUser.isTargaryen') || this.get('currentUser.isLannister');

      return canNavigate;
    }),
    this.redirectTo('demo')
  );
}
