import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ProductForm.css';

export function ProductForm({ onSubmit, onCancel, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                stock: initialData.stock || 0 // ensure stock has a value
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (formData.stock !== '' && (isNaN(formData.stock) || Number(formData.stock) < 0)) newErrors.stock = 'Stock cannot be negative';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                id: initialData?.id, // Preserve ID if editing
                price: Number(formData.price),
                stock: Number(formData.stock || 0)
            });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-fade-in">
                <div className="modal-header">
                    <h2 className="modal-title">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onCancel} className="btn-icon" aria-label="Close">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label className="label" htmlFor="name">Name <span className="required">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`input-field ${errors.name ? 'input-error' : ''}`}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Wireless Headphones"
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="label" htmlFor="price">Price ($) <span className="required">*</span></label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="0.01"
                                className={`input-field ${errors.price ? 'input-error' : ''}`}
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="category">Category <span className="required">*</span></label>
                            <select
                                id="category"
                                name="category"
                                className={`input-field ${errors.category ? 'input-error' : ''}`}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home">Home</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && <span className="error-text">{errors.category}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            className={`input-field ${errors.stock ? 'input-error' : ''}`}
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                        />
                        {errors.stock && <span className="error-text">{errors.stock}</span>}
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="input-field textarea-field"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Product description..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {initialData ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
