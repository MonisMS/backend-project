/**
 * Custom API Error class extending the native Error class
 * 
 * @class ApiError
 * @extends Error
 * @description A specialized error class for API responses that includes HTTP status codes and additional error information
 */

/**
 * Creates an instance of ApiError
 * @constructor
 * @param {number} statusCode - HTTP status code for the error (e.g., 400, 404, 500)
 * @param {string} [message="Something went wrong"] - Error message
 * @param {Array} [error=[]] - Array to store additional error details
 * @param {string} [stack=""] - Stack trace information
 * 
 * @example
 * // Create a not found error
 * throw new ApiError(404, "User not found")
 * 
 * // Create a validation error with details
 * throw new ApiError(400, "Validation failed", [
 *   { field: "email", message: "Invalid email format" },
 *   { field: "password", message: "Password too short" }
 * ])
 * 
 * @remarks
 * This class is designed to standardize API error responses across the application.
 * It automatically captures stack traces and formats error information consistently
 * for API responses, making debugging and client-side error handling more consistent.
 */
class ApiError extends Error{
    constructor(
        statusCode,      // HTTP status code for the error (e.g., 400, 404, 500)
        message="Something went wrong",  // Error message, defaults to "Something went wrong"
        error=[],        // Array to store additional error details
        stack=""         // Stack trace information
    ){
        super(message)   // Call parent Error class constructor with the message
        
        // Set properties on the ApiError instance
        this.statusCode = statusCode    // Store the HTTP status code
        this.data = null                // No data returned with errors
        this.message = message          // Store the error message
        this.success = false            // Mark the response as unsuccessful
        this.error = error              // Store any additional error details
        
        // Handle the error stack trace
        if(stack){
            this.stack = stack          // Use the provided stack trace if given
        }else{
            Error.captureStackTrace(this, this.constructor)  // Otherwise capture a new stack trace
        }
    }
}


export {ApiError}