import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import type { UserCredentials } from "../api/agent";

export default class UserStrore{
    user: string | null = null;
    token: string | null = window.localStorage.getItem('jwt');

    constructor(){
        makeAutoObservable(this);
    }

    login = async (creds: UserCredentials) =>{
        const UserResponse = await agent.Account.login(creds);
        runInAction(()=>{
            this.user = UserResponse.username;
            this.token = UserResponse.token;
        });
        window.localStorage.setItem('jwt', UserResponse.token);
    }

    register = async (creds: UserCredentials) =>{
        await agent.Account.register(creds);
    }

    logout = () => {
        window.localStorage.removeItem('jwt');
        this.token = null;
        this.user = null;
    }
}