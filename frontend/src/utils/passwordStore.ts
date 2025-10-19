/**
 * Session-based password storage
 * Passwords are stored in sessionStorage and cleared when browser closes
 */

const PASSWORD_PREFIX = 'pad_password_';

export const passwordStore = {
  /**
   * Save password for a pad (session only)
   */
  save(padId: string, password: string): void {
    try {
      sessionStorage.setItem(`${PASSWORD_PREFIX}${padId}`, password);
    } catch (error) {
      console.error('Failed to save password:', error);
    }
  },

  /**
   * Get saved password for a pad
   */
  get(padId: string): string | null {
    try {
      return sessionStorage.getItem(`${PASSWORD_PREFIX}${padId}`);
    } catch (error) {
      console.error('Failed to get password:', error);
      return null;
    }
  },

  /**
   * Remove password for a pad
   */
  remove(padId: string): void {
    try {
      sessionStorage.removeItem(`${PASSWORD_PREFIX}${padId}`);
    } catch (error) {
      console.error('Failed to remove password:', error);
    }
  },

  /**
   * Clear all saved passwords
   */
  clearAll(): void {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(PASSWORD_PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear passwords:', error);
    }
  },
};
