import { userType } from "../types/types"
import { instance, ResponseDataType } from "./api"

type ResponseGetUsersType = {
	items: Array<userType>
	totalCount: number
	error: string
}

export const usersAPI = {
	getUsers(count: number, page: number, term: null | string, friend: boolean | null) {
		return instance.get<ResponseGetUsersType>(`/users?page=${page}&count=${count}&term=${term ? term : ''}&friend=${friend}`).then(response => response.data)
	},
	follow(id: number) {
		return instance.post<ResponseDataType>('follow/' + id).then(response => response.data);
	},
	unfollow(id: number) {
		return instance.delete<ResponseDataType>('follow/' + id).then(response => response.data);
	}
}