import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import $ from 'jquery';

class NavBar extends Component{

	render(){
		// console.log(this.props.registerInfo.name)
		if(this.props.registerInfo.name === undefined){
			var userLoginStatus = [
				<li className="menu-item" key="1"><Link to="/login">Login</Link></li>,
				<li className="menu-item" key="2"><Link to="/register">Register</Link></li>	
			]
		}else{
			userLoginStatus = [
				<li className="menu-item" key="1"><Link to="/profile">Welcome, {this.props.registerInfo.name}</Link></li>,
				<li className="menu-item" key="2"><Link to="/profile">User Profile</Link></li>,	
				<li className="menu-item" key="3"><a href="http://localhost:3001/">Logout</a></li>
				// THIS <a> TAG FORCES THE PAGE TO RERENDER AND LOGOUT. CHANGE ADDRESS WHEN LIVE.	
			]		
		}

		$(function(){
		 $('.menu-item').click(function(){
		  $('input[type="checkbox"]').prop('checked', false);
		 });
		});

		return(
			<nav role="navigation">
				<div id="menuToggle">
				    <input type="checkbox" />

					<span></span>
					<span></span>
					<span></span>
				    
					<ul id="menu">
						<li className="menu-item"><a href="/">Home</a></li>
						<li className="menu-item"><a href="/#howitworks">How It Works</a></li>
						<li className="menu-item"><a href="/#about">About</a></li>
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