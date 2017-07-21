import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component{
	render(){
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand" href="#">traveList</Link>
					</div>
					<ul className="nav navbar-nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/survey">Survey</Link></li>
						<li><Link to="/page2">Page 2</Link></li>
						<li><Link to="/page3">Page 3</Link></li>
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