import { NavLink } from "react-router-dom";

type propsType = {
	isAuth: boolean
	login: string | null
	logout: () => void
}

const Header: React.FC<propsType> = ({ isAuth, login, logout }) => {
	return (
		<header className="col-span-12 rounded-md min-h-[60px] w-full flex bg-white p-4 justify-between">
			<div className="text-2xl font-black text-red-700">BEST</div>
			<div className="self-end">
				{!isAuth &&
					<NavLink className="hover:underline" to='/login'>login</NavLink>}
				{isAuth &&
					<div className="flex gap-3">
						<NavLink className="hover:underline" to='/profile'>{login}</NavLink>
						<button className="hover:underline" onClick={logout}>logout</button>
					</div>}
			</div>
		</header>
	)
}

export default Header;