import $ from 'jquery';
import config from '../config'

export default function(userData){
	var request = $.ajax({
		method: "POST",
		url: config.hostAddress + '/register',
		data: userData
	})
	return{
		type: "REGISTER",
		payload: request
	}
}