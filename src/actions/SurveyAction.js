import $ from 'jquery';
import config from '../config'

export default function(surveyData){

	var request = $.ajax({
		method: "POST",
		url: config.hostAddress + '/survey',
		data: surveyData
	});
	return{
		type: "SURVEY",
		payload: request
	}
}