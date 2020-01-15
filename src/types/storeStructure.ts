import { Ticket } from './ticket';

export interface StoreStructure {
  searchId: string,
  tickets: Ticket[],
  loading: boolean,
  error: string
}