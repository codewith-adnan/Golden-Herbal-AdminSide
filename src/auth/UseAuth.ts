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

            // Fixed credential check
            const FIXED_EMAIL = "goldleafadmin@yopmail.com";
            const FIXED_PASSWORD = "admin123";

            if (credentials.email === FIXED_EMAIL && credentials.password === FIXED_PASSWORD) {
                const data = await AUTH_APIS.login(credentials);
                setUser(data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
                localStorage.setItem("isAdminLoggedIn", "true");
                return data;
            } else {
                const errorMsg = "Invalid email or password";
                setError(errorMsg);
                throw new Error(errorMsg);
            }
        } catch (err: any) {
            const message = err.message || "Login failed. Please check your credentials.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdminLoggedIn");
    };

    return {
        login,
        logout,
        user,
        loading,
        error
    };
};
