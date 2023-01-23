import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { loginFormDataType } from "../../../types/types";

type LoginFormType = {
	email: string
	password: string
	captcha: string
	_form: null | string
}

type PropsType = {
	login: (LoginFormData: loginFormDataType) => void
	captcha: null | string
	serverErrors: Array<string> | null
}

const LoginForm: React.FC<PropsType> = ({ login, captcha, serverErrors }) => {
	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<LoginFormType>({
		defaultValues: {
			email: '',
			password: '',
			captcha: '',
		}
	});

	useEffect(() => {
		if (serverErrors) {
			setError('_form', { type: 'server side', message: serverErrors[0] })
		}
	}, [serverErrors])

	const onSubmit = (formData: LoginFormType) => {
		login(formData);
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

export default LoginForm