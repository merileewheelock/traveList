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
            savedTrips: []
        }
    }

    componentDidMount() {
        const url = hostAddress + '/profile'
        $.getJSON(url,(data)=>{
            this.setState({
                savedTrips: data
            })
        })
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

        var savedTripsArray = []

        this.state.savedTrips.map((trip, index)=>{
            if((this.state.savedTrips[index].email == this.props.registerInfo.email) && (this.state.savedTrips[index].tripType == undefined)){
                savedTripsArray.push(
                    <div className="col-sm-offset-4 col-sm-4 text-center" key={index}>
                        No saved routes
                    </div>
                )
            }else if (this.state.savedTrips[index].email == this.props.registerInfo.email){
                savedTripsArray.push(
                    <div key={index}>
                        <div className="col-sm-offset-4 col-sm-4 text-center">            
                            <div className="savedRoutesLink">
                                <Link to="/listview">
                                    <span>{this.state.savedTrips[index].tripType} | </span>
                                    <span>{this.state.savedTrips[index].tripSetting} | </span>
                                    <span>{this.state.savedTrips[index].destination} | </span>
                                    <span>{this.state.savedTrips[index].children}</span>
                                </Link>
                            </div>
                        </div>
                    </div> 
                )
            }
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
            	<div className="trip-user-info col-sm-offset-4 col-sm-4 text-center">
            		<div><Link to="/survey">Add a Trip</Link></div>
            	</div>
                <h4 className="col-sm-offset-4 col-sm-4 text-center">Saved Trips</h4>
                {savedTripsArray}
            </div>
        )
    }
}

function mapStateToProps(state){
	return{
		profileInfo: state.profileReducer,
        registerInfo: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        profileAction: ProfileAction
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);