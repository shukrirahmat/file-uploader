class PageNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 404;
      this.name = "PageNotFoundError";
    }
  }
  
  module.exports = PageNotFoundError;