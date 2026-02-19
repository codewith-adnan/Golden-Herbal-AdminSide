import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    total: number;
    offset: number;
    limit: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, offset, limit, onPageChange }) => {
    const page = Math.floor(offset / limit);

    return (
        <div className="px-6 py-4 bg-[#111111] border-t border-[#d4af37]/20 flex items-center justify-between">
            <div className="text-sm text-gray-400">
                Showing <span className="text-gray-200 font-medium">{total === 0 ? 0 : offset + 1}</span> to <span className="text-gray-200 font-medium">{Math.min(offset + limit, total)}</span> of <span className="text-gray-200 font-medium">{total}</span> orders
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 0}
                    className="p-2 border border-[#d4af37]/20 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                    onClick={() => offset + limit < total && onPageChange(page + 1)}
                    disabled={offset + limit >= total}
                    className="p-2 border border-[#d4af37]/20 rounded-lg text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
