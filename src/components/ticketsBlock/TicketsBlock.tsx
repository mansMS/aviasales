import React from 'react';
import logo from './logo.png';
import FilterSection from './filterSection';
import Tabs from './tab';
import TicketSection from './ticketSection';
import { Ticket } from '../../types/ticket';
import './TicketsBlock.scss';

type Props = {
  tickets: Ticket[],
  loading: boolean,
  error: string,
  filter: number[],
  tab: string,
  filterChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  tabChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TicketsBlock: React.FC<Props> = ({
  tickets,
  loading,
  error,
  filter,
  tab,
  filterChangeHandler,
  tabChangeHandler }) => {

  if (error) return <p>Ошибка загрузки: {error}</p>

  return (
    <div className="TicketsContainer">
      <section className="Logo"><img src={logo} alt="logo" /></section>
      <FilterSection filter={filter} filterChangeHandler={filterChangeHandler} />
      <Tabs tab={tab} tabChangeHandler={tabChangeHandler} />
      <TicketSection tickets={tickets} loading={loading} />
    </div>
  )
}

export default TicketsBlock;