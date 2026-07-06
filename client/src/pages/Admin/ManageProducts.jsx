import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Sidebar from '../../components/layout/Sidebar';
import productsData from '../../data/products.json';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { showSuccess, showError, showInfo } from '../../components/common/Toast';
import productService from '../../services/productService';
import api from '../../services/api';
import { Edit, Trash, Plus, Search } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'OS & Recovery',
    stock: '',
    specs: '',
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    api.get('/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Offline backup
        setProducts(productsData);
        setLoading(false);
      });
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      description: '',
      price: '',
      category: 'OS & Recovery',
      stock: '',
      specs: '{}',
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: prod.category || 'OS & Recovery',
      stock: prod.stock,
      specs: JSON.stringify(prod.specs || {}),
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const parsedSpecs = JSON.parse(form.specs || '{}');
      const payload = {
        ...form,
        specs: parsedSpecs,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
        showSuccess('Product attributes edited.');
      } else {
        await productService.create(payload);
        showSuccess('New product created.');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      showError(err.response?.data?.message || 'Form compilation parsing error.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('WARNING: Confirm deletion of items?')) return;
    try {
      await productService.delete(id);
      showSuccess('Product removed from database.');
      fetchProducts();
    } catch (err) {
      showError('Failed to delete item.');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper style={{ flexDirection: 'row' }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h2 style={{ textTransform: 'uppercase' }}>PRODUCT_CRUD_CONTROL</h2>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              DATABASE_INVENTORY_MANAGEMENT
            </p>
          </div>

          <Button onClick={handleOpenAddModal} variant="primary" size="sm">
            <Plus size={14} />
            <span>ADD_PRODUCT</span>
          </Button>
        </div>

        {/* Search bar */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cyber-input"
            style={{ maxWidth: '300px' }}
          />
        </div>

        {/* Product Table */}
        <div className="glass-card-static responsive-table" style={{ border: '1px solid var(--glass-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>NAME</th>
                <th style={{ padding: '12px' }}>CATEGORY</th>
                <th style={{ padding: '12px' }}>PRICE</th>
                <th style={{ padding: '12px' }}>STOCK</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px dotted rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', color: 'var(--neon-cyan)' }}>#{p.id}</td>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{p.category}</td>
                  <td style={{ padding: '12px', color: 'var(--neon-green)' }}>{formatCurrency(p.price)}</td>
                  <td style={{ padding: '12px', color: p.stock <= 0 ? 'var(--neon-pink)' : 'var(--text-primary)' }}>{p.stock} units</td>
                  <td style={{ padding: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => handleOpenEditModal(p)} style={{ color: 'var(--neon-cyan)', cursor: 'pointer' }}><Edit size={14} /></button>
                    <button onClick={() => handleDeleteProduct(p.id)} style={{ color: 'var(--neon-pink)', cursor: 'pointer' }}><Trash size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? 'EDIT_PRODUCT_SCHEMATICS' : 'INITIATE_NEW_PRODUCT'}
          size="md"
        >
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">PRODUCT_NAME</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="cyber-input"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">DESCRIPTION</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                className="cyber-input cyber-textarea"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">PRICE (VND)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="cyber-input"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">STOCK_UNITS</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  required
                  className="cyber-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="cyber-input cyber-select"
              >
                <option value="OS & Recovery">OS & Recovery</option>
                <option value="Networking">Networking</option>
                <option value="Cables & Accessories">Cables & Accessories</option>
                <option value="Development Boards">Development Boards</option>
                <option value="Displays & Modules">Displays & Modules</option>
                <option value="GPS & Navigation">GPS & Navigation</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">SPECIFICATIONS (JSON_STRING)</label>
              <textarea
                value={form.specs}
                onChange={(e) => setForm({ ...form, specs: e.target.value })}
                placeholder='{"Key": "Value"}'
                className="cyber-input cyber-textarea"
                style={{ height: '80px' }}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">UPLOAD_PRODUCT_IMAGE</label>
              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="cyber-input"
                accept="image/*"
              />
            </div>

            <Button type="submit" variant="primary" size="md" loading={submitting}>
              [ SAVE_CHANGES ]
            </Button>
          </form>
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default ManageProducts;
