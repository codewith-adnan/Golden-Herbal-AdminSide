import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const categories = ["Green Tea", "Herbal Infusion", "Black Tea", "Wellness Blend"];

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-xl text-white text-sm transition-all duration-300 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#d4af37]/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] focus:border-[#d4af37]'}`}
            >
                <span className={value ? "text-white" : "text-gray-500"}>
                    {value || "Select Category"}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={18} className="text-[#d4af37]" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[60]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 right-0 top-full z-[70] mt-2 bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.05)] overflow-hidden backdrop-blur-2xl"
                        >
                            <div className="py-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => {
                                            onChange(category);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-200 flex items-center justify-between cursor-pointer hover:bg-[#d4af37]/10 ${value === category ? 'text-[#d4af37] bg-[#d4af37]/5 font-bold' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {category}
                                        {value === category && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
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

export default CategoryDropdown;
