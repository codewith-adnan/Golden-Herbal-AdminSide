import { useState } from "react";
import { AUTH_APIS } from "../libs/api/auth.api";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const login = async (credentials: any) => {
        try {
            setLoading(true);
            setError(null);
            const data = await AUTH_APIS.login(credentials);
            setUser(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (body: any) => {
        try {
            setLoading(true);
            setError(null);
            const data = await AUTH_APIS.verifyOtp(body);
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "OTP verification failed.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await AUTH_APIS.resendOtp({ email });
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to resend OTP.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await AUTH_APIS.forgotPassword({ email });
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to initiate password reset.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (body: any) => {
        try {
            setLoading(true);
            setError(null);
            const data = await AUTH_APIS.resetPassword(body);
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to reset password.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return {
        login,
        verifyOtp,
        resendOtp,
        forgotPassword,
        resetPassword,
        logout,
        user,
        loading,
        error
    };
};
