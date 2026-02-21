import React, { useState } from "react";
import { useAuth } from "./UseAuth";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { login, loading, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData);
            // Redirect logic would go here, e.g., navigate("/admin/orders")
            window.location.href = "/orders";
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                {/* Main Glassmorphism Box */}
                <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    {/* Header Section */}
                    <div className="p-8 text-center bg-gradient-to-b from-[#d4af37]/10 to-transparent border-b border-[#d4af37]/10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4af37]/10 rounded-2xl mb-4 border border-[#d4af37]/20">
                            <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-2">
                            Golden <span className="text-[#d4af37]">Herbal</span>
                        </h1>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-bold text-[#aa8930] uppercase tracking-[0.2em]">Auth Management</span>
                            <div className="px-3 py-1 bg-white/5 border border-[#d4af37]/20 rounded-full">
                                <span className="text-[10px] text-gray-400 font-medium italic">Admin APIs (JWT required)</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@goldleaf.com"
                                        className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-[#d4af37]/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Secure Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="block w-full pl-12 pr-12 py-4 bg-black/40 border border-[#d4af37]/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#d4af37] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#aa8930] text-black font-bold rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <span>AUTHORIZED LOGIN</span>
                                    <ShieldCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
                                </>
                            )}
                        </button>

                        <div className="flex justify-center pt-2">
                            <Link
                                to="/forgot-password"
                                className="text-[11px] text-gray-500 hover:text-[#d4af37] transition-colors uppercase tracking-widest font-bold"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer Credits */}
                <p className="mt-8 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium">
                    &copy; 2024 Golden Herbal Ltd. &bull; Secure Access Only
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
