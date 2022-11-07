import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todoListAPI";



const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true
})


export const authAPI = {
    login(data: authDataRequestType) {
        return instance.post<authDataRequestType, AxiosResponse<ResponseType<{ userId: number }>>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me')
    },
    logOut(userId: number) {
        return axios.delete<ResponseType>('/auth/login')
    }
}
///////   auth Types     ///////
export type authDataRequestType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}