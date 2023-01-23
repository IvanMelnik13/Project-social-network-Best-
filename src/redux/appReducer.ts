import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { setData } from "./authMeReducer";
import { appStateType, AppThunkType, InferActionTypes } from "./store";

//initial state + types
const initialState = {
	initialized: false as boolean,
}
type initialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>

//action types
const SET_INITIALIZED = 'appReducer/SET_INITIALIZED';

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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

//action creators

export const actions = {
	setInitialized: () => {
		return {
			type: SET_INITIALIZED,
		}
	},
}

//thunk creators

export const initializing = (): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		await dispatch(setData());
		dispatch(actions.setInitialized());
	}