import { getSearchIdURL, getTicketsURL } from './sourceURLs';
import { Ticket } from '../types/ticket';

export const getSearchId = async () => {
  try {
    const response = await fetch(getSearchIdURL);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке ифентификатора поиска: ${response.status}`)
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error('Ошибка:', error);
    return ('Ошибка при загрузке ифентификатора поиска');
  }
}

export const getTickets = async ({ searchId }: { searchId: string }) => {
  let tickets: Ticket[] = [];

  const getTicketsPack = async (searchId: string) => {
    const response = await fetch(`${getTicketsURL}?searchId=${searchId}`);
    if (response.status === 502) {
      await getTicketsPack(searchId);
    } else if (response.status !== 200) {
      await getTicketsPack(searchId);
    } else {
      let ticketsPack = await response.json();
      tickets = [...tickets, ...ticketsPack.tickets];
      if (!ticketsPack.stop) {
        await getTicketsPack(searchId);
      }
    }
  }

  await getTicketsPack(searchId);
  return (tickets)
}

