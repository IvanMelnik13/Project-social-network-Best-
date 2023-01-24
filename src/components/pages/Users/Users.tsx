import { NavLink } from 'react-router-dom';
import avatar from './../../../assets/img/avatar.jpg';
import cn from 'classnames';
import { userType } from '../../../types/types';

type propsType = {
	users: Array<userType>
	page: number
	totalCount: number
	count: number
	isFetching: boolean
	setPage: (page: number) => void
	portion: number
	portionNumber: number
	setPortionNumber: (portionNumber: number) => void
	followUnfollow: (userID: number, isFollowed: boolean) => void
	isAuth: boolean
	followProgressingUsers: Array<number>
	setUsers: (count: number, page: number) => void
}

const Users: React.FC<propsType> = ({ users, page, totalCount, count, isFetching, setPage, portion,
	portionNumber, setPortionNumber, followUnfollow, isAuth, followProgressingUsers, setUsers }) => {
	const maxPage = Math.ceil(totalCount / count);
	const maxPortionNumber = Math.ceil(maxPage / portion);

	const pages = [];
	for (let i = 1; i <= maxPage; i++) {
		pages.push(i);
	}

	const currentPage = page;

	if (isFetching) {
		return (
			<div className='p-4 text-start'>Loading...</div>
		)
	}

	return (
		<div className='p-4'>
			<div className='flex gap-1 mb-4'>
				<button className={cn('p-1 border rounded-[5px]', { 'bg-slate-100': portionNumber == 1 })}
					disabled={portionNumber == 1}
					onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>
				<div className='flex gap-1'>
					{pages.map(page => {
						if ((page <= (portion * portionNumber)) && (page >= (portion * (portionNumber - 1) + 1))) {
							return (
								<button
									className={cn('p-1 border rounded-[5px]',
										{ 'bg-red-300': page == currentPage })}
									key={page}
									onClick={() => setUsers(count, page)}>{page}</button>
							)
						}
					})}
				</div>
				<button
					className={cn('p-1 border rounded-[5px]', { 'bg-slate-100': portionNumber == maxPortionNumber })}
					disabled={portionNumber == maxPortionNumber}
					onClick={() => setPortionNumber(portionNumber + 1)}>next</button>
			</div>
			<div className='flex flex-col gap-3'>
				{users.map(user => {
					const followUnfollowDisabled = followProgressingUsers.some(id => id == user.id);
					return (
						<div
							className='p-2 border-2 border-red-700 rounded-[5px] text-start flex flex-col items-start gap-2'
							key={user.id}>
							<div className='flex gap-3'>
								<NavLink to={`/profile/${user.id}`}
									className="w-[75px] h-[75px] overflow-hidden border-2 border-red-700 rounded-[50%]">
									<img
										src={user?.photos?.small || avatar} alt="" />
								</NavLink>
								<div>
									<div>{user.name}</div>
									<div>{user.status}</div>
								</div>
							</div>
							<button
								className={cn({ 'bg-slate-100': followUnfollowDisabled }, 'px-3 py-1 rounded-[5px] border', { 'bg-red-300': user.followed })}
								disabled={!isAuth || followUnfollowDisabled}
								onClick={() => followUnfollow(user.id, !user.followed)}>
								{user.followed ? "Unfollow" : "Follow"}
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Users;