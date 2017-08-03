import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div id="about" className="text-center">
				<h1>about</h1>

				<div className="about-section inspiration col-xs-12 col-md-6 col-lg-4 col-lg-offset-2">
					<h2>project inspiration</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
				<div className="about-section col-xs-12 col-md-6 col-lg-4">
					<h2>technologies used</h2>
					<div className="technologies">
						<i className="devicon-bootstrap-plain-wordmark"></i>
						<i className="devicon-css3-plain-wordmark"></i>
						<i className="devicon-html5-plain-wordmark"></i>
						<i className="devicon-javascript-plain"></i>
						<i className="devicon-jquery-plain-wordmark"></i>
						<i className="devicon-mysql-plain-wordmark"></i>
						<i className="devicon-react-original-wordmark"></i>
						<i className="devicon-sass-original"></i>
					</div>
				</div>
				<div className="team-section col-xs-12 text-center">
					<h2>team members</h2>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2 col-lg-offset-2">
						<img src="/images/guido_bacce.png" />
						<h3>Guido Bacce</h3>
						<a href="https://www.linkedin.com/in/gbacce/" target="_blank"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/gbacce" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/marissa_monivis.png" />
						<h3>Marissa Monivis</h3>
						<a href="https://www.linkedin.com/in/marissamonivis/" target="_blank"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/mmonivis" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/merilee_wheelock.jpg" />
						<h3>Merilee Wheelock</h3>
						<a href="https://www.linkedin.com/in/merilee-wheelock-5337b86b/" target="_blank"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/merileewheelock" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/michael_gaynor.png" />
						<h3>Michael Gaynor</h3>
						<a href="https://www.linkedin.com/in/michael-gaynor-3997b123/" target="_blank"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/MichaelGaynor" target="_blank"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
				</div>
			</div>
		)
	}
}

export default About;