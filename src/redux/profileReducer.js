import { profileAPI } from "../API/api";

const initialState = {
	profile: null,
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