class __APPPromise<RES = any, REJ = any> {
  private thenFunc: (e: RES) => void = () => {};
  private catchFunc: (e: REJ) => void = () => {};
  private finallyFunc: () => void = () => {};

  constructor(
    e: (resolve?: (value: RES) => void, reject?: (reason: REJ) => void) => void,
  ) {
    e(
      (res) => {
        this.thenFunc(res);
        this.finallyFunc();
      },
      (rej) => {
        this.catchFunc(rej);
        this.finallyFunc();
      },
    );
  }

  public then(func: (e: RES) => void): __APPPromise<RES, REJ> {
    this.thenFunc = func;
    return this;
  }

  public catch(func: (e: REJ) => void): __APPPromise<RES, REJ> {
    this.catchFunc = func;
    return this;
  }

  public finally(func: () => void): __APPPromise<RES, REJ> {
    this.finallyFunc = func;
    return this;
  }
}

export default __APPPromise;
