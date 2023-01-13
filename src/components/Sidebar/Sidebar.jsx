import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/profile' >Профиль</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Sidebar;