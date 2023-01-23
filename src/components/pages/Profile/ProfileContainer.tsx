import Profile from "./Profile";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setProfile, saveProfile, setStatus, saveStatus, savePhoto, actions } from "../../../redux/profileReducer";
import { appStateType } from "../../../redux/store";
import { profileFormEditDataType, profileType } from "../../../types/types";

type mapStatePropsType = {
	profile: profileType | null
	status: string | null
	myID: number | null
	isFetching: boolean
	editMode: boolean
	errors: Array<string> | null
}
type mapDispatchPropsType = {
	setProfile: (id: number) => void
	saveProfile: (profileData: profileFormEditDataType, id: number) => void
	setStatus: (id: number) => void
	saveStatus: (status: string | null) => void
	savePhoto: (photo: any) => void
	setEditMode: (editMode: boolean) => void
}

type ownPropsType = {}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const ProfileContainer: React.FC<propsType> = ({ profile, myID, setProfile, saveProfile, status, setStatus,
	saveStatus, savePhoto, isFetching, setEditMode, editMode, errors }) => {
	let { userID } = useParams<{ userID: string | undefined }>();
	let ID: number | null = Number(userID);

	if (!ID) {
		ID = myID;
	}

	useEffect(() => {
		if (ID) {
			setProfile(ID);
			setStatus(ID);
		}
	}, [ID])

	if (!ID) {
		return <Navigate to="/login" />
	}

	if (isFetching) {
		return <div className='text-start p-4'>Loading...</div>
	}

	return (
		<Profile profile={profile} status={status} savePhoto={savePhoto} saveStatus={saveStatus}
			saveProfile={saveProfile} editMode={editMode} setEditMode={setEditMode} isOwner={myID == ID} isFetching={isFetching} errors={errors} />
	)
}

const mapStateToProps = (state: appStateType): mapStatePropsType => {
	return {
		profile: state.profile.profile,
		status: state.profile.status,
		myID: state.authMe.id,
		isFetching: state.profile.isFetching,
		editMode: state.profile.form.editMode,
		errors: state.profile.form.errors
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, {
	setProfile, saveProfile,
	setStatus, saveStatus, savePhoto, setEditMode: actions.setEditMode
})(ProfileContainer);