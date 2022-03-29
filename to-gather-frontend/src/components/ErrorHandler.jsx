function setAuthError(setError, field, message) {
    setError(field, {
      type: "custom",
      message: message
    });
  }

export default function handleError(setError, error) {
    
    // sign in error
    if (error === "auth/user-not-found") {
        setAuthError(setError, "email", "Email does not exist. Please sign up first.");
      };
  
      if (error === "auth/wrong-password") {
        setAuthError(setError, "password", "Wrong password, pleas try again.");
      };

      if (error === "auth/too-many-requests") {
        setAuthError(setError, "password", "Too many attempt. Please use another Email or try later.");
      };
    
      // sign up error
      if (error === "auth/email-already-in-use") {
        setAuthError(setError, "email", "Email already in use. Please log in or use a new email.");
      };

      if (error === "auth/invalid-email") {
        setAuthError(setError, "email", "Your Email address is invalid, please check and try again.");
      };


      

}