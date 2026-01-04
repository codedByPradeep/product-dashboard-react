import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            <div className="pagination-summary">
                Showing <span className="highlight">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to <span className="highlight">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="highlight">{totalItems}</span> results
            </div>

            <div className="pagination-controls">
                <button
                    className="btn-icon page-control"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="page-numbers">
                    {pages.map(page => (
                        <button
                            key={page}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className="btn-icon page-control"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
