import { Dispatch } from 'redux';
import { getSearchId, getTickets } from '../services/ticketsServices';
import {
  FETCH_SEARCH_ID_REAUEST,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  AppActions
} from "../types/actions";
import { Ticket } from "../types/ticket";


export const searchIdRequested = (): AppActions => {
  return {
    type: FETCH_SEARCH_ID_REAUEST
  }
}

export const searchIdLoaded = (searchId: string): AppActions => {
  return {
    type: FETCH_SEARCH_ID_SUCCESS,
    searchId
  }
}

export const ticketsLoaded = (tickets: Ticket[]): AppActions => {
  return {
    type: FETCH_TICKETS_SUCCESS,
    tickets
  }
}

export const ticketsError = (error: string): AppActions => {
  return {
    type: FETCH_TICKETS_FAILURE,
    error
  }
}

export const setTickets = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(searchIdRequested());
  getSearchId()
    .then(response => {
      dispatch(searchIdLoaded(response));
      return getTickets(response);
    })
    .then(response => {
      dispatch(ticketsLoaded(response))
    })
    .catch(error => dispatch(ticketsError(error.message)))
}