import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTickets } from '../actions/tickets';
import { AppState } from '../store/configureStore';
import { AppActions } from '../types/actions';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import TicketsBlock from '../components/ticketsBlock';
import { Ticket } from '../types/ticket';

interface TicketsBlockContainerProps { }

interface State {
  filter: number[],
  tab: string
}

type Props = TicketsBlockContainerProps & LinkStateProps & LinkDispatchProps;

class TicketsBlockContainer extends Component<Props, State> {
  readonly state: State = {
    filter: [],
    tab: 'cheapest'
  }

  componentDidMount() {
    this.props.setTickets();
  }

  filterChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const filterIndex = +e.target.value - 1;

    if (!this.state.filter.includes(filterIndex)) {
      this.setState(state => ({ filter: [...state.filter, filterIndex] }))
    } else {
      this.setState(state => ({
        filter: [...state.filter.slice(0, state.filter.indexOf(filterIndex)),
        ...state.filter.slice(state.filter.indexOf(filterIndex) + 1)]
      }))
    }
  }

  tabChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ tab: e.target.value })
  }

  render() {
    const { tickets, loading, error } = this.props;
    let filteredTickets = [...tickets];

    if (this.state.filter.length && !this.state.filter.includes(-1)) {
      filteredTickets = filteredTickets.filter(ticket =>
        this.state.filter.includes(ticket.segments[0].stops.length) &&
        this.state.filter.includes(ticket.segments[1].stops.length))
    }

    if (tickets.length) {
      if (this.state.tab === 'cheapest') {
        filteredTickets = filteredTickets.sort((ticket1, ticket2) => ticket1.price - ticket2.price)
      } else {
        filteredTickets = filteredTickets.sort((ticket1, ticket2) =>
          ticket1.segments[0].duration + ticket1.segments[1].duration
          - ticket2.segments[0].duration - ticket2.segments[1].duration
        )
      }
    }

    return (
      <TicketsBlock
        tickets={filteredTickets.slice(0, 10)}
        loading={loading}
        error={error}
        filter={this.state.filter}
        tab={this.state.tab}
        tabChangeHandler={this.tabChangeHandler.bind(this)}
        filterChangeHandler={this.filterChangeHandler.bind(this)}
      />
    )
  }
}

interface LinkStateProps {
  tickets: Ticket[],
  loading: boolean,
  error: string
}

interface LinkDispatchProps {
  setTickets: () => void
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  tickets: state.tickets.tickets,
  loading: state.tickets.loading,
  error: state.tickets.error
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  setTickets: bindActionCreators(setTickets, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketsBlockContainer);