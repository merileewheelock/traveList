import $ from 'jquery';
import hostAddress from '../config'

export default function(surveyData){
	console.log()

	var request = $.ajax({
		method: "POST",
		url: hostAddress + '/survey',
		data: surveyData
	});
	return{
		type: "SURVEY",
		payload: request
	}
}