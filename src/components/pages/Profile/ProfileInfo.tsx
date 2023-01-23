import { profileType } from "../../../types/types"

type propsType = {
	profile: profileType | null
}

const ProfileInfo: React.FC<propsType> = ({ profile }) => {
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
						Object.keys(profile.contacts).map((key) => {
							return (
								<li key={key} className='pl-3'>
									{key}: {profile.contacts[key as keyof typeof profile.contacts]}
								</li>
							)
						})}
				</ul>
			</div>
		</>
	)
}

export default ProfileInfo;