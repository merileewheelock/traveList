import React, { Component } from 'react';


class HowItWorks extends Component{
	render(){
		return(
			<div className="hiw-container-div" id="howitworks">
				<h1 className="text-center page-title">HOW IT WORKS</h1>
				<div className="row how-boxes-row">
					<div className="how-box col-sm-2 col-sm-offset-2">
						<h3>Step 1</h3>
						<p>Fill out our survey letting us know what kind of trip it is and where you're going.</p>
					</div>
					<div className="how-box col-sm-2 col-sm-offset-1">
						<h3>Step 2</h3>
						<p>Edit the recommended list to include anything we forgot.</p>
					</div>
					<div className="how-box col-sm-2 col-sm-offset-1">
						<h3>Step 3</h3>
						<p>Enjoy your stress-free trip courtesy of TraveList!</p>
					</div>
				</div>
			</div>
		)
	}
}

export default HowItWorks;