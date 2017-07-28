import React, { Component } from 'react';

class HowItWorks extends Component{
	render(){
		return(
			<div className="hiw-container-div" id="howItWorks">
				<h1 className="text-center page-title">HOW IT WORKS</h1>
				<div className="row how-boxes-row">
					<div className="how-box col-sm-2 col-sm-offset-2">1</div>
					<div className="how-box col-sm-2 col-sm-offset-1">2</div>
					<div className="how-box col-sm-2 col-sm-offset-1">3</div>
				</div>
			</div>
		)
	}
}

export default HowItWorks;