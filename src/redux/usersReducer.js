import { usersAPI } from "../API/api";

const initialState = {
	totalCount: 0,
	page: 1,
	count: 10,
	users: [],
	isFetching: false,
	followProgressingUsers: [],
	portion: 5,
	portionNumber: 1,
}

const SET_TOTAL_COUNT = 'usersReducer/SET_TOTAL_COUNT';
const SET_PAGE = 'usersReducer/SET_PAGE';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_IS_FETCHIN = 'usersReducer/SET_IS_FETCHING';
const SET_IS_FOLLOW_PROGRESSING_USERS = 'usersReducer/SET_IS_FOLLOW_PROGRESSING_USERS';
const FOLLOW_UNFOLLOW = 'usersReducer/FOLLOW_UNFOLLOW';
const SET_PORTION_NUMBER = 'usersReducer/SET_PORTION_NUMBER';

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW_UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id == action.id) {
						return {
							...user,
							followed: action.isFollowed,
						}
					} else {
						return user;
					}
				})
			}
		case SET_TOTAL_COUNT:
			return {
				...state,
				totalCount: action.totalCount,
			}
		case SET_PAGE:
			return {
				...state,
				page: action.page,
			}
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case SET_IS_FETCHIN:
			return {
				...state,
				isFetching: action.isFetching,
			}
		case SET_IS_FOLLOW_PROGRESSING_USERS:
			return {
				...state,
				followProgressingUsers: action.isFollowProgressing
					? [...state.followProgressingUsers, action.id]
					: [...state.followProgressingUsers.filter(id => id != action.id)],
			}
		case SET_PORTION_NUMBER:
			return {
				...state,
				portionNumber: action.portionNumber,
			}
		default:
			return state
	}
}
export default usersReducer;

export const setPortionNumber = (portionNumber) => {
	return {
		type: SET_PORTION_NUMBER,
		portionNumber,
	}
}

export const followUnfollowSuccess = (id, isFollowed) => {
	return {
		type: FOLLOW_UNFOLLOW,
		id,
		isFollowed,
	}
}

export const setIsFollowProgressingUsers = (isFollowProgressing, id) => {
	return {
		type: SET_IS_FOLLOW_PROGRESSING_USERS,
		isFollowProgressing,
		id,
	}
}

export const followUnfollow = (id, isFollowed) => async (dispatch) => {
	dispatch(setIsFollowProgressingUsers(true, id));

	const data = await (isFollowed ? usersAPI.follow(id) : usersAPI.unfollow(id));

	if (data.resultCode == 0) {
		dispatch(followUnfollowSuccess(id, isFollowed));
	}

	dispatch(setIsFollowProgressingUsers(false, id));
}

export const setTotalCount = (totalCount) => {
	return {
		type: SET_TOTAL_COUNT,
		totalCount,
	}
}

export const setPage = (page) => {
	return {
		type: SET_PAGE,
		page,
	}
}

export const setUsersSuccess = (users) => {
	return {
		type: SET_USERS,
		users,
	}
}

export const setIsFetching = (isFetching) => {
	return {
		type: SET_IS_FETCHIN,
		isFetching,
	}
}

export const setUsers = (count, page) => async (dispatch) => {
	dispatch(setIsFetching(true));

	const data = await usersAPI.getUsers(count, page);

	dispatch(setUsersSuccess(data.items));
	dispatch(setTotalCount(data.totalCount));
	dispatch(setIsFetching(false));
}

