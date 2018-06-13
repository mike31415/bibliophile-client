import {combineReducers} from 'redux';
import booksReducer from './books';
import filtersReducer from './filters';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
    filters: filtersReducer
});

export default rootReducer;