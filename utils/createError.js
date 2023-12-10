const createError = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
  
    return error.message;
  };
  
  module.exports = createError;