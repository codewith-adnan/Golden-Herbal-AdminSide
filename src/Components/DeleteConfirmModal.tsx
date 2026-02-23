"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }: DeleteConfirmModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm p-8 bg-[#0a0a0a] rounded-[40px] border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
                    >
                        {/* Top Decorative Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 cursor-pointer p-2 text-gray-500 hover:text-[#d4af37] hover:bg-white/5 rounded-xl transition-all"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Warning Icon Container */}
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                <AlertTriangle className="text-red-500" size={32} />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-serif font-bold text-[#d4af37] mb-3 tracking-tight">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-8 px-2">
                                Are you sure you want to remove <span className="text-white font-bold">"{itemName || "this item"}"</span>? This action is irreversible.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-row gap-3 w-full">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-white/5 cursor-pointer border border-[#d4af37]/20 text-[#d4af37] font-black rounded-xl hover:bg-white/10 transition-all active:scale-95 text-[10px] uppercase tracking-[0.1em]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="flex-1 py-3 cursor-pointer bg-gradient-to-r from-red-600 to-red-800 text-white font-black rounded-xl hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-[0.1em]"
                                >
                                    Delete Permanently
                                </button>
                            </div>
                        </div>

                        {/* Decorative Leaf Subtlety */}
                        <div className="absolute -bottom-4 -right-4 p-4 opacity-5 pointer-events-none transform rotate-12">
                            <AlertTriangle size={80} className="text-[#d4af37]" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default DeleteConfirmModal;
