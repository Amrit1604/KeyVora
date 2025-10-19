/**
 * Password strength calculator
 */

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordScore {
  strength: PasswordStrength;
  score: number; // 0-100
  feedback: string;
  color: string;
}

export function calculatePasswordStrength(password: string): PasswordScore {
  if (!password) {
    return {
      strength: 'weak',
      score: 0,
      feedback: 'Enter a password',
      color: 'text-gray-500',
    };
  }

  let score = 0;

  // Length (max 40 points)
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Has lowercase
  if (/[a-z]/.test(password)) score += 10;

  // Has uppercase
  if (/[A-Z]/.test(password)) score += 15;

  // Has numbers
  if (/\d/.test(password)) score += 15;

  // Has special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;

  // Determine strength
  let strength: PasswordStrength;
  let feedback: string;
  let color: string;

  if (score < 40) {
    strength = 'weak';
    feedback = 'Too weak - add more characters and variety';
    color = 'text-red-500';
  } else if (score < 60) {
    strength = 'fair';
    feedback = 'Fair - consider adding special characters';
    color = 'text-orange-500';
  } else if (score < 80) {
    strength = 'good';
    feedback = 'Good password';
    color = 'text-yellow-500';
  } else {
    strength = 'strong';
    feedback = 'Strong password!';
    color = 'text-green-500';
  }

  return { strength, score, feedback, color };
}
