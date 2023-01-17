import { connect } from "react-redux"
import Login from "./Login"

const LoginContainer = () => {
	return (
		<Login />
	)
}

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps, {})(LoginContainer);