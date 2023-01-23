import { profileFormEditDataType, profilePhotosType, profileType } from "../types/types"
import { instance, ResponseDataType } from "./api"

export type DataSetPhotoType = {
	photos: profilePhotosType
}

export const profileAPI = {
	getProfile(id: number) {
		return instance.get<profileType>(`profile/${id}`).then(response => response.data);
	},
	setProfile(profile: profileFormEditDataType) {
		return instance.put<ResponseDataType>(`/profile`, profile).then(response => response.data);
	},
	getStatus(id: number) {
		return instance.get<string>(`/profile/status/${id}`);
	},
	setStatus(status: string | null) {
		return instance.put<ResponseDataType>(`/profile/status`, { status }).then(response => response.data);
	},
	setPhoto(photo: any) {
		let formData = new FormData();
		formData.append('image', photo);

		return instance.put<ResponseDataType<DataSetPhotoType>>(`/profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => response.data)
	},
}