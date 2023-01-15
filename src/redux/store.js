import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import authMeReducer from "./authMeReducer";
import profileReducer from "./profileReducer";

const reducers = combineReducers({
	authMe: authMeReducer,
	app: appReducer,
	profile: profileReducer,
	form: formReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
