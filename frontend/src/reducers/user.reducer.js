// Permet de stocker les informations de l'utilisateur en front
import { GET_USER } from "../actions/user.actions";

const initialState = {}; // Créer un state de base vide que l'on fera évoluer

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER: 
            return action.payload;
        default: 
            return state;
    }
}