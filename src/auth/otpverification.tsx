import React, { useState } from "react";
import { useAuth } from "./UseAuth";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
    const { verifyOtp, loading, error } = useAuth();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== "") {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        const context = localStorage.getItem("authContext");

        try {
            await verifyOtp({ email: localStorage.getItem("pendingEmail"), otp: otpValue });

            if (context === "reset") {
                navigate("/reset-password");
            } else {
                localStorage.removeItem("authContext");
                localStorage.removeItem("pendingEmail");
                navigate("/login");
            }
        } catch (err) {
            console.error("Verification failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-[32px] p-8 shadow-2xl">
                    <button
                        onClick={() => navigate("/login")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        <ArrowLeft size={14} /> Back to Login
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#d4af37]/10 rounded-2xl mb-4 border border-[#d4af37]/20">
                            <ShieldCheck className="w-7 h-7 text-[#d4af37]" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-white mb-2">Verify Identity</h1>
                        <p className="text-gray-500 text-sm">Enter the 6-digit code sent to your email.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-14 bg-black/40 border border-[#d4af37]/20 rounded-xl text-center text-xl font-bold text-[#d4af37] focus:outline-none focus:border-[#d4af37] transition-all"
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.some(v => v === "")}
                            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#aa8930] text-black font-bold rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "VERIFY CODE"}
                        </button>

                        <div className="text-center">
                            <button type="button" className="text-xs text-gray-500 hover:text-[#d4af37] uppercase tracking-widest font-bold">
                                Resend verification code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
