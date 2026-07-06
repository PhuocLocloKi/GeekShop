const db = require('../config/db');

const productModel = {
  getAll: async (filters = {}) => {
    let query = `
      SELECT p.*, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.category) {
      query += ' AND c.name = ?';
      params.push(filters.category);
    }

    if (filters.minPrice !== undefined) {
      query += ' AND p.price >= ?';
      params.push(Number(filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      query += ' AND p.price <= ?';
      params.push(Number(filters.maxPrice));
    }

    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      const term = `%${filters.search}%`;
      params.push(term, term);
    }

    // Sort configurations
    if (filters.sort === 'price_asc') {
      query += ' ORDER BY p.price ASC';
    } else if (filters.sort === 'price_desc') {
      query += ' ORDER BY p.price DESC';
    } else if (filters.sort === 'name_asc') {
      query += ' ORDER BY p.name ASC';
    } else if (filters.sort === 'name_desc') {
      query += ' ORDER BY p.name DESC';
    } else if (filters.sort === 'rating_desc') {
      query += ' ORDER BY p.rating_avg DESC';
    } else {
      query += ' ORDER BY p.id DESC';
    }

    const [rows] = await db.query(query, params);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  },

  create: async ({ name, description, price, imageUrl, categoryId, stock, specs }) => {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, image_url, category_id, stock, specs) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, imageUrl, categoryId, stock, JSON.stringify(specs)]
    );
    return result.insertId;
  },

  update: async (id, { name, description, price, imageUrl, categoryId, stock, specs }) => {
    let query = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, specs = ?';
    const params = [name, description, price, categoryId, stock, JSON.stringify(specs)];

    if (imageUrl) {
      query += ', image_url = ?';
      params.push(imageUrl);
    }

    query += ' WHERE id = ?';
    params.push(id);

    await db.query(query, params);
    return true;
  },

  delete: async (id) => {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  },

  updateRating: async (productId) => {
    // Re-calculate average ratings when feedback is submitted
    await db.query(
      `UPDATE products p 
       SET p.rating_avg = (
         SELECT COALESCE(AVG(rating), 0) 
         FROM reviews 
         WHERE product_id = ?
       ) 
       WHERE p.id = ?`,
      [productId, productId]
    );
  },
};

module.exports = productModel;
