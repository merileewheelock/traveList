import React, { Component } from 'react';
import $ from 'jquery';

import Home from './containers/Home';
import HowItWorks from './components/HowItWorks';
import About from './components/About';

class Container extends Component {

	render() {

		$(window).scroll(function() {
		  if ($(this).scrollTop() <= 800) {
		    $('#single-page-content').addClass('colorOne')
		      .removeClass('colorTwo');
		  } else if ($(this).scrollTop() <= 1600) {
		    $('#single-page-content').addClass('colorTwo')
		      .removeClass('colorThree');
		  } else if ($(this).scrollTop() <= 2400) {
		    $('#single-page-content').addClass('colorThree')
		      .removeClass('colorFour');
		  } else {
		    $('#single-page-content').addClass('colorOne')
		  }
		});

		return (
			<div id="single-page-content" className="colorOne">
				<Home />
				<HowItWorks />
				<About />
			</div>
		)
	}
}

export default Container;