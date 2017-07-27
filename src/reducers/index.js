import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import RegisterReducer from './RegisterReducer';
import ListReducer from './ListReducer';
import SurveyReducer from './SurveyReducer';

const rootReducer = combineReducers({
	weatherData: WeatherReducer,
	registerReducer: RegisterReducer,
	listReducer: ListReducer,
	surveyReducer: SurveyReducer
});

export default rootReducer;