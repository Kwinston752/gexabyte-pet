import { combineReducers } from 'redux';
import { accountReducer } from './account/reducer';
import { fullWeatherReducer } from './fullWeather/reducer';

const rootReducer = combineReducers({
  account: accountReducer,
  fullWeather: fullWeatherReducer
});

export default rootReducer;