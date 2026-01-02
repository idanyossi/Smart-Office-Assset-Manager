import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import type { UserCredentials } from "../api/agent";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    role: string;
    unique_name: string;
    nameid: string;
}

export default class UserStore{
    user: string | null = window.localStorage.getItem('username');
    token: string | null = window.localStorage.getItem('jwt');
    role: string | null = window.localStorage.getItem('userRole');

    constructor(){
        makeAutoObservable(this);
    }

    login = async (creds: UserCredentials) =>{
        const UserResponse = await agent.Account.login(creds);
        const decodedToken : JwtPayload = jwtDecode(UserResponse.token);
        runInAction(()=>{
            this.user = UserResponse.username;
            this.token = UserResponse.token;
            this.role = decodedToken.role;
        });
        window.localStorage.setItem('username', UserResponse.username);
        window.localStorage.setItem('jwt', UserResponse.token);
        window.localStorage.setItem('userRole', decodedToken.role);
    }

    register = async (creds: UserCredentials) =>{
        await agent.Account.register(creds);
    }

    logout = () => {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('userRole');
        this.token = null;
        this.user = null;
        this.role = null;
    }
}