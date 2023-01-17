import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../../redux/authMeReducer";

const LoginContainer = ({ login, isAuth }) => {
	return (
		<Login login={login} isAuth={isAuth} />
	)
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.authMe.isAuth,
	}
}

export default connect(mapStateToProps, { login })(LoginContainer);