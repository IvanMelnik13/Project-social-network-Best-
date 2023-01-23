import { AnyAction, applyMiddleware, combineReducers, createStore, Action } from "redux"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import appReducer from "./appReducer"
import authMeReducer from "./authMeReducer"
import profileReducer from "./profileReducer"
import usersReducer from "./usersReducer"

const rootReducer = combineReducers({
	authMe: authMeReducer,
	app: appReducer,
	profile: profileReducer,
	users: usersReducer,
})
export type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>
// export type DispatchType = Dispatch<AnyAction>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<InferValueTypes<T>>
export type AppThunkType<AT extends Action = Action, RT = Promise<void>> = ThunkAction<RT, appStateType, unknown, AT>

// @ts-ignore
window.store = store

export default store