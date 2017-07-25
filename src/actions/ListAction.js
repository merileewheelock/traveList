import $ from 'jquery';
import hostAddress from '../config'

export default function(listData){
	var request = $.ajax({
		method: "GET",
		url: hostAddress + '/listview',
		data: listData
	})

	return{
		type: "LISTVIEW",
		payload: request
	}
}