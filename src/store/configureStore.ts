import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import ticketsReducer from '../reducers/tickets';
import { AppActions } from '../types/actions';

export const rootReducer = combineReducers({
  tickets: ticketsReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));