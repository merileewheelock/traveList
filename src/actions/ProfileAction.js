import $ from 'jquery';
import config from '../config'

export default function(userData){
	var request = $.ajax({
		method: "GET",
		url: config.hostAddress + '/profile',
		data: userData
	})
	return{
		type: "PROFILE",
		payload: request
	}
}