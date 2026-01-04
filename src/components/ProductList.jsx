import React from 'react';
import { Edit2, Package, Tag } from 'lucide-react';
import './ProductList.css';

export function ProductList({ products, viewMode, onEdit }) {
    if (!products || products.length === 0) {
        return (
            <div className="no-results animate-fade-in">
                <Package size={48} strokeWidth={1} />
                <p>No products found</p>
            </div>
        );
    }

    if (viewMode === 'grid') {
        return (
            <div className="product-grid animate-fade-in">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onEdit={onEdit} />
                ))}
            </div>
        );
    }

    return (
        <div className="product-table-container animate-fade-in">
            <table className="product-table">
                <thead>
                    <tr>
                        <th className="th-name">Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th className="th-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductRow key={product.id} product={product} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProductCard({ product, onEdit }) {
    return (
        <div className="card product-card">
            <div className="card-header">
                <span className="badge-category">{product.category}</span>
                <button
                    onClick={() => onEdit(product)}
                    className="btn-icon card-action"
                    aria-label="Edit product"
                >
                    <Edit2 size={18} />
                </button>
            </div>

            <div className="card-body">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description || "No description available."}</p>

                <div className="product-meta">
                    <div className="price-tag">
                        <span className="currency">$</span>
                        <span className="amount">{product.price.toFixed(2)}</span>
                    </div>
                    <div className="stock-info">
                        <span className={`stock-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span>
                        {product.stock} in stock
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductRow({ product, onEdit }) {
    return (
        <tr className="product-row">
            <td className="td-name">
                <div className="name-cell">
                    <div className="name-text">{product.name}</div>
                    <div className="desc-text">{product.description}</div>
                </div>
            </td>
            <td>
                <span className="badge-category">{product.category}</span>
            </td>
            <td className="td-price">${product.price.toFixed(2)}</td>
            <td>
                <div className="stock-cell">
                    <span className={`stock-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span>
                    {product.stock}
                </div>
            </td>
            <td>
                <button
                    onClick={() => onEdit(product)}
                    className="btn-icon"
                    aria-label="Edit"
                >
                    <Edit2 size={18} />
                </button>
            </td>
        </tr>
    );
}
