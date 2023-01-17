import { data } from "autoprefixer";
import { authMeAPI } from "../API/api";

const initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
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
		dispatch(setDataSucces({ ...data.data, isAuth: true }));
	}
}

export const login = ({ email, password }) => async (dispatch) => {
	const data = await authMeAPI.login({ email, password });

	if (data.resultCode == 0) {
		dispatch(setData());
	}

	return data;
}

export const logout = () => async (dispatch) => {
	const data = await authMeAPI.logout();
	if (data.resultCode == 0) {
		dispatch(setDataSucces({
			id: null,
			email: null,
			login: null,
			isAuth: false,
		}));
	}
}