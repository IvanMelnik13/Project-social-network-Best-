import avatar from '../../../assets/img/avatar.jpg'
import React, { useRef } from 'react'
import { profileType } from '../../../types/types'

type propsType = {
	profile: profileType | null
	isOwner: boolean
	savePhoto: (photo: any) => void
}

const ProfilePhoto: React.FC<propsType> = ({ profile, isOwner, savePhoto }) => {
	const inputRef = useRef<any>();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		savePhoto(file)
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

export default ProfilePhoto;