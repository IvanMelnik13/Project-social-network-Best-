//loginTypes

export type loginFormDataType = {
	email: string,
	password: string,
	captcha: string
}



//profileTypes

export type profileContactsType = {
	facebook: string | null
	website: string | null
	vk: string | null
	twitter: string | null
	instagram: string | null
	youtube: string | null
	github: string | null
	mainLink: string | null
}

export type profilePhotosType = {
	small: string | null
	large: string | null
}

export type profileType = {
	aboutMe: string | null
	contacts: profileContactsType
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string | null
	userId: number
	photos: profilePhotosType
}

export type profileFormEditDataType = {
	fullName: string | null
	aboutMe: string | null
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	contacts: profileContactsType
}


//userType

export type userType = {
	name: null | string
	id: number
	uniqueUrlName: null | string,
	photos: profilePhotosType,
	status: null | string,
	followed: boolean
}

