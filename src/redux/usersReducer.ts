import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../API/users-api";
import { userType } from "../types/types";
import { appStateType, AppThunkType, InferActionTypes } from "./store";

const initialState = {
	totalCount: 0 as number,
	page: 1 as number,
	count: 10 as number,
	users: [] as Array<userType>,
	isFetching: false as boolean,
	followProgressingUsers: [] as Array<number>,
	portion: 5 as number,
	portionNumber: 1 as number,
}

type initialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>

const SET_TOTAL_COUNT = 'usersReducer/SET_TOTAL_COUNT';
const SET_PAGE = 'usersReducer/SET_PAGE';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_IS_FETCHIN = 'usersReducer/SET_IS_FETCHING';
const SET_IS_FOLLOW_PROGRESSING_USERS = 'usersReducer/SET_IS_FOLLOW_PROGRESSING_USERS';
const FOLLOW_UNFOLLOW = 'usersReducer/FOLLOW_UNFOLLOW';
const SET_PORTION_NUMBER = 'usersReducer/SET_PORTION_NUMBER';

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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

export const actions = {
	setPortionNumber: (portionNumber: number) => {
		return {
			type: SET_PORTION_NUMBER,
			portionNumber,
		} as const
	},
	followUnfollowSuccess: (id: number, isFollowed: boolean) => {
		return {
			type: FOLLOW_UNFOLLOW,
			id,
			isFollowed,
		} as const
	},
	setIsFollowProgressingUsers: (isFollowProgressing: boolean, id: number) => {
		return {
			type: SET_IS_FOLLOW_PROGRESSING_USERS,
			isFollowProgressing,
			id,
		} as const
	},
	setTotalCount: (totalCount: number) => {
		return {
			type: SET_TOTAL_COUNT,
			totalCount,
		} as const
	},
	setPage: (page: number) => {
		return {
			type: SET_PAGE,
			page,
		} as const
	},
	setUsersSuccess: (users: Array<userType>) => {
		return {
			type: SET_USERS,
			users,
		} as const
	},
	setIsFetching: (isFetching: boolean) => {
		return {
			type: SET_IS_FETCHIN,
			isFetching,
		} as const
	},
}

export const followUnfollow = (id: number, isFollowed: boolean): AppThunkType<ActionsTypes> =>
	async (dispatch) => {
		dispatch(actions.setIsFollowProgressingUsers(true, id));

		const data = await (isFollowed ? usersAPI.follow(id) : usersAPI.unfollow(id));

		if (data.resultCode == 0) {
			dispatch(actions.followUnfollowSuccess(id, isFollowed));
		}

		dispatch(actions.setIsFollowProgressingUsers(false, id));
	}

export const setUsers = (count: number, page: number): AppThunkType<ActionsTypes> => async (dispatch) => {
	dispatch(actions.setIsFetching(true));

	const data = await usersAPI.getUsers(count, page);

	dispatch(actions.setUsersSuccess(data.items));
	dispatch(actions.setTotalCount(data.totalCount));
	dispatch(actions.setPage(page));
	dispatch(actions.setIsFetching(false));
}

