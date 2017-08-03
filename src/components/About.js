import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div id="about" className="text-center">
				<h1>about</h1>

				<div className="about-section col-xs-12 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-3">
					<h2>Project Inspiration</h2>
				</div>
				<div className="about-section col-xs-12 col-sm-4 col-md-3">
					<h2>Technologies Used</h2>
				</div>
				<div className="about-section col-xs-12">
					<h2>About the Team</h2>
					<div className="team-member col-sm-2 col-sm-offset-2 col-xs-12">Guido Bacce</div>
					<div className="team-member col-sm-2 col-xs-12">Marissa Monivis</div>
					<div className="team-member col-sm-2 col-xs-12">Merilee Wheelock</div>
					<div className="team-member col-sm-2 col-xs-12">Michael Gaynor</div>
				</div>
			</div>
		)
	}
}

export default About;