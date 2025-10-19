const validatePassphrase = (passphrase) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(passphrase);
  const hasLowerCase = /[a-z]/.test(passphrase);
  const hasNumbers = /\d/.test(passphrase);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(passphrase);

  if (passphrase.length < minLength) {
    return { valid: false, message: `Passphrase must be at least ${minLength} characters long.` };
  }
  if (!hasUpperCase) {
    return { valid: false, message: 'Passphrase must contain at least one uppercase letter.' };
  }
  if (!hasLowerCase) {
    return { valid: false, message: 'Passphrase must contain at least one lowercase letter.' };
  }
  if (!hasNumbers) {
    return { valid: false, message: 'Passphrase must contain at least one number.' };
  }
  if (!hasSpecialChars) {
    return { valid: false, message: 'Passphrase must contain at least one special character.' };
  }

  return { valid: true, message: 'Passphrase is valid.' };
};

const validatePadContent = (content) => {
  if (!content || content.trim().length === 0) {
    return { valid: false, message: 'Pad content cannot be empty.' };
  }
  return { valid: true, message: 'Pad content is valid.' };
};

module.exports = {
  validatePassphrase,
  validatePadContent,
};