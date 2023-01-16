import { profileAPI } from "../API/api";

const initialState = {
	profile: null,
	data: null,
}

const SET_PROFILE_SUCCES = "profileReducer/SET_PROFILE_SUCCES";

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE_SUCCES:
			return {
				...state,
				profile: action.profile,
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