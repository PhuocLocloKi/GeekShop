import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/ui/ProductCard';
import CategoryFilter from '../../components/ui/CategoryFilter';
import PriceSlider from '../../components/ui/PriceSlider';
import SearchBar from '../../components/common/SearchBar';
import productsData from '../../data/products.json';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import api from '../../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);

  // Filter and Sorting states
  const [category, setCategory] = useState(searchParams.get('category') || null);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name_asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category state with search query param
  useEffect(() => {
    const catParam = searchParams.get('category');
    setCategory(catParam);
  }, [searchParams]);

  // Fetch or filter products
  useEffect(() => {
    setLoading(true);
    // Connect to backend API with filter parameters
    api.get('/products', {
      params: {
        category: category || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        search: searchQuery || undefined,
        sort: sortOption,
      }
    })
    .then((res) => {
      setProducts(res.data);
      setLoading(false);
    })
    .catch(() => {
      // Fallback offline filter if server not running yet
      let temp = [...productsData];

      if (category) {
        temp = temp.filter((p) => p.category === category);
      }

      temp = temp.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      if (searchQuery) {
        temp = temp.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      // Sort logic
      if (sortOption === 'price_asc') {
        temp.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price_desc') {
        temp.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'name_asc') {
        temp.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === 'name_desc') {
        temp.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortOption === 'rating_desc') {
        temp.sort((a, b) => b.rating_avg - a.rating_avg);
      }

      setProducts(temp);
      setLoading(false);
    });
  }, [category, priceRange, searchQuery, sortOption]);

  const handleSelectCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        {/* Page title and search bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div>
            <h2 style={{ textTransform: 'uppercase' }}>HARDWARE_INVENTORY</h2>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              COUNT: {products.length} OBJECTS LOADED
            </p>
          </div>

          <SearchBar onSearch={setSearchQuery} placeholder="Search modules..." />
        </div>

        {/* Layout Grid */}
        <div style={{ display: 'flex', gap: 'var(--space-2xl)', position: 'relative' }}>
          {/* LEFT COLUMN: Sidebar Filters (Desktop) */}
          <div
            className="hide-tablet"
            style={{
              width: '280px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xl)',
            }}
          >
            <CategoryFilter selectedCategory={category} onSelectCategory={handleSelectCategory} />
            <PriceSlider priceRange={priceRange} onChange={setPriceRange} />
          </div>

          {/* RIGHT COLUMN: Products Grid & Topbar Controls */}
          <div style={{ flexGrow: 1 }}>
            {/* Topbar Controls */}
            <div
              className="glass-card-static"
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                marginBottom: 'var(--space-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* Mobile filter toggle */}
              <button
                className="show-tablet"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                style={{
                  display: 'none', // Overridden in media query
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  fontFamily: 'var(--font-code)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--neon-cyan)',
                  cursor: 'pointer',
                }}
              >
                <SlidersHorizontal size={14} />
                <span>FILTERS</span>
              </button>

              {/* Sorting */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginLeft: 'auto' }}>
                <ArrowUpDown size={14} style={{ color: 'var(--text-muted)' }} />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="cyber-input cyber-select"
                  style={{ padding: '4px 28px 4px 12px', fontSize: 'var(--text-xs)', width: '160px' }}
                >
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="price_asc">Price Low→High</option>
                  <option value="price_desc">Price High→Low</option>
                  <option value="rating_desc">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {showMobileFilters && (
              <div
                className="glass-card-static show-tablet"
                style={{
                  padding: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                }}
              >
                <CategoryFilter selectedCategory={category} onSelectCategory={handleSelectCategory} />
                <PriceSlider priceRange={priceRange} onChange={setPriceRange} />
                <button
                  className="cyber-btn cyber-btn-secondary cyber-btn-sm"
                  onClick={() => setShowMobileFilters(false)}
                >
                  CLOSE_FILTERS
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-lg)' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass-card-static" style={{ height: '320px', padding: '16px' }}>
                    <div className="skeleton skeleton-image" style={{ height: '180px', marginBottom: '16px' }} />
                    <div className="skeleton skeleton-title" style={{ height: '20px', marginBottom: '10px' }} />
                    <div className="skeleton skeleton-text" style={{ height: '14px', width: '40%' }} />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div
                className="glass-card-static flex-center"
                style={{
                  padding: 'var(--space-3xl)',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                  border: '1px dashed var(--glass-border)',
                }}
              >
                <span style={{ fontSize: '32px' }}>📁</span>
                <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  NO_ITEMS_MATCH_CURRENT_FILTER
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: 'var(--space-lg)',
                }}
              >
                {products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
