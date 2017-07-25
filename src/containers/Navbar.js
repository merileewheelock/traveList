import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class NavBar extends Component{

	render(){
		// console.log(this.props.registerInfo.name)
		if(this.props.registerInfo.name === undefined){
			var userLoginStatus = [
				<Link to="/login" key="1"><li>Login</li></Link>,
				<Link to="/register" key="2"><li>Register</li></Link>	
			]
		}else{
			userLoginStatus = [
				<Link to="/users" key="1"><li>Welcome, {this.props.registerInfo.name}</li></Link>,	
				<a href="http://localhost:3001/" key="2"><li>Logout</li></a>
				// THIS <a> TAG FORCES THE PAGE TO RERENDER AND LOGOUT. CHANGE ADDRESS WHEN LIVE.	
			]		
		}


		return(
			<nav role="navigation">
				<div id="menuToggle">
				    <input type="checkbox" />

					<span></span>
					<span></span>
					<span></span>
				    
					<ul id="menu">
						<Link to="/"><li>Home</li></Link>
						<Link to="/"><li>How It Works</li></Link>
						<Link to="/"><li>About</li></Link>
						<hr className="linebreak" />
						{userLoginStatus}
						{/*<Link to="/login"><li>Login</li></Link>
						<Link to="/register"><li>Register</li></Link>*/}
					</ul>
                    {/*<ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>*/}
				</div>
			</nav>
		)
	}
}

function mapStateToProps(state){
	return{
		registerInfo: state.registerReducer
	}
}

export default connect(mapStateToProps)(NavBar)