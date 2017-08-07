import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './containers/Navbar';
import Survey from './containers/Survey';
import Login from './containers/Login';
import Register from './containers/Register';
import Profile from './containers/Profile';
import ListView from './containers/ListView';
import SavedTrip from './containers/SavedTrip';
import Container from './Container';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div>
						<Route exact path="/" component={Container} />
						<Route exact path="/howitworks" component={Container} />
						<Route exact path="/about" component={Container} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/survey" component={Survey} />
						<Route exact path="/listview" component={ListView} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/savedtrip" component={SavedTrip} />
					</div>

				</div>
			</Router>
		);
	}
}

export default App;
