import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Home extends Component{
	render(){
		return(
			<div>
				<h1>Welcome page</h1>
				<p><Link to="/register">Register</Link> or <Link to="/login">Login</Link> to begin</p>
			</div>
		)
	}
}

export default Home;