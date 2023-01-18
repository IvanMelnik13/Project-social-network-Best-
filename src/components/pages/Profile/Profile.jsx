import { useState } from 'react';
import avatar from './../../../assets/img/avatar.jpg';
import { useForm } from 'react-hook-form';
import ProfileStatus from './ProfileStatus';
import React from 'react';

const Profile = ({ profile, isOwner, saveProfile, status, saveStatus, savePhoto, isFetching }) => {
	let [editMode, setEditMode] = useState(false);

	if (isFetching) {
		console.log('fetching');
		return (
			<div className='p-4 text-start'>Loading...</div>
		)
	}

	return (
		<div className='items-start flex flex-col p-4 gap-3'>

			<ProfilePhoto profile={profile} isOwner={isOwner} savePhoto={savePhoto} />

			<ProfileStatus status={status} saveStatus={saveStatus} isOwner={isOwner} />

			{!editMode && <ProfileInfo profile={profile} />}
			{editMode && <ProfileReactHookForm saveProfile={saveProfile} setEditMode={setEditMode} profile={profile} />}

			{/* {editMode && <ProfileReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />} */}

			{isOwner &&
				<button className='underline' onClick={() => { setEditMode(e => !e) }}>
					{editMode ? "Cansel edit" : "Edit"}
				</button>}
		</div>
	)
}

const ProfilePhoto = ({ profile, isOwner, savePhoto }) => {
	const inputRef = React.useRef();

	const onChange = (e) => {
		savePhoto(e.target.files[0]);
		inputRef.current.value = null;
	}

	return (
		<div>
			<div className='max-w-[200px] mb-1 border-2 border-red-700 rounded-[50%] overflow-hidden'>
				<img src={profile?.photos?.large || avatar} alt="avatar" />
			</div>
			{isOwner &&
				<input type="file"
					ref={inputRef}
					onChange={onChange} />}
		</div>
	)
}

const ProfileInfo = ({ profile }) => {
	return (
		<>
			<div>{profile?.fullName}</div>
			<div>About me: {profile?.aboutMe}</div>
			{profile?.lookingForAJob && <div>lookingForAJob: {profile?.lookingForAJob ? 'yes' : 'no'}</div>}
			{profile?.lookingForAJobDescription &&
				<div>lookingForAJobDescription: {profile?.lookingForAJobDescription}</div>}
			<div>
				<div className='mb-1 text-start'>Contacts:</div>
				<ul className='flex flex-col gap-1 items-start'>
					{profile &&
						Object.keys(profile.contacts).map(key => {
							return (
								<li key={key} className='pl-3'>{key}: {profile.contacts[key]}</li>
							)
						})}
				</ul>
			</div>
		</>
	)
}

const ProfileReactHookForm = ({ profile, setEditMode, saveProfile }) => {
	const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm({
		defaultValues: {
			fullName: profile.fullName,
			aboutMe: profile.aboutMe,
			lookingForAJob: profile.lookingForAJob,
			lookingForAJobDescription: profile.lookingForAJobDescription,
			contacts: profile.contacts,
		},
	});

	const onSubmit = async formData => {
		console.log(formData);
		const data = await saveProfile(formData, profile.userId);
		if (data.resultCode == 0) {
			setEditMode(false);
		} else {
			setError('_form', { type: 'server side', message: data.messages[0] })
		}
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
								placeholder={[key]}
								{...register(`contacts.${key}`)}
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

export default Profile;