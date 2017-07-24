import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import  {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction';
import {connect} from 'react-redux';


class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			registerMessage: "",
			formError: false
		}
		this.handleRegistration = this.handleRegistration.bind(this);
	}

	handleRegistration(event){
		event.preventDefault();
		console.log("User Submitted the form!!")
		var name = event.target[0].value
		var email = event.target[1].value
		var password = event.target[2].value
		var gender = event.target[3].value
		var error = false;

		if(error){
			this.setState({
				formError: true
			}) 
		}else{
			this.props.registerAction({
				name: name,
				email: email,
				password: password,
				gender: gender
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.registerResponse)
		if(nextProps.registerResponse.msg === 'userInserted'){
			console.log("User added!")
			this.props.history.push('/');
		}else if(nextProps.registerResponse.msg === 'userAlreadyExists'){
			console.log("User name taken!")
			this.setState({
				registerMessage: "Sorry, this username is already taken."
			})
		}		
	}

	render(){
		return(
			<div className="container register-wrapper">
				<h1 className="text-center">Register</h1>
				<h3 className="text-center">{this.state.registerMessage}</h3>
				<Form horizontal onSubmit={this.handleRegistration}>
					<FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
						<Col componentClass={ControlLabel} sm={2}>
							Name
						</Col>
						<Col sm={8}>
							<FormControl type="text" name="fullName" placeholder="Full Name" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={8}>
							<FormControl type="email" name="email" placeholder="Email" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={8}>
							<FormControl type="password" name="password" placeholder="Password" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Gender
						</Col>
						<Col sm={8}>
							<FormControl type="text" name="gender" placeholder="Gender" />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={8}>
							<Button bsStyle="primary" bsSize="small" type="submit">
								Register
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		registerResponse: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch)
}

// export default Register;
export default connect(mapStateToProps,mapDispatchToProps)(Register);