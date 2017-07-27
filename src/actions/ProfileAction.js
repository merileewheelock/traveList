import $ from 'jquery';
import hostAddress from '../config'

export default function(userData){
	var request = $.ajax({
		method: "GET",
		url: hostAddress + '/profile',
		data: userData
	})
	return{
		type: "PROFILE",
		payload: request
	}
}