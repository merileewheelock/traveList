import $ from 'jquery';
import hostAddress from '../config'

export default function(loginData){
	var request = $.ajax({
		method: "POST",
		url: hostAddress + '/login',
		data: loginData
	})
	return{
		type: "REGISTER",
		payload: request
	}
}