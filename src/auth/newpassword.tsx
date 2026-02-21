import React, { useState } from "react";
import { useAuth } from "./UseAuth";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { resetPassword, loading, error } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await resetPassword({
                email: localStorage.getItem("pendingEmail"),
                newPassword: password
            });
            localStorage.removeItem("authContext");
            localStorage.removeItem("pendingEmail");
            navigate("/login");
        } catch (err) {
            console.error("Password reset failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="p-8 text-center bg-gradient-to-b from-[#d4af37]/10 to-transparent border-b border-[#d4af37]/10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4af37]/10 rounded-2xl mb-4 border border-[#d4af37]/20">
                            <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-2">New <span className="text-[#d4af37]">Credentials</span></h1>
                        <p className="text-gray-500 text-sm italic uppercase tracking-widest text-[10px] font-bold">Secure Your Account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">New Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="block w-full pl-12 pr-12 py-4 bg-black/40 border border-[#d4af37]/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#d4af37]"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="block w-full pl-12 pr-12 py-4 bg-black/40 border border-[#d4af37]/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password || password !== confirmPassword}
                            className="w-full py-4 bg-[#d4af37] text-black font-extrabold rounded-2xl hover:bg-[#aa8930] transition-all flex items-center justify-center gap-2 group mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>UPDATE PASSWORD <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
