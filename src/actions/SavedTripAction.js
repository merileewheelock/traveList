import $ from 'jquery';
import config from '../config'

export default function(listData){


	var request = $.ajax({
		method: "POST",
		url: config.hostAddress + '/savedtrip',
		data: listData
	})

	return{
		type: "SAVEDTRIP",
		payload: request
	}
}