import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { authMeAPI } from "../API/authme-api";
import { loginFormDataType } from "../types/types";
import { appStateType, AppThunkType, InferActionTypes } from "./store";

//initial state + types
const initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captcha: null as string | null,
	form: {
		errors: null as Array<string> | null,
	}
}
type initialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>

//action types
const SET_DATA = 'authMeReducer/SET_DATA';
const SET_CAPTCHA_SUCCESS = 'authMeReducer/SET_CAPTCHA_SUCCESS';
const SET_FORM_ERRORS = 'authMeReducer/SET_FORM_ERRORS';

//reducer
const authMeReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
		case SET_FORM_ERRORS:
			return {
				...state,
				form: {
					...state.form,
					errors: action.errors,
				}
			}
		default:
			return state;
	}
}
export default authMeReducer;

//action creators

type setDataSuccesData = {
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean,
}

export const actions = {
	setCaptchaSuccess: (captcha: string) => {
		return {
			type: SET_CAPTCHA_SUCCESS,
			captcha,
		} as const
	},
	setDataSucces: (data: setDataSuccesData) => {
		return {
			type: SET_DATA,
			data,
		} as const
	},
	setFormErrors: (errors: null | Array<string>) => {
		return {
			type: SET_FORM_ERRORS,
			errors,
		} as const
	}
}

//thunk creators

export const setCaptcha = (): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await authMeAPI.getCaptchaUrl();
		console.log(data);
		const captcha = data.url;
		dispatch(actions.setCaptchaSuccess(captcha));
	}

export const setData = (): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await authMeAPI.getMe();
		if (data.resultCode == 0) {
			dispatch(actions.setDataSucces({ ...data.data, isAuth: true }));
		}
	}

export const login = ({ email, password, captcha }: loginFormDataType): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await authMeAPI.login({ email, password, captcha });

		if (data.resultCode == 0) {
			dispatch(setData())
			dispatch(actions.setFormErrors(null))
		} else {
			dispatch(actions.setFormErrors(data.messages))
			if (data.resultCode == 10) {
				dispatch(setCaptcha())
			}
		}
	}

export const logout = (): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await authMeAPI.logout();
		if (data.resultCode == 0) {
			dispatch(actions.setDataSucces({
				id: null,
				email: null,
				login: null,
				isAuth: false,
			}));
		}
	}