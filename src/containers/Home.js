import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
	render(){
		return(
			<div className="container homepage">
				<div className="header-div">
					<img className="logo" src="/images/travelist_logo_white.png" alt="travelistLogo" />
					<h1 className="site-title">traveList</h1>
					<div className="howitworks"><Link to="/howitworks">How it Works</Link></div>
				</div>
			</div>
		)
	}
}

export default Home;