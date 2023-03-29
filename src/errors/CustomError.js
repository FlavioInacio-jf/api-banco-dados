module.exports = class CustomError {
  title;
  detail;
  code;

  constructor(error) {
    Object.assign(this, error);
    if (!this.detail) {
      this.detail = this.title;
    }
    if (!this.code) {
      this.code = 500;
    }
  }
}