# Ember Rute Constraints

Route navigation constraints for Ember apps.

Sometimes we want to restrict who can visit a route based on some
conditions. A common approach to solve this issue is to have a
`beforeModel` hook and then transtion from there if the user can't
visit the route.


```
beforeModel() {
  if (!this.get('currenUser.isAdmin')) {
    this.transitionTo('index');
  }
}
```

While this approach works, it starts to get messy, repetitive and
difficult to follow as applications grow.

This addon follows a similar pattern to `liquid-fire` so you can
define all your routes constraints using a declaritive DSL. If the
given conditions are not met, then you can redirect users to a
different route.

Create a file in `app/route-constraints.js` like:


```
// app/route-constraints.js

export default function() {
  this.transition(
    this.toRoute('admin'),
    this.condition(function() {
      return this.get('currentUser.isAdmin');
    }),
    this.transtionTo('index')
  );

  this.transition(
    this.toRoute(['paid-feature', 'help']),
    this.condition(function() {
      return this.get('currentUser.isSubscribed');
    }),
    this.transtionTo('subscribe')
  );
}
```

And then add the `ConstrainableMixin` to the routes you want to constraint.

```
//app/admin/route.js

import Constrainable from 'ember-route-constraints/mixins/constrainable';

export default Ember.Route.extend(Constrainable, {
});
```

## Installation

You can install either `ember install`:

For Ember CLI >= `0.2.3`:

```shell
ember install ember-route-constraints
```

For Ember CLI < `0.2.3`:

```shell
ember install:addon ember install ember-route-constraints
```


## Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
