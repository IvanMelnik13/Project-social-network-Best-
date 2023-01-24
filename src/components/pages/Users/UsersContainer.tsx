import { useEffect } from "react"
import { connect } from "react-redux"
import Users from "./Users"
import { setUsers, actions, followUnfollow, findFilterUsers } from "../../../redux/usersReducer"
import { userType } from "../../../types/types"
import { appStateType } from "../../../redux/store"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"

type queryType = {
	page: string
	term?: string
	friend?: string
}

const UsersContainer: React.FC<propsType> = ({ users, page, count, isFetching, followProgressingUsers, setUsers,
	totalCount, setPage, portion, portionNumber, setPortionNumber, isAuth, followUnfollow, setFilterFriend,
	setFilterTerm, term, friend, findFilterUsers }) => {

	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const query = queryString.parse(location.search.slice(1))
		setFilterFriend(query?.friend ? true : null)
		setFilterTerm(query?.term ? query.term as string : null)
		setPage(query?.page ? +query.page : page)
		setPortionNumber(Math.ceil((query?.page ? +query.page : page) / portion))
		setUsers(count, query?.page ? +query.page : page, query?.term ? query.term as string : null, query?.friend ? true : null)
	}, [])


	useEffect(() => {
		const query: Record<string, string> = {}
		if (page) {
			query.page = page.toString()
		}
		if (term) {
			query.term = term
		}
		if (friend) {
			query.friend = 'true'
		}
		const queryString = new URLSearchParams(query).toString()
		navigate({
			pathname: '/users',
			search: `?${queryString}`
		})
	}, [term, friend, page])

	return (
		<Users followProgressingUsers={followProgressingUsers}
			users={users} page={page} setPortionNumber={setPortionNumber}
			totalCount={totalCount} count={count} isFetching={isFetching}
			setPage={setPage} portion={portion} portionNumber={portionNumber}
			followUnfollow={followUnfollow} isAuth={isAuth} setUsers={setUsers} setFilterFriend={setFilterFriend}
			setFilterTerm={setFilterTerm} term={term} friend={friend} findFilterUsers={findFilterUsers}
		/>
	)
}

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
	term: string | null
	friend: boolean | null
}
type mapDispatchPropsType = {
	setUsers: (ccount: number, page: number, term?: null | string, friend?: null | boolean) => void
	setPage: (page: number) => void
	setPortionNumber: (portionNumber: number) => void
	followUnfollow: (userID: number, isFollowed: boolean) => void
	setFilterTerm: (term: string | null) => void
	setFilterFriend: (friend: boolean | null) => void
	findFilterUsers: (count: number, term: string | null, friend: boolean | null) => void
}
type ownPropsType = {}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

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
		term: state.users.filter.term,
		friend: state.users.filter.friend,
	}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>
	(mapStateToProps, {
		setUsers, setPage: actions.setPage, setPortionNumber: actions.setPortionNumber,
		followUnfollow, setFilterTerm: actions.setFilterTerm, setFilterFriend: actions.setFilterFriend, findFilterUsers
	})(UsersContainer);