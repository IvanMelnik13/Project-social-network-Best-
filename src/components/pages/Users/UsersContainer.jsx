import { useEffect } from "react"
import { connect } from "react-redux"
import Users from "./Users"
import { setUsers, setPage, setPortionNumber, followUnfollow } from "../../../redux/usersReducer"

const UsersContainer = ({ users, page, count, isFetching, followProgressingUsers, setUsers,
	totalCount, setPage, portion, portionNumber, setPortionNumber, isAuth, followUnfollow }) => {
	useEffect(() => {
		setUsers(count, page);
	}, [count, page])

	return (
		<Users followProgressingUsers={followProgressingUsers}
			users={users} page={page} setPortionNumber={setPortionNumber}
			totalCount={totalCount} count={count} isFetching={isFetching}
			setPage={setPage} portion={portion} portionNumber={portionNumber}
			followUnfollow={followUnfollow} isAuth={isAuth} />
	)
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, { setUsers, setPage, setPortionNumber, followUnfollow })(UsersContainer);