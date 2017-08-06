import $ from 'jquery';
import config from '../config'

export default function(loginData){
	var request = $.ajax({
		method: "POST",
		url: config.hostAddress + '/login',
		data: loginData
	})
	return{
		type: "REGISTER",
		payload: request
	}
}