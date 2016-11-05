import {
	browserHistory, 
	hashHistory
} from 'react-router';

export const define_history = hashHistory;
export const route_history = function(){
	return browserHistory;
}
