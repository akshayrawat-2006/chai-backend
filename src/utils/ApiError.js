//👉 a controller is a function that handles a request and sends a response.

class ApiError extends Error { //ApiError inherits all properties of JavaScript's Error class like message,stack, name
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""   //stack is a string that shows the call chain 
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // if stack not provided Generate stack trace automatically.
        }
    }
}

export { ApiError };