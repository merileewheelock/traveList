import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer'

const rootReducer = combineReducers({
  weatherData: WeatherReducer
});

export default rootReducer;