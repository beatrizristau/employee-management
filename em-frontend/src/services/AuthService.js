import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/auth";

export const register = (user) => axios.post(
    REST_API_BASE_URL + "/register",
    user,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const login = (user) => axios.post(
    REST_API_BASE_URL + "/login",
    user,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => {
    // local storage does not have expiration time
    return localStorage
        .getItem("token");
};

export const saveLoggedInUser = (username, role) => {
    // session storage has expiration time
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username !== null;
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    return role != null && role === "ROLE_ADMIN";
}