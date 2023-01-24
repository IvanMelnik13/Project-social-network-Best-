import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../../redux/authMeReducer";
import { appStateType } from "../../../redux/store";
import { loginFormDataType } from "../../../types/types";
import { actions } from "../../../redux/authMeReducer";
import { useEffect } from "react";

type mapStatePropsType = {
	isAuth: boolean
	captcha: string | null
	serverErrors: Array<string> | null
}
type mapDispatchPropsType = {
	login: (LoginFormData: loginFormDataType) => void
	setFormError: (errors: Array<string> | null) => void
}

type ownPropsType = {}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const LoginContainer: React.FC<propsType> = ({ login, isAuth, captcha, serverErrors, setFormError }) => {
	useEffect(() => {
		setFormError(null)
	}, [])

	return (
		<Login serverErrors={serverErrors} login={login} captcha={captcha} isAuth={isAuth} />
	)
}

const mapStateToProps = (state: appStateType): mapStatePropsType => {
	return {
		isAuth: state.authMe.isAuth,
		captcha: state.authMe.captcha,
		serverErrors: state.authMe.form.errors
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>
	(mapStateToProps, { login, setFormError: actions.setFormErrors })(LoginContainer);