import $ from 'jquery';
import hostAddress from '../config'

export default function(userData){
	var request = $.ajax({
		method: "POST",
		url: hostAddress + '/register',
		data: userData
	})
	return{
		type: "REGISTER",
		payload: request
	}
}