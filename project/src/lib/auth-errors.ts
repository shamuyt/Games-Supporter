export const getAuthErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();
  
  if (message.includes('user already registered') || message.includes('user_already_exists')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  
  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  
  if (message.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  
  if (message.includes('password')) {
    return 'Password should be at least 6 characters long.';
  }
  
  return 'An error occurred. Please try again.';
};