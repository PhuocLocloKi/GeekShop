/**
 * Format a number as Vietnamese Dong currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string like "920,097₫"
 */
export const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return '0₫';
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + '₫';
};

/**
 * Format price with decimal support
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  if (amount == null || isNaN(amount)) return '0₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};
