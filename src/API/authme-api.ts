import { loginFormDataType } from "../types/types"
import { instance, ResponseDataType } from "./api"

type DataGetMyType = {
	id: number
	email: string
	login: string
}
type DataLoginType = {
	userId: number
}
type ResponseGetCaptchaUrl = {
	url: string
}

export const authMeAPI = {
	getMe() {
		return instance.get<ResponseDataType<DataGetMyType>>('auth/me').then(response => response.data);
	},
	login({ email, password, captcha }: loginFormDataType) {
		return instance.post<ResponseDataType<DataLoginType>>('/auth/login', {
			email,
			password,
			rememberMe: true,
			captcha,
		}).then(response => response.data);
	},
	logout() {
		return instance.delete<ResponseDataType>('/auth/login').then(response => response.data);
	},
	getCaptchaUrl() {
		return instance.get<ResponseGetCaptchaUrl>('/security/get-captcha-url').then(response => response.data);
	}
}