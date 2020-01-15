import React from 'react';
import TicketItem from './ticketItem';
import Spinner from '../../spinner';
import { Ticket } from '../../../types/ticket';
import './TicketSection.scss';

type Props = {
  tickets: Ticket[],
  loading: boolean
}

const TicketSection: React.FC<Props> = ({ tickets, loading }) => {
  return (
    <section className="TicketSection">
      {
        loading
          ? <div className="Loading-Error"><Spinner /></div>
          : tickets.length
            ? tickets.map((ticket, index) => <TicketItem ticket={ticket} key={index} />)
            : <p className="Loading-Error">Нет данных</p>
      }
    </section>
  )
}

export default TicketSection;