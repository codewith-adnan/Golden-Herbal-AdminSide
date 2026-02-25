"use client";

import { toast } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import { X, CheckCircle2, XCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface CustomToastProps {
    t: Toast;
    message: string;
    type?: 'success' | 'error' | 'info';
}

const CustomToast = ({ t, message, type = "success" }: CustomToastProps) => {
    const getTheme = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle2 className="text-[#d4af37]" size={20} />,
                    border: 'border-[#d4af37]/30',
                    bg: 'bg-[#0a0a0a]',
                    progress: 'bg-[#d4af37]'
                };
            case 'error':
                return {
                    icon: <XCircle className="text-red-500" size={20} />,
                    border: 'border-red-500/30',
                    bg: 'bg-[#0a0a0a]',
                    progress: 'bg-red-500'
                };
            default:
                return {
                    icon: <Info className="text-blue-400" size={20} />,
                    border: 'border-blue-400/30',
                    bg: 'bg-[#0a0a0a]',
                    progress: 'bg-blue-400'
                };
        }
    };

    const theme = getTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`w-full max-w-xs ${theme.bg} ${theme.border} border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto`}
        >
            <div className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                    {theme.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white line-clamp-2">
                        {message}
                    </p>
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="flex-shrink-0 p-1 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/5">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className={`h-full ${theme.progress}`}
                />
            </div>
        </motion.div>
    );
};

export const showToast = (message: string, type: 'success' | 'error' | 'info' = "success") => {
    toast.custom((t) => <CustomToast t={t} message={message} type={type} />, {
        duration: 3000,
        position: "top-right",
    });
};

export default CustomToast;
