import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import ProfileContainer from './components/pages/Profile/ProfileContainer';
import Sidebar from './components/Sidebar/Sidebar';
import { initializing } from './redux/appReducer';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

function App({ initialized }) {
	if (!initialized) {
		return (
			<div>Loading...</div>
		)
	} else {
		return (
			<div className='App py-3 bg-neutral-100 min-h-[100vh] justify-items-start'>
				<div className="container mx-auto grid grid-cols-12 px-4 items-start gap-3">
					<Header />
					<Sidebar />
					<main className='col-span-9 w-full rounded-md bg-white'>
						<Routes>
							<Route path="/profile/:userID?" element={<ProfileContainer />} />
							<Route path="/*" element={<div>404</div>} />
						</Routes>
					</main>
				</div>
			</div>
		);
	}
}

const AppContainer = ({ initializing, initialized }) => {
	useEffect(() => {
		initializing();
	}, [])

	return (
		<BrowserRouter>
			<React.StrictMode>
				<App initialized={initialized} />
			</React.StrictMode>
		</BrowserRouter>
	)
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized,
	}
}

export default connect(mapStateToProps, {
	initializing,
})(AppContainer);
