import { data } from "autoprefixer";
import { authMeAPI } from "../API/api";

const initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	captcha: null,
}

const SET_DATA = 'authMeReducer/SET_DATA';
const SET_CAPTCHA_SUCCESS = 'authMeReducer/SET_CAPTCHA_SUCCESS';

const authMeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATA:
			return {
				...state,
				...action.data,
			}
		case SET_CAPTCHA_SUCCESS:
			return {
				...state,
				captcha: action.captcha,
			}
		default:
			return state;
	}
}
export default authMeReducer;

export const setCaptchaSuccess = (captcha) => {
	return {
		type: SET_CAPTCHA_SUCCESS,
		captcha,
	}
}

export const setCaptcha = () => async (dispatch) => {
	const data = await authMeAPI.getCaptchaUrl();
	console.log(data);
	const captcha = data.url;
	dispatch(setCaptchaSuccess(captcha));
}

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

export const login = ({ email, password, captcha }) => async (dispatch) => {
	const data = await authMeAPI.login({ email, password, captcha });

	if (data.resultCode == 0) {
		dispatch(setData());
	} else if (data.resultCode == 10) {
		dispatch(setCaptcha());
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