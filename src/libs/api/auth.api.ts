import { postMethod } from "../../utils/http-methods";

export const AUTH_ENDPOINTS = {
    LOGIN: "/gold/auth/login",
    VERIFY_OTP: "/gold/auth/verify-otp",
    RESEND_OTP: "/gold/auth/resend-otp",
    RESET_PASSWORD: "/gold/auth/reset-password",
    UPDATE_PASSWORD: "/gold/auth/update-password",
    FORGOT_PASSWORD: "/gold/auth/resend-otp", // Using resend-otp for forgot password initiation as per typical flow or custom requirement
};

export const AUTH_APIS = {
    login: (body: any) => postMethod<any>(AUTH_ENDPOINTS.LOGIN, body),
    verifyOtp: (body: any) => postMethod<any>(AUTH_ENDPOINTS.VERIFY_OTP, body),
    resendOtp: (body: any) => postMethod<any>(AUTH_ENDPOINTS.RESEND_OTP, body),
    resetPassword: (body: any) => postMethod<any>(AUTH_ENDPOINTS.RESET_PASSWORD, body),
    updatePassword: (body: any) => postMethod<any>(AUTH_ENDPOINTS.UPDATE_PASSWORD, body),
    forgotPassword: (body: any) => postMethod<any>(AUTH_ENDPOINTS.FORGOT_PASSWORD, body),
};
