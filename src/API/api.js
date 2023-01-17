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
		return instance.get('auth/me').then(response => response.data);
	}
}

export const profileAPI = {
	getProfile(id) {
		return instance.get(`profile/${id}`).then(response => response.data);
	},
	setProfile(profile) {
		return instance.put(`/profile`, profile).then(response => response.data);
	},
	getStatus(id) {
		return instance.get(`/profile/status/${id}`);
	},
	setStatus(status) {
		return instance.put(`/profile/status`, { status }).then(response => response.data);
	},
	setPhoto(photo) {
		let formData = new FormData();
		formData.append('image', photo);

		return instance.put(`/profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => response.data)
	}
}