import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

export function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                className="input-field search-input"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
            />
        </div>
    );
}
