import React, {Component} from 'react'
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginAction from '../actions/LoginAction';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap'

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			registerMessage: "",
			formError: false
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(event){
		event.preventDefault();
		console.log("User Submitted the form!!")
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
		console.log(nextProps)
		if(nextProps.registerResponse.msg === 'loginSuccess'){
			// console.log(nextProps.registerResponse.token)
			this.props.getCart(nextProps.registerResponse.token)
			this.props.history.push('/');
		}else if(nextProps.registerResponse.msg === 'userAlreadyExists'){
			// Username already taken
			this.setState({
				registerMessage: "Sorry, this username is already taken."
			})
		}		
	}

	render(){
		return(
			<div>
				<h1 className="text-center">Login</h1>
				<h3 className="text-center">{this.state.registerMessage}</h3>
				<Form horizontal onSubmit={this.handleLogin}>
					<FormGroup controlId="formHorizontalName">
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
					<FormGroup>
						<Col smOffset={2} sm={8}>
							<Button bsStyle="primary" type="submit">
								Login
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
		loginAction: LoginAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);