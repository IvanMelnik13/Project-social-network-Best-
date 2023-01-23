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
}
const Profile: React.FC<profilePropsType> = ({ profile, isOwner, saveProfile,
	status, saveStatus, savePhoto, isFetching, setEditMode, editMode, errors }) => {

	if (isFetching) {
		return (
			<div className='p-4 text-start'>Loading...</div>
		)
	} else {
		if (profile) {
			return (
				<div className='items-start flex flex-col p-4 gap-3'>

					<ProfilePhoto profile={profile} isOwner={isOwner} savePhoto={savePhoto} />

					<ProfileStatus status={status} saveStatus={saveStatus} isOwner={isOwner} />

					{!editMode && <ProfileInfo profile={profile} />}
					{editMode && <ProfileReactHookForm serverErrors={errors} saveProfile={saveProfile}
						profile={profile} />}

					{isOwner &&
						<button className='underline' onClick={() => { setEditMode(!editMode) }}>
							{editMode ? "Cansel edit" : "Edit"}
						</button>}
				</div>
			)
		} else {
			return (
				<div className='p-4 text-start'>Loading...</div>
			)
		}
	}
}

export default Profile;