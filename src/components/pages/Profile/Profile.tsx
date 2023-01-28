import { useState } from 'react'
import ProfileStatus from './ProfileStatus'
import React from 'react'
import { profileFormEditDataType, profileType } from '../../../types/types'
import ProfilePhoto from './ProfilePhoto'
import ProfileInfo from './ProfileInfo'
import ProfileReactHookForm from './ProfileReactHookForm'

type profilePropsType = {
	profile: profileType | null
	isOwner: boolean
	saveProfile: (profileData: profileFormEditDataType, id: number) => void
	status: string | null
	saveStatus: (status: string | null) => void
	savePhoto: (photo: any) => void
	isFetching: boolean
	setEditMode: (editMode: boolean) => void
	editMode: boolean
	errors: Array<string> | null
	setFormError: (errors: Array<string> | null) => void
}
const Profile: React.FC<profilePropsType> = ({ profile, isOwner, saveProfile,
	status, saveStatus, savePhoto, isFetching, setEditMode, editMode, errors, setFormError }) => {


	if (profile) {
		return (
			<div className='items-start text-start flex flex-col p-4 gap-3'>

				<ProfilePhoto profile={profile} isOwner={isOwner} savePhoto={savePhoto} />

				<ProfileStatus status={status} saveStatus={saveStatus} isOwner={isOwner} />

				{!editMode && <ProfileInfo profile={profile} />}
				{editMode && <ProfileReactHookForm serverErrors={errors} saveProfile={saveProfile}
					profile={profile} />}

				{isOwner &&
					<button className='underline' onClick={() => { setEditMode(!editMode); setFormError(null) }}>
						{editMode ? "Cansel edit" : "Edit"}
					</button>}
			</div>
		)
	} else {
		return (
			<div className='p-4 text-start'>Profile not found...</div>
		)
	}

}

export default Profile;