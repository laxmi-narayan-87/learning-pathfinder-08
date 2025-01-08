import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: AuthError): string => {
  if (error instanceof AuthApiError) {
    // Check the error code from the API response body
    const errorBody = error.message.includes("{") 
      ? JSON.parse(error.message)
      : { code: error.message };
      
    switch (errorBody.code) {
      case "user_already_exists":
        return "This email is already registered. Please try logging in instead.";
      case "invalid_credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "invalid_grant":
        return "Invalid login credentials.";
      default:
        return error.message;
    }
  }
  return error.message;
};