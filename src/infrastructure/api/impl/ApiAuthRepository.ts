import UserEntity from "../../../domain/entities/UserEntity";
import IAuthRepository from "../../../domain/repositories/IAuthRepository";

import api from "../api";

export default class ApiAuthRepository implements IAuthRepository {

    public async login(email: string, password: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {

            api.post("/auth/login", {
                email: email,
                password: password
            }).then((response) => {

                const data = response.data;

                const userEntity = new UserEntity(
                    data.user.id ? data.user.id : "",
                    data.user.firstName ? data.user.firstName : "",
                    data.user.lastName ? data.user.lastName : "",
                    data.user.email ? data.user.email : ""
                );
                
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("token_type", data.token_type);
                localStorage.setItem("expires_in", data.expires_in);
                localStorage.setItem("logged_in", new Date().toString());

                resolve(userEntity);

            }).catch((error) => { reject(error); });
        });
    }

    public async signup(email: string, password: string, firstName: string, lastName: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {

            api.post("/auth/users", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }).then((response) => {

                const data = response.data;

                const userEntity = new UserEntity(
                    data.user.id ? data.user.id : "",
                    data.user.firstName ? data.user.firstName : "",
                    data.user.lastName ? data.user.lastName : "",
                    data.user.email ? data.user.email : ""
                );

                localStorage.setItem("token", data.access_token);
                localStorage.setItem("token_type", data.token_type);
                localStorage.setItem("expires_in", data.expires_in);
                localStorage.setItem("logged_in", new Date().toString());

                resolve(userEntity);

            }).catch((error) => {  reject(error); });
        });
    }

    public async getCurrentUser(): Promise<UserEntity> {
        return new Promise((resolve, reject) => {

            api.get("/auth/me", {
                headers: {
                    Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("token")
                }
            }).then((response) => {
                
                const data = response.data;

                const userEntity = new UserEntity(
                    data.id ? data.id : "",
                    data.firstName ? data.firstName : "",
                    data.lastName ? data.lastName : "",
                    data.email ? data.email : ""
                );

                resolve(userEntity);

            }).catch((error) => { reject(error); });
        });
    }

    public async updateCurrentUser(user: UserEntity): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            resolve(new UserEntity("", "", "", ""));
        });
    }

    public async logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            api.post("/auth/logout", {}, {
                headers: {
                    Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("token")
                }
            }).then((response) => {

                localStorage.removeItem("token");
                localStorage.removeItem("token_type");
                localStorage.removeItem("expires_in");
                localStorage.removeItem("logged_in");

                resolve(true);

            }).catch((error) => { reject(error); });
        });
    }




}

