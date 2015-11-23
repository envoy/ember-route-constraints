export default class Check {
  constructor(check) {
    this.fun = check;
  }

  run(context, transition) {
    return this.fun.apply(context, transition);
  }
}
