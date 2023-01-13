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
			<div className="App">
				<Header />
				<Sidebar />
				<main>
					<Routes>
						<Route path="/profile/:userID?" element={<ProfileContainer />} />
					</Routes>
				</main>
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
