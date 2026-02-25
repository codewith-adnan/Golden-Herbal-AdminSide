import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusDropdownProps {
    currentStatus: string;
    onStatusChange: (newStatus: string) => void;
    disabled?: boolean;
}

const statusOptions = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PLACED': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        case 'CONFIRMED': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
        case 'SHIPPED': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        case 'DELIVERED': return 'text-green-500 bg-green-500/10 border-green-500/20';
        case 'CANCELLED': return 'text-red-500 bg-red-500/10 border-red-500/20';
        default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
};

const StatusDropdown: React.FC<StatusDropdownProps> = ({ currentStatus, onStatusChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    !disabled && setIsOpen(!isOpen);
                }}
                disabled={disabled}
                className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all duration-300 min-w-[120px] cursor-pointer ${getStatusColor(currentStatus)} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-95'}`}
            >
                <span className="text-[#d4af37] truncate">{currentStatus}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={14} className="text-[#d4af37] shrink-0" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[60]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 3, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute left-0 top-full z-[70] mt-1 w-40 bg-[#161616] border border-[#d4af37]/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.1)] overflow-hidden backdrop-blur-xl"
                        >
                            <div className="py-1">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStatusChange(option);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-[11px] transition-all duration-200 flex items-center justify-between cursor-pointer hover:bg-[#d4af37]/10 ${currentStatus === option ? 'text-[#d4af37] bg-[#d4af37]/5 font-bold' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {option}
                                        {currentStatus === option && (
                                            <div className="w-1 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StatusDropdown;
