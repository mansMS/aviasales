import { Ticket } from './ticket';

export const FETCH_SEARCH_ID_REAUEST = 'FETCH_SEARCH_ID_REAUEST';
export const FETCH_SEARCH_ID_SUCCESS = 'FETCH_SEARCH_ID_SUCCESS';

export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';


export interface SearchIdRequestAction {
  type: typeof FETCH_SEARCH_ID_REAUEST
}

export interface SearchIdLoadtAction {
  type: typeof FETCH_SEARCH_ID_SUCCESS,
  searchId: string
}
export interface TicketsLoadtAction {
  type: typeof FETCH_TICKETS_SUCCESS,
  tickets: Ticket[]
}
export interface TicketsErrortAction {
  type: typeof FETCH_TICKETS_FAILURE,
  error: string
}

export type TicketsActionTypes =
  | SearchIdRequestAction
  | SearchIdLoadtAction
  | TicketsLoadtAction
  | TicketsErrortAction;


export type AppActions = TicketsActionTypes;