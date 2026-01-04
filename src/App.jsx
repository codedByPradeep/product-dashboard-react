import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { ProductList } from './components/ProductList';
import { SearchBar } from './components/SearchBar';
import { ProductForm } from './components/ProductForm';
import { Pagination } from './components/Pagination';
import { initialProducts } from './data/mockProducts';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const itemsPerPage = 8;

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSave = (productData) => {
    if (productData.id) {
      // Update existing
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      // Create new
      const newProduct = {
        ...productData,
        id: Date.now(),
        // Add default mock image or similar if we had images, but we don't
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container app-container">
      <header className="app-header">
        <h1>Product Management</h1>
        <button className="btn btn-primary" onClick={handleOpenNew}>
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </header>

      <div className="toolbar">
        <SearchBar onSearch={setSearchQuery} />

        <div className="view-toggle">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            aria-label="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-label="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <ProductList
        products={paginatedProducts}
        viewMode={viewMode}
        onEdit={handleEdit}
      />

      <Pagination
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
