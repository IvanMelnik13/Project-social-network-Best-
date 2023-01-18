import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth, captcha }) => {
	if (isAuth) {
		return <Navigate to='/profile' />
	}

	return (
		<div
			className="text-start p-4">
			<h2 className="text-2xl font-bold mb-2">Login</h2>
			<LoginForm login={login} captcha={captcha} />
		</div>
	)
}

const LoginForm = ({ login, captcha }) => {
	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
		defaultValues: {
			email: '',
			password: '',
			captcha: '',
		}
	});

	const onSubmit = async (formData) => {
		const data = await login(formData);
		if (data.resultCode == 1 || data.resultCode == 10) {
			setError('_form', { type: 'server side', message: data.messages[0] })
		}
	}

	return (
		<form
			className="flex flex-col items-start"
			onSubmit={handleSubmit(onSubmit)}>
			{errors._form && <div className='text-red-700 mb-2'>Error: {errors._form.message}</div>}
			<div className="mb-2 flex w-full">
				<label className="mr-2">
					E-mail:
				</label>
				<input
					className="flex-auto border-b-2"
					type="text"
					placeholder="e-mail"
					{...register('email')} />
			</div>
			<div className="mb-2 flex w-full">
				<label className="mr-2">
					Password:
				</label>
				<input
					className="flex-auto border-b-2"
					type="password"
					placeholder="password"
					{...register('password')} />
			</div>
			{captcha &&
				<div className="mb-2">
					<div className="border-2 border-red-700 inline-flex">
						<img src={captcha} alt="" />
					</div>
					<div>
						<label className="">
							Enter the characters from the picture:
						</label>
						<input
							className="w-full border-b-2"
							type='text'
							placeholder="captcha"
							{...register('captcha')}
						/>
					</div>
				</div>}
			<button className="border-2 py-1 px-5 rounded-[10px]"
				onClick={() => clearErrors('_form')}
				type="submit">Login</button>
		</form>
	)
}

export default Login;