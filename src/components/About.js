import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div id="about" className="text-center">
				<h1>about</h1>

				<div className="about-section inspiration col-xs-12 col-md-6 col-lg-4 col-lg-offset-2">
					<h2>project inspiration</h2>
					<p>traveList was developed as a final Full-Stack Web Development project by a team of students at <a href="http://www.digitalcrafts.com/" target="_blank" rel="noopener noreferrer">DigitalCrafts</a>. The project was inspired by a friend who went on a business trip and noted the difference in packing for business and for leisure. The team was motivated to develop a tool to help travelers stay organized and prepared during all types of travel.</p>
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
						<img src="/images/guido_bacce.png" alt="guido_bacce" />
						<h3>Guido Bacce</h3>
						<a href="https://www.linkedin.com/in/gbacce/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/gbacce" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/marissa_monivis.png" alt="marissa_monivis" />
						<h3>Marissa Monivis</h3>
						<a href="https://www.linkedin.com/in/marissamonivis/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/mmonivis" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/merilee_wheelock.jpg" alt="merilee_wheelock" />
						<h3>Merilee Wheelock</h3>
						<a href="https://www.linkedin.com/in/merilee-wheelock-5337b86b/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/merileewheelock" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
					<div className="team-member col-sm-6 col-xs-12 col-md-3 col-lg-2">
						<img src="/images/michael_gaynor.png" alt="michael_gaynor" />
						<h3>Michael Gaynor</h3>
						<a href="https://www.linkedin.com/in/michael-gaynor-3997b123/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i></a>
						<a href="https://github.com/MichaelGaynor" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a>
					</div>
				</div>
			</div>
		)
	}
}

export default About;