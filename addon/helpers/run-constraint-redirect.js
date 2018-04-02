export default function runConstraintRedirect(route, constraint, transition) {
  if (typeof constraint.redirectTo === 'function') {
    constraint.redirectTo.apply(route, [transition]);
  } else {
    // transition.abort();

    route.transitionTo(constraint.redirectTo);
  }
}
