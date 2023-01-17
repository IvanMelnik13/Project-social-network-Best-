import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = ({ myID }) => {
	return (
		<nav className="col-span-3 w-full bg-white rounded-md">
			<ul className="flex flex-col items-start p-4">
				<li>
					<NavLink to={`/profile/2`} >Teacher</NavLink>
				</li>
				<li>
					<NavLink to={`/profile/${myID ?? ''}`} >Profile</NavLink>
				</li>
			</ul>
		</nav>
	)
}

const SidebarContainer = ({ myID }) => {
	return (
		<Sidebar myID={myID} />
	)
}

const mapStateToProps = (state) => {
	return {
		myID: state.authMe.id,
	}
}

export default connect(mapStateToProps, {})(SidebarContainer);