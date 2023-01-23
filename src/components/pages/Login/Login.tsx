import { Navigate } from "react-router-dom"
import { loginFormDataType } from "../../../types/types"
import LoginForm from "./LoginForm"

type propsType = {
	login: (LoginFormData: loginFormDataType) => void
	isAuth: boolean
	captcha: string | null
	serverErrors: Array<string> | null
}

const Login: React.FC<propsType> = ({ login, isAuth, captcha, serverErrors }) => {
	if (isAuth) {
		return <Navigate to='/profile' />
	}

	return (
		<div
			className="text-start p-4">
			<h2 className="text-2xl font-bold mb-2">Login</h2>
			<LoginForm serverErrors={serverErrors} login={login} captcha={captcha} />
		</div>
	)
}

export default Login;