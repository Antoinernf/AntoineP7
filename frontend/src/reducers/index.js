// Permet de regrouper tout les reduceurs
import { combineReducers } from 'redux';
import useReducer from './user.reducer'; // Importe notre user reducer

export default combineReducers({
    useReducer,
})