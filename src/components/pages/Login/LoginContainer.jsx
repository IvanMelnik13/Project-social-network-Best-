import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../../redux/authMeReducer";

const LoginContainer = ({ login, isAuth, captcha }) => {
	return (
		<Login login={login} captcha={captcha} isAuth={isAuth} />
	)
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.authMe.isAuth,
		captcha: state.authMe.captcha,
	}
}

export default connect(mapStateToProps, { login })(LoginContainer);