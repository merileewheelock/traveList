import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import RegisterReducer from './RegisterReducer';

const rootReducer = combineReducers({
	weatherData: WeatherReducer,
	registerReducer: RegisterReducer
});

export default rootReducer;