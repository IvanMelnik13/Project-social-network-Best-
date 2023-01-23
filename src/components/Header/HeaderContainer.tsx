import { connect } from "react-redux"
import Header from "./Header"
import { logout } from "../../redux/authMeReducer"
import { appStateType } from "../../redux/store"

type mapStatePropsType = {
	isAuth: boolean
	login: string | null
}
type mapDispatchPropsType = {
	logout: () => void
}
type ownPropsType = {}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const HeaderContainer: React.FC<propsType> = ({ isAuth, login, logout }) => {
	return (
		<Header isAuth={isAuth} logout={logout} login={login} />
	)
}

const mapStateToProps = (state: appStateType) => {
	return {
		isAuth: state.authMe.isAuth,
		login: state.authMe.login,
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType,
	ownPropsType, appStateType>(mapStateToProps, { logout })(HeaderContainer);