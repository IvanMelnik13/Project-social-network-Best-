import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth }) => {

	if (isAuth) {
		return <Navigate to='/profile' />
	}

	return (
		<div
			className="text-start p-4">
			<h2 className="text-2xl font-bold mb-2">Login</h2>
			<LoginForm login={login} />
		</div>
	)
}

const LoginForm = ({ login }) => {
	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const onSubmit = async (formData) => {
		const data = await login(formData);
		if (data.resultCode == 1) {
			setError('_form', { type: 'server side', message: data.messages[0] })
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}>
			{errors._form && <div className='text-red-700'>Error: {errors._form.message}</div>}
			<div className="mb-2">
				<label className="mr-2">
					E-mail:
				</label>
				<input
					className=""
					type="text"
					placeholder="e-mail"
					{...register('email')} />
			</div>
			<div className="mb-2">
				<label className="mr-2">
					Password:
				</label>
				<input
					className=""
					type="password"
					placeholder="password"
					{...register('password')} />
			</div>
			<button className="border-2 py-1 px-5 rounded-[10px]"
				onClick={() => clearErrors('_form')}
				type="submit">Login</button>
		</form>
	)
}

export default Login;