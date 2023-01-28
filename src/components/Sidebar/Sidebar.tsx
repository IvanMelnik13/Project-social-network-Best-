import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { appStateType } from "../../redux/store";
import cn from "classnames";

type sidebarPropsType = {
	myID: number | null
}

const Sidebar: React.FC<sidebarPropsType> = ({ myID }) => {
	return (
		<nav className="col-span-3 w-full bg-white rounded-md">
			<ul className="flex flex-col items-start p-4">
				<li>
					<NavLink className={({ isActive }) => cn({
						'text-red-700': isActive
					})} to={`/profile/2`} >Teacher</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => cn({
						'text-red-700': isActive
					})} to={`/profile/${myID}`} >Profile</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => cn({
						'text-red-700': isActive
					})} to={`/users`} >Users</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => cn({
						'text-red-700': isActive
					})} to={`/chat`} >Chat</NavLink>
				</li>
			</ul>
		</nav>
	)
}

type mapStatePropsType = {
	myID: number | null
}
type mapDispatchPropsType = {}
type ownPropsType = {}
type sidebarContainerPropsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const SidebarContainer: React.FC<sidebarContainerPropsType> = ({ myID }) => {
	return (
		<Sidebar myID={myID} />
	)
}

const mapStateToProps = (state: appStateType) => {
	return {
		myID: state.authMe.id,
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType,
	ownPropsType, appStateType>(mapStateToProps, {})(SidebarContainer);