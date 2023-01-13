import { setData } from "./authMeReducer";

const initialState = {
	initialized: false,
}

const SET_INITIALIZED = 'appReducer/SET_INITIALIZED'

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true,
			}
		default:
			return state;
	}
}

export default appReducer;

export const setInitialized = () => {
	return {
		type: SET_INITIALIZED,
	}
}

export const initializing = () => async (dispatch) => {
	const promise = dispatch(setData());
	await promise;
	dispatch(setInitialized());
}