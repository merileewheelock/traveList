import $ from 'jquery';
import config from '../config'

export default function(itemInfo){


	var request = $.ajax({
		method: "POST",
		url: config.hostAddress + '/userPackingList',
		itemInfo: itemInfo
	})

	return{
		type: "USER_PACKING_LIST",
		payload: request
	}
}