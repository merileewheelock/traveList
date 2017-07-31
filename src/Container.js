import React, { Component } from 'react';

import Home from './containers/Home';
import HowItWorks from './components/HowItWorks';
import About from './components/About';

class Container extends Component {
	render() {
		return (
			<div className="single-page-content">
				<Home />
				<HowItWorks />
				<About />
			</div>
		)
	}
}

export default Container;