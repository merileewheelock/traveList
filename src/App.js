import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<h1>traveList</h1>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
