import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import RegisterReducer from './RegisterReducer';
import ListReducer from './ListReducer';

const rootReducer = combineReducers({
	weatherData: WeatherReducer,
	registerReducer: RegisterReducer,
	listReducer: ListReducer
});

export default rootReducer;