import Profile from "./Profile";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setProfile, saveProfile, setStatus, saveStatus, savePhoto } from "../../../redux/profileReducer";

const ProfileContainer = ({ profile, myID, setProfile, saveProfile, status, setStatus,
	saveStatus, savePhoto, isFetching }) => {
	let { userID } = useParams();

	if (!userID) {
		userID = myID;
	}

	useEffect(() => {
		if (userID) {
			setProfile(userID);
			setStatus(userID);
		}
	}, [userID])

	if (!userID) {
		return <Navigate to="/login" />
	}

	return (
		<Profile profile={profile} status={status} savePhoto={savePhoto} saveStatus={saveStatus}
			saveProfile={saveProfile} isOwner={myID == userID} isFetching={isFetching} />
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile.profile,
		status: state.profile.status,
		myID: state.authMe.id,
		isFetching: state.profile.isFetching,
	}
}

export default connect(mapStateToProps, { setProfile, saveProfile, setStatus, saveStatus, savePhoto })(ProfileContainer);