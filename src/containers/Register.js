import React, {Component} from 'react';
import { Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap';
import  {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
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
		// console.log("User Submitted the form!!")
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
		// console.log(nextProps.registerResponse)
		if(nextProps.registerResponse.msg === 'userInserted'){
			// console.log("User added!")
			this.props.history.push('/survey');
		}else if(nextProps.registerResponse.msg === 'userAlreadyExists'){
			// console.log("User name taken!")
			this.setState({
				registerMessage: "Sorry, this username is already taken."
			})
		}		
	}

	render(){
		return(
			<div className="login-register">
				<Col mdOffset={4} md={4} smOffset={3} sm={6} xsOffset={2} xs={8} className="login-input-box">
					<h1 className="text-center">Register</h1>
					<h3 className="text-center">{this.state.registerMessage}</h3>
					<Form horizontal onSubmit={this.handleRegistration}>
						<FormGroup controlId="formHorizontalName">
							<Col smOffset={1} sm={10} className="login-field-title">
								Name
							</Col>
							<Col smOffset={1} sm={10}>
								<FormControl className="login-input-bar" type="text" name="fullName" placeholder="Full Name" />
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalName">
							<Col smOffset={1} sm={10} className="login-field-title">
								Email
							</Col>
							<Col smOffset={1} sm={10}>
								<FormControl className="login-input-bar" type="email" name="email" placeholder="Email" />
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalName">
							<Col smOffset={1} sm={10} className="login-field-title">
								Password
							</Col>
							<Col smOffset={1} sm={10}>
								<FormControl className="login-input-bar" type="password" name="password" placeholder="Password" />
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalName">
							<Col smOffset={1} sm={10} className="login-field-title">
								Gender
							</Col>
							<Col smOffset={1} sm={10}>
								<FormControl className="login-input-bar" type="text" name="gender" placeholder="Gender" />
							</Col>
						</FormGroup>
						<FormGroup>
							<Col className="text-center login-button">
								<Button bsStyle="primary" type="submit">
									Register
								</Button>
							</Col>
						</FormGroup>
					</Form>
					<p className="text-center">
						Or click <Link to="/login">here</Link> to login
					</p>
				</Col>
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