import { useEffect } from "react"
import { connect } from "react-redux"
import Users from "./Users"
import { setUsers, actions, followUnfollow } from "../../../redux/usersReducer"
import { userType } from "../../../types/types"
import { appStateType } from "../../../redux/store"

type mapStatePropsType = {
	users: Array<userType>
	page: number
	count: number
	isFetching: boolean
	followProgressingUsers: Array<number>
	totalCount: number
	portion: number
	portionNumber: number
	isAuth: boolean
}
type mapDispatchPropsType = {
	setUsers: (count: number, page: number) => void
	setPage: (page: number) => void
	setPortionNumber: (portionNumber: number) => void
	followUnfollow: (userID: number, isFollowed: boolean) => void
}
type ownPropsType = {}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const UsersContainer: React.FC<propsType> = ({ users, page, count, isFetching, followProgressingUsers, setUsers,
	totalCount, setPage, portion, portionNumber, setPortionNumber, isAuth, followUnfollow }) => {

	useEffect(() => {
		setUsers(count, page);
	}, [])

	return (
		<Users followProgressingUsers={followProgressingUsers}
			users={users} page={page} setPortionNumber={setPortionNumber}
			totalCount={totalCount} count={count} isFetching={isFetching}
			setPage={setPage} portion={portion} portionNumber={portionNumber}
			followUnfollow={followUnfollow} isAuth={isAuth} setUsers={setUsers} />
	)
}

const mapStateToProps = (state: appStateType): mapStatePropsType => {
	return {
		users: state.users.users,
		page: state.users.page,
		count: state.users.count,
		isFetching: state.users.isFetching,
		followProgressingUsers: state.users.followProgressingUsers,
		totalCount: state.users.totalCount,
		portion: state.users.portion,
		portionNumber: state.users.portionNumber,
		isAuth: state.authMe.isAuth,
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>
	(mapStateToProps, { setUsers, setPage: actions.setPage, setPortionNumber: actions.setPortionNumber, followUnfollow })(UsersContainer);