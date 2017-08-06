import React, {Component} from 'react'
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoginAction from '../actions/LoginAction';
import { Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap'

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			loginMessage: "",
			formError: false
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(event){
		event.preventDefault();
		// console.log("User Submitted the form!!")
		var email = event.target[0].value
		var password = event.target[1].value
		var error = false;

		if(error){
			this.setState({
				formError: true,
			}) 
		}else{
			this.props.loginAction({
				email: email,
				password: password
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
		if(nextProps.loginResponse.msg === 'loginSuccess'){
			// console.log(nextProps.loginResponse.token)
			// console.log("User is logged in")
			this.props.history.push('/survey');
		}else if(nextProps.loginResponse.msg === 'badEmail'){
			// Username already taken
			this.setState({
				loginMessage: "Sorry, that is not a valid email."
			})
		}else if(nextProps.loginResponse.msg === 'wrongPassword'){
			this.setState({
				loginMessage: "Password is incorrect."
			})
		}
	}

	render(){
		return(
			<div className="login-register">
				<Col mdOffset={4} md={4} smOffset={3} sm={6} xsOffset={2} xs={8} className="login-input-box">
					<h1 className="text-center">Login</h1>
					<h3 className="text-center">{this.state.loginMessage}</h3>
					<Form horizontal onSubmit={this.handleLogin}>
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
						<FormGroup>
							<Col className="text-center login-button">
								<Button bsStyle="primary" type="submit">
									Login
								</Button>
							</Col>
						</FormGroup>
					</Form>	
					<p className="text-center">
						Or click <Link to="/register">here</Link> to register
					</p>
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		loginResponse: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);