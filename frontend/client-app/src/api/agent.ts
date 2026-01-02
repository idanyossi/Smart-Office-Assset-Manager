import axios, { type AxiosResponse } from "axios";

export interface UserCredentials {
    username: string;
    password?: string;
    role?: string;     
}

export interface UserResponse {
    username: string;
    token: string;
}

axios.defaults.baseURL = 'https://localhost:7061/api';

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
};

const Account = {
    login: (user: UserCredentials) => requests.post<UserResponse>('/auth/login', user),
    register: (user: UserCredentials) => requests.post<UserResponse>('/auth/register', user),
}

const agent ={
    Account
}

export default agent;

