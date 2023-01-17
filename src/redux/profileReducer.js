import { profileAPI } from "../API/api";

const initialState = {
	profile: null,
	status: null,
}

const SET_PROFILE_SUCCES = "profileReducer/SET_PROFILE_SUCCES";
const SET_STATUS_SUCCES = "profileReducer/SET_STATUS_SUCCES";
const SET_PHOTO_SUCCES = "profileReducer/SET_PHOTO_SUCCES";

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE_SUCCES:
			return {
				...state,
				profile: action.profile,
			}
		case SET_STATUS_SUCCES:
			return {
				...state,
				status: action.status,
			}
		case SET_PHOTO_SUCCES:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos }
			}
		default:
			return state;
	}
}
export default profileReducer;

export const setProfileSucces = (profile) => {
	return {
		type: SET_PROFILE_SUCCES,
		profile,
	}
}

export const setProfile = (id) => async (dispatch) => {
	const data = await profileAPI.getProfile(id);
	dispatch(setProfileSucces(data));
}

export const saveProfile = (profile, id) => async (dispatch) => {
	const data = await profileAPI.setProfile(profile);
	if (data.resultCode == 0) {
		dispatch(setProfile(id));
	}
	return data;
}

export const setStatusSucces = (status) => {
	return {
		type: SET_STATUS_SUCCES,
		status,
	}
}

export const setStatus = (id) => async (dispatch) => {
	const response = await profileAPI.getStatus(id);
	dispatch(setStatusSucces(response.data));
}

export const saveStatus = (status) => async (dispatch) => {
	const data = await profileAPI.setStatus(status);
	if (data.resultCode == 0) {
		dispatch(setStatusSucces(status));
	}
}

export const setPhotoSucces = (photos) => {
	return {
		type: SET_PHOTO_SUCCES,
		photos,
	}
}

export const savePhoto = (photo) => async (dispatch) => {
	const data = await profileAPI.setPhoto(photo);
	if (data.resultCode == 0) {
		dispatch(setPhotoSucces(data.data.photos));
	}
}