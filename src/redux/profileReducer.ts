import { type } from "os";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../API/profile-api";
import { profileType, profilePhotosType, profileFormEditDataType } from "../types/types";
import { appStateType, AppThunkType, InferActionTypes } from "./store";

const initialState = {
	profile: null as profileType | null,
	status: null as string | null,
	isFetching: false as boolean,
	form: {
		editMode: false as boolean,
		errors: null as null | Array<string>,
	}
}
type initialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>

const SET_PROFILE_SUCCES = "profileReducer/SET_PROFILE_SUCCES"
const SET_STATUS_SUCCES = "profileReducer/SET_STATUS_SUCCES"
const SET_PHOTO_SUCCES = "profileReducer/SET_PHOTO_SUCCES"
const SET_IS_FETCHING = "profileReducer/SET_IS_FETCHING"
const SET_EDIT_MODE = "profileReducer/SET_EDIT_MODE"
const SET_FORM_ERROR = "profileReducer/SET_FORM_ERROR"

const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			}
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
				profile: { ...state.profile, photos: action.photos } as profileType
			}
		case SET_EDIT_MODE:
			return {
				...state,
				form: {
					...state.form,
					editMode: action.editMode,
				}
			}
		case SET_FORM_ERROR: {
			return {
				...state,
				form: {
					...state.form,
					errors: action.errors,
				}
			}
		}
		default:
			return state;
	}
}
export default profileReducer;

export const actions = {
	setIsFetching: (isFetching: boolean) => {
		return {
			type: SET_IS_FETCHING,
			isFetching,
		} as const
	},
	setProfileSucces: (profile: profileType) => {
		return {
			type: SET_PROFILE_SUCCES,
			profile,
		} as const
	},
	setPhotoSucces: (photos: profilePhotosType) => {
		return {
			type: SET_PHOTO_SUCCES,
			photos,
		} as const
	},
	setStatusSucces: (status: string | null) => {
		return {
			type: SET_STATUS_SUCCES,
			status,
		} as const
	},
	setEditMode: (editMode: boolean) => {
		return {
			type: SET_EDIT_MODE,
			editMode,
		} as const
	},
	setFormError: (errors: Array<string> | null) => {
		return {
			type: SET_FORM_ERROR,
			errors,
		} as const
	}
}

export const setProfile = (id: number): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		dispatch(actions.setIsFetching(true));
		const data = await profileAPI.getProfile(id);
		dispatch(actions.setProfileSucces(data));
		dispatch(actions.setIsFetching(false));
	}

export const saveProfile = (profileData: profileFormEditDataType, id: number):
	AppThunkType<ActionsTypes> => async (dispatch) => {
		const data = await profileAPI.setProfile(profileData);
		if (data.resultCode == 0) {
			dispatch(setProfile(id))
			dispatch(actions.setEditMode(false))
			dispatch(actions.setFormError(null))
		} else {
			dispatch(actions.setFormError(data.messages))
		}
	}

export const setStatus = (id: number): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		dispatch(actions.setIsFetching(true))
		const response = await profileAPI.getStatus(id)
		dispatch(actions.setStatusSucces(response.data))
		dispatch(actions.setIsFetching(false))
	}

export const saveStatus = (status: string | null): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await profileAPI.setStatus(status);
		if (data.resultCode == 0) {
			dispatch(actions.setStatusSucces(status));
		}
	}

export const savePhoto = (photo: any): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		const data = await profileAPI.setPhoto(photo);
		if (data.resultCode == 0) {
			dispatch(actions.setPhotoSucces(data.data.photos));
		}
	}