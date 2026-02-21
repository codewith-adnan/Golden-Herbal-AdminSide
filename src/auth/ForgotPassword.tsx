import React, { useState } from "react";
import { useAuth } from "./UseAuth";
import { Mail, Loader2, KeyRound, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { forgotPassword, loading, error } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            localStorage.setItem("pendingEmail", email);
            localStorage.setItem("authContext", "reset");
            navigate("/verify-otp");
        } catch (err) {
            console.error("Forgot password initiation failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="p-8 text-center bg-gradient-to-b from-[#d4af37]/10 to-transparent border-b border-[#d4af37]/10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4af37]/10 rounded-2xl mb-4 border border-[#d4af37]/20">
                            <KeyRound className="w-8 h-8 text-[#d4af37]" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-2">Reset <span className="text-[#d4af37]">Access</span></h1>
                        <p className="text-gray-500 text-sm italic uppercase tracking-widest text-[10px] font-bold">Initiate Password Recovery</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <p className="text-gray-400 text-xs leading-relaxed text-center">
                                Enter your administrator email address. We will send you a verification code to reset your password.
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center border-l-4 border-l-red-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Admin Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@goldleaf.com"
                                    className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-[#d4af37]/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full py-4 bg-[#d4af37] text-black font-extrabold rounded-2xl hover:bg-[#aa8930] transition-all flex items-center justify-center gap-2 group mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>SEND CODE <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#d4af37] transition-colors uppercase tracking-widest font-bold"
                            >
                                <ArrowLeft size={14} /> Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
