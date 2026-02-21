import { postMethod } from "../../utils/http-methods";

export const AUTH_ENDPOINTS = {
    LOGIN: "/gold/auth/login",
};

export const AUTH_APIS = {
    login: (body: any) => postMethod<any>(AUTH_ENDPOINTS.LOGIN, body),

};
