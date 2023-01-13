import axios from "axios";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		"API-KEY": "8ff12841-2998-4053-ab83-4cdd6c6065dd",
	}
});

export const authMeAPI = {
	getMe() {
		return instance.get(`auth/me`).then(response => response.data);
	}
}