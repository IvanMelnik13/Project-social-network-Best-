import { authMeAPI } from "../API/api";

const initialState = {
	id: null,
	email: null,
	login: null,
}

const SET_DATA = 'authMeReducer/SET_DATA';

const authMeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATA:
			return {
				...state,
				...action.data,
			}
		default:
			return state;
	}
}
export default authMeReducer;

export const setDataSucces = (data) => {
	return {
		type: SET_DATA,
		data,
	}
}

export const setData = () => async (dispatch) => {
	const data = await authMeAPI.getMe();
	if (data.resultCode == 0) {
		dispatch(setDataSucces(data.data));
	}
}