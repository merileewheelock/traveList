import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component{
	render(){

		$(window).bind('scroll', function() {
		     if ($(window).scrollTop() > 100) {
		         $('.next-page-div').fadeOut("slow");
		     }
		     else {
		         $('.next-page-div').fadeIn("slow");
		     }
		});	

		return(
			<div className="homepage" id="home">
				<div className="header-div">
					<img className="logo" src="/images/travelist_logo_white.png" alt="travelistLogo" />
					<h1 className="site-title">traveList</h1>
					<h2 className="site-tagline">helping you plan for a stress-free travel experience</h2>
					<div className="home-button"><Link to="/register" className="get-started-button">let's get started</Link></div>
				</div>
				<div className="next-page-div">
					<div className="next-page-title">how it works</div>
					<div className="next-page-arrow-left"></div><div className="next-page-arrow-right"></div>
				</div>
			</div>
		)
	}
}

export default Home;