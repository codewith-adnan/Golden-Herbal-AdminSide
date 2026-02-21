import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    total: number;
    offset: number;
    limit: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, offset, limit, onPageChange }) => {
    const currentPage = Math.floor(offset / limit);
    const totalPages = Math.ceil(total / limit);

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (total === 0) return null;

    return (
        <div className="px-6 py-4 bg-[#111111] border-t border-[#d4af37]/20 flex items-center justify-between">
            <div className="hidden md:block text-sm text-gray-400">
                Showing <span className="text-gray-200 font-medium">{offset + 1}</span> to <span className="text-gray-200 font-medium">{Math.min(offset + limit, total)}</span> of <span className="text-gray-200 font-medium">{total}</span> orders
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="p-2 border border-[#d4af37]/20 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Previous Page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center space-x-1">
                    {getPageNumbers().map((p) => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`min-w-[36px] h-9 px-2 rounded-lg border transition-all text-sm font-medium ${currentPage === p
                                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                                    : 'border-[#d4af37]/10 text-gray-400 hover:border-[#d4af37]/30 hover:text-gray-200 hover:bg-white/5'
                                }`}
                        >
                            {p + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="p-2 border border-[#d4af37]/20 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Next Page"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
