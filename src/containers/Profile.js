import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileAction from '../actions/ProfileAction';
import $ from 'jquery';
import hostAddress from '../config';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            savedRoutes: []
        }
    }

    componentDidMount() {
        const url = hostAddress + '/profile'
        $.getJSON(url,(data)=>{
            this.setState({
                savedRoutes: data
            })
            console.log(this.state.savedRoutes)
        })
    }

    render(){
        // console.log(this.state.savedRoutes.name)
    	var userInfoArray = [
    		<div className="col-sm-2" key='1'>
    			<div>{this.state.savedRoutes.name}</div>
    			<div>{this.state.savedRoutes.email}</div>
    			<div>{this.state.savedRoutes.gender}</div>
    		</div>
    	]

        var savedRoutesArray = []

        this.state.savedRoutes.map((route, index)=>{
            savedRoutesArray.push(
                <div key={index}>
                    <div className="col-sm-offset-4 col-sm-4 text-center">            
                        <div>{this.state.savedRoutes[index].item}</div>
                    </div>
                </div> 
            )
        })

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
            	</div>
                <h4 className="col-sm-offset-4 col-sm-4 text-center">Saved Routes</h4>
                {savedRoutesArray}
            </div>
        )
    }
}

function mapStateToProps(state){
	return{
		profileInfo: state.profileReducer
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        profileAction: ProfileAction
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);