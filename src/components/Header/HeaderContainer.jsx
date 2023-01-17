import { connect } from "react-redux"
import Header from "./Header"
import { logout } from "../../redux/authMeReducer"

const HeaderContainer = ({ isAuth, login, logout }) => {
	return (
		<Header isAuth={isAuth} logout={logout} login={login} />
	)
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.authMe.isAuth,
		login: state.authMe.login,
		logout: state.authMe.logout,
	}
}

export default connect(mapStateToProps, { logout })(HeaderContainer);