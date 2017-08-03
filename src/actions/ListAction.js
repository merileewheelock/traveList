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


// import $ from 'jquery';

// export default function(token){
// 	// console.log(token)
// 	var dataToPass = {
// 		token: token
// 	}
// 	var thePromise = $.ajax({
// 		method: "POST",
// 		url: window.hostAddress + '/getCart',
// 		data: dataToPass
// 	});
// 	return{
// 		type: "UPDATE_CART",
// 		payload: thePromise
// 	}
// }