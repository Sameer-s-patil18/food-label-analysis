export const handleError = (error) => {
  const errorMessage = error?.message || error;
  console.error("Error:", errorMessage);
  
  // Show user-friendly error message
  alert(typeof errorMessage === 'string' 
    ? errorMessage 
    : 'An error occurred while processing your request. Please try again.');
  
  // Log detailed error information for debugging
  if (error?.stack) {
    console.error("Stack trace:", error.stack);
  }
};