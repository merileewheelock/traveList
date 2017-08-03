import React, { Component } from 'react';


class HowItWorks extends Component{
	render(){
		return(
			<div className="hiw-container-div text-center" id="howitworks">
				<h1 className="text-center page-title">how it works</h1>
				<div className="row how-boxes-row">
					<div className="how-box col-xs-12 col-sm-4 col-lg-2 col-lg-offset-3">
						<div className="step-number"><h1>1</h1></div>
						<div className="step-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
						<div className="steps">Create a user profile</div>
					</div>
					<div className="how-box col-xs-12 col-sm-4 col-lg-2">
						<div className="step-number"><h1>2</h1></div>
						<div className="step-icon"><i className="fa fa-question-circle-o" aria-hidden="true"></i></div>
						<div className="steps">Complete a short trip survey</div>
					</div>
					<div className="how-box col-xs-12 col-sm-4 col-lg-2">
						<div className="step-number"><h1>3</h1></div>
						<div className="step-icon"><i className="fa fa-check-circle-o" aria-hidden="true"></i></div>
						<div className="steps">Enjoy a stress-free trip!</div>
					</div>
				</div>
			</div>
		)
	}
}

export default HowItWorks;