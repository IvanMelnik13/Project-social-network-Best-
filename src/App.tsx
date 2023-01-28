import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import { initializing } from './redux/appReducer';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import { appStateType } from './redux/store';
import withSuspense from './HOCs/withSuspense';

const ChatPage = React.lazy(() => import('./components/pages/Chat/Chat'))
const Profile = React.lazy(() => import('./components/pages/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/pages/Login/LoginContainer'));
const Users = React.lazy(() => import('./components/pages/Users/UsersContainer'));

const ChatPageWS = withSuspense(ChatPage)
const UsersWS = withSuspense(Users)
const ProfileWS = withSuspense(Profile)
const LoginWS = withSuspense(Login)

type AppPropsType = {
	initialized: boolean
}

const App: React.FC<AppPropsType> = ({ initialized }) => {
	if (!initialized) {
		return (
			<div>Loading...</div>
		)
	} else {
		return (
			<div className='App py-3 bg-neutral-100 min-h-[100vh] justify-items-start'>
				<div className="container mx-auto grid grid-cols-12 px-4 items-start gap-3">
					<HeaderContainer />
					<Sidebar />
					<main className='col-span-9 w-full rounded-md bg-white'>
						<Routes>
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='/chat' element={<ChatPageWS />}></Route>
							<Route path='/users' element={<UsersWS />} />
							<Route path="/profile/:userID?" element={<ProfileWS />} />
							<Route path="/login" element={<LoginWS />} />
							<Route path="*" element={<div>404</div>} />
						</Routes>
					</main>
				</div>
			</div>
		);
	}
}

type MapStatePropsType = {
	initialized: boolean
}
type MapDispatchPropsType = {
	initializing: () => void
}
type AppContainerPropsType = MapStatePropsType & MapDispatchPropsType

const AppContainer: React.FC<AppContainerPropsType> = ({ initializing, initialized }) => {
	useEffect(() => {
		initializing();
	}, [])

	return (
		<BrowserRouter>
			<App initialized={initialized} />
		</BrowserRouter>
	)
}

const mapStateToProps = (state: appStateType) => {
	return {
		initialized: state.app.initialized,
	}
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, appStateType>(mapStateToProps, {
	initializing,
})(AppContainer);
