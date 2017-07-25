import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import hostAddress from '../config'

class Profile extends Component{
	constructor(props) {
		super(props);
	}

    render(){
    	// console.log(this.props.registerInfo)
    	var userInfoArray = [
    		<div className="col-sm-2" key='1'>
    			<div>{this.props.registerInfo.name}</div>
    			<div>{this.props.registerInfo.email}</div>
    			<div>{this.props.registerInfo.gender}</div>
    		</div>
    	]

        return(
        	<div className="user-profile">
            	<h1>User Profile</h1>
            	<div className="basic-user-info col-sm-offset-4 col-sm-2 text-right">
            		<div>Name:</div>
            		<div>Email:</div>
            		<div>Gender:</div>
            	</div>
            	{userInfoArray}
            	<div className="route-user-info col-sm-offset-4 col-sm-4 text-center">
            		<div><Link to="/survey">Add a Route</Link></div>
            		<div>View Saved Routes</div>
            	</div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return{
		registerInfo: state.registerReducer
	}
}

export default connect(mapStateToProps)(Profile)