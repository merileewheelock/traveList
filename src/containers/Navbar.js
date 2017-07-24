import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component{
	render(){
		return(
			<nav role="navigation">
				<div id="menuToggle">
				    <input type="checkbox" />

				    <span></span>
				    <span></span>
				    <span></span>
				    
				    <ul id="menu">
				      <a href="#"><li>Home</li></a>
				      <a href="#"><li>How It Works</li></a>
				      <a href="#"><li>About</li></a>
				      <hr className="linebreak" />
				      <a href="#"><li>Login</li></a>
				      <a href="#"><li>Register</li></a>
				    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
				</div>
			</nav>
		)
	}
}

export default NavBar;