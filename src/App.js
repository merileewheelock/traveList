import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeatherSearchBar from './containers/WeatherSearchBar';
import WeatherDiv from './containers/WeatherDiv';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<WeatherSearchBar />
					<WeatherDiv />
				</div>
			</Router>
		);
	}
}

export default App;
