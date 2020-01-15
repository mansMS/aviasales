import { StoreStructure } from '../types/storeStructure';
import { TicketsActionTypes } from '../types/actions';
import {
  FETCH_SEARCH_ID_REAUEST,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE
} from "../types/actions";

const initialState: StoreStructure = {
  searchId: '',
  tickets: [],
  loading: false,
  error: ''
}

export default (state = initialState, action: TicketsActionTypes): StoreStructure => {
  switch (action.type) {
    case FETCH_SEARCH_ID_REAUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_SEARCH_ID_SUCCESS:
      return {
        ...state,
        searchId: action.searchId
      }
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.tickets,
        loading: false,
        error: ''
      }
    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}