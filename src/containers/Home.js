import React, {Component} from 'react';
// import { Link } from 'react-router-dom';

class Home extends Component{
	render(){

		

		return(
			<div className="container homepage" id="home">
				<div className="header-div">
					<img className="logo" src="/images/travelist_logo_white.png" alt="travelistLogo" />
					<h1 className="site-title">traveList</h1>
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