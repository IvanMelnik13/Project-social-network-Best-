import Profile from "./Profile";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setProfile } from "../../../redux/profileReducer";

const ProfileContainer = ({ profile, myID, setProfile }) => {
	let { userID } = useParams();
	const navigate = useNavigate();

	if (!userID) {
		userID = myID;
	}
	if (!userID) {
		navigate('/login');
	}

	useEffect(() => {
		setProfile(userID);
	}, [userID])

	return (
		<Profile profile={profile} isOwner={myID == userID} />
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile.profile,
		myID: state.authMe.id,
	}
}

export default connect(mapStateToProps, { setProfile })(ProfileContainer);