/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {{ valid: boolean, strength: 'weak'|'medium'|'strong', message: string }}
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { valid: false, strength: 'weak', message: 'Password must be at least 6 characters' };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { valid: true, strength: 'weak', message: 'Weak password' };
  if (score <= 3) return { valid: true, strength: 'medium', message: 'Medium strength' };
  return { valid: true, strength: 'strong', message: 'Strong password' };
};

/**
 * Validate phone number
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const re = /^[0-9+\-\s()]{8,15}$/;
  return re.test(phone);
};

/**
 * Validate required field
 * @param {string} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
};

/**
 * Validate form fields and return errors object
 * @param {object} fields - { fieldName: value }
 * @param {object} rules - { fieldName: [{ validate: fn, message: string }] }
 * @returns {object} errors - { fieldName: errorMessage }
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  for (const [field, validators] of Object.entries(rules)) {
    for (const { validate, message } of validators) {
      if (!validate(fields[field])) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
};
