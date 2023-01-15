import { useState } from 'react';
import avatar from './../../../assets/img/avatar.jpg';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const Profile = ({ profile, isOwner }) => {
	let [editMode, setEditMode] = useState(false);

	const handleSubmit = (formData) => {
		console.log(formData);
	}

	return (
		<div className='items-start flex flex-col p-4 gap-3'>
			<div className='max-w-[200px] border-2 border-red-700 rounded-[50%] overflow-hidden'>
				<img src={profile?.photos?.large || avatar} alt="avatar" />
			</div>

			{!editMode && <ProfileInfo profile={profile} />}
			{editMode && <ProfileReduxForm initialValues={profile} profile={profile} onSubmit={handleSubmit} />}

			{isOwner &&
				<button className='underline' onClick={() => { setEditMode(e => !e) }}>
					{editMode ? "Cansel edit" : "Edit"}
				</button>}
		</div>
	)
}

const ProfileInfo = ({ profile }) => {
	return (
		<>
			<div>{profile?.fullName}</div>
			{profile?.lookingForAJob && <div>lookingForAJob: {profile?.lookingForAJob}</div>}
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

const ProfileForm = ({ handleSubmit, profile, initialValues }) => {
	return (
		<form className='flex flex-col items-start gap-2 w-full' onSubmit={handleSubmit}>
			<div className='flex gap-3 w-full'>
				<span>Full name:</span>
				<Field className='border-b-2 flex-auto' placeholder='full name' name='fullName' component='input' type='text' />
			</div>
			<div className='flex gap-3 w-full'>
				<span>looking for a job:</span>
				<Field placeholder='' name='lookingForAJob' component='input' type='checkbox' />
			</div>
			<div className='flex gap-3 w-full'>
				<span>Looking for a job description:</span>
				<Field className='border-b-2 flex-auto' placeholder='looking for a job description' name='lookingForAJobDescription' component='input' type='text' />
			</div>

			<div>Contacts:</div>
			{profile &&
				Object.keys(profile.contacts).map(key => {
					return (
						<div className='flex gap-3 w-full pl-3'>
							<span>{key}:</span>
							<Field className='border-b-2 flex-auto' placeholder={[key]}
								name={`contacts.${key}`} component='input' type='text' />
						</div>
					)
				})}

			<button className='border-2 py-1 px-5 rounded-[10px]' type='submit'>Submit</button>
		</form>
	)
}

const ProfileReduxForm = reduxForm({
	form: 'editProfile',
})(ProfileForm)

export default Profile;