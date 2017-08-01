import $ from 'jquery';
import hostAddress from '../config'

export default function(listData){
	var request = $.ajax({
		method: "POST",
		url: hostAddress + '/listview',
		data: listData
	})

	return{
		type: "LISTVIEW",
		payload: request
	}
}