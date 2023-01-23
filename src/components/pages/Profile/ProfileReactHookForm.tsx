import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { profileFormEditDataType, profileType } from '../../../types/types'

type propsType = {
	profile: profileType
	saveProfile: (profileData: profileFormEditDataType, id: number) => void
	serverErrors: string[] | null
}

type FormInputs = {
	fullName: string | null
	aboutMe: string | null
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	contacts: {
		facebook: string | null
		website: string | null
		vk: string | null
		twitter: string | null
		instagram: string | null
		youtube: string | null
		github: string | null
		mainLink: string | null
	}
	_form: string
}

const ProfileReactHookForm: React.FC<propsType> = ({ profile, saveProfile, serverErrors }) => {
	const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm<FormInputs>({
		defaultValues: {
			fullName: profile.fullName,
			aboutMe: profile.aboutMe,
			lookingForAJob: profile.lookingForAJob,
			lookingForAJobDescription: profile.lookingForAJobDescription,
			contacts: profile.contacts,
		},
	});

	useEffect(() => {
		if (serverErrors) {
			setError('_form', { type: 'server side', message: serverErrors[0] })
		}
	}, [serverErrors])

	const onSubmit = (formData: profileFormEditDataType) => {
		saveProfile(formData, profile.userId);
		// if (data.resultCode == 0) {
		// 	setEditMode(false);
		// } else {
		// 	setError('_form', { type: 'server side', message: data.messages[0] })
		// }
	}

	return (
		<form className='flex flex-col items-start gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
			{errors._form && <div className='text-red-700'>Error: {errors._form.message}</div>}
			<div className='flex gap-3 w-full'>
				<label>Full name:</label>
				<input
					className='border-b-2 flex-auto'
					placeholder='full name'
					{...register('fullName')} />
			</div>
			<div className='flex gap-3 w-full'>
				<label>About me:</label>
				<input
					className='border-b-2 flex-auto'
					placeholder='about me'
					{...register('aboutMe')} />
			</div>
			<div className='flex gap-3 w-full'>
				<label>Looking for a job:</label>
				<input
					type='checkbox'
					{...register('lookingForAJob')} />
			</div>
			<div className='flex gap-3 w-full'>
				<label>Looking for a job description:</label>
				<input
					className='border-b-2 flex-auto'
					placeholder='looking for a job description'
					{...register('lookingForAJobDescription')} />
			</div>

			{profile &&
				Object.keys(profile.contacts).map(key => {
					return (
						<div key={key} className='flex gap-3 w-full pl-3'>
							<label>{key}:</label>
							<input
								className='border-b-2 flex-auto'
								placeholder={key}
								{...register(`contacts.${key as keyof typeof profile.contacts}`)}
							/>
						</div>
					)
				})}

			<button onClick={() => clearErrors('_form')}
				className='border-2 py-1 px-5 rounded-[10px]'
				type='submit'>Submit</button>
		</form>
	)
}

export default ProfileReactHookForm