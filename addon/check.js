export default class Check {
  constructor(check) {
    this.fun = check;
  }

  run(context) {
    return this.fun.apply(context);
  }
}
