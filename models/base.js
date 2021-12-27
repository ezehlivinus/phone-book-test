class Base {
  static instance;

  constructor() {
    if (Base.instance) {
      return Base.instance;
    }
    this.contacts = [];
    Base.instance = this;
  }
}

export default Base;
