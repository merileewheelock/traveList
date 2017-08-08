import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileAction from '../actions/ProfileAction';
import $ from 'jquery';
import config from '../config';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            savedTrips: []
        }
    }

    componentDidMount() {
        const url = config.hostAddress + '/profile'
        $.getJSON(url,(data)=>{
            this.setState({
                savedTrips: data
            })
        })
    }

    render(){
        // console.log(this.props.registerInfo)
    	var userInfoArray = [
    		<div className="col-xs-6" key='1'>
    			<div>{this.props.registerInfo.name}</div>
    			<div>{this.props.registerInfo.email}</div>
    			<div>{this.props.registerInfo.gender}</div>
    		</div>
    	]

        var savedTripsArray = []

        this.state.savedTrips.map((trip, index)=>{
            // console.log(this.state.savedTrips)
            {/*if((this.state.savedTrips[index].email === this.props.registerInfo.email) && (this.state.savedTrips[index].tripType === undefined)){
                savedTripsArray.push(
                    <div className="text-center" key={index}>
                        No saved trips
                    </div>
                )
            }*/}
            if (this.state.savedTrips[index].email === this.props.registerInfo.email){
                savedTripsArray.push(
                    <div key={index}>
                        <div className="row text-center">            
                            <div className="saved-trips-link">
                                <Link to="/listview">
                                    <div className="col-xs-4">{this.state.savedTrips[index].tripType}</div>
                                    <div className="col-xs-4">{this.state.savedTrips[index].tripSetting}</div>
                                    <div className="col-xs-4">{this.state.savedTrips[index].children}</div>
                                </Link>
                            </div>
                        </div>
                    </div> 
                )
            }
        })

        return(
        	<div className="user-profile col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10">
            	<h1 className="text-center">User Profile</h1>
                <div className="row basic-user-info">
                	<div className="col-xs-6 text-right">
                		<div>Name:</div>
                		<div>Email:</div>
                		<div>Gender:</div>
                	</div>
                	{userInfoArray}
                </div>
                <div className="add-trip">
                    <h2>Trip History</h2>
                    <Link to="/survey" className="add-trip-button"><i className="fa fa-plus" aria-hidden="true"></i>Add Trip</Link>
                </div>
                <div className="saved-trips-table text-center">            
                    <div className="saved-header col-xs-4">Trip Type</div>
                    <div className="saved-header col-xs-4">Setting</div>
                    <div className="saved-header col-xs-4">Children/Babies</div>
                </div>
                <hr />
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