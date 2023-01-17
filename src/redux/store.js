import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import authMeReducer from "./authMeReducer";
import profileReducer from "./profileReducer";

const reducers = combineReducers({
	authMe: authMeReducer,
	app: appReducer,
	profile: profileReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
