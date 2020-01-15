import React from 'react';
import { Ticket } from '../../../../types/ticket';
import './TicketItem.scss';

type Props = {
  ticket: Ticket
}

const TicketItem: React.FC<Props> = ({ ticket: { price, carrier, segments } }) => {

  const [
    {
      origin: directOrigin,
      destination: directDestination,
      stops: directStops,
      duration: directDuration
    },
    {
      origin: returnOrigin,
      destination: returnDestination,
      stops: returnStops,
      duration: returnDuration
    }] = segments;

  let directDate = new Date(segments[0].date);
  const directOriginHour = directDate.getHours();
  const directOriginMinute = directDate.getMinutes();
  directDate.setMinutes(directDate.getMinutes() + segments[0].duration);
  const directDestinationHour = directDate.getHours();
  const directDestinationMinute = directDate.getMinutes();

  let returnDate = new Date(segments[1].date);
  const returnOriginHour = returnDate.getHours();
  const returnOriginMinute = returnDate.getMinutes();
  returnDate.setMinutes(returnDate.getMinutes() + segments[0].duration);
  const returnDestinationHour = returnDate.getHours();
  const returnDestinationMinute = returnDate.getMinutes();

  return (
    <div className="TicketItem">
      <div className="MainInfo">
        <div className="Cost">
          {`${Math.floor(price / 1000)} ${(price + '').slice(-3)} Р`}
        </div>
        <img
          className="CarrierIcon"
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="CarrierIcon"
        />
      </div>

      <div className="FlightInfo">
        <div>
          <span className="InfoLabel">{`${directOrigin} - ${directDestination}`}</span>
          <span className="Info">
            {`${directOriginHour}:${directOriginMinute} - ${directDestinationHour}:${directDestinationMinute}`}
          </span>
        </div>

        <div>
          <span className="InfoLabel">В пути</span>
          <span className="Info">{`${Math.floor(directDuration / 60)}ч ${directDuration % 60}м`}</span>
        </div>

        <div>
          <span className="InfoLabel">
            {
              directStops.length
                ? `${directStops.length} пересадк${directStops.length === 1 ? "а" : "и"}`
                : "Без пересадок"
            }
          </span>
          <span className="Info">{directStops.map(stop => (`${stop} `))}</span>
        </div>

        <div>
          <span className="InfoLabel">{`${returnOrigin} - ${returnDestination}`}</span>
          <span className="Info">
            {`${returnOriginHour}:${returnOriginMinute} - ${returnDestinationHour}:${returnDestinationMinute}`}
          </span>
        </div>

        <div>
          <span className="InfoLabel">В пути</span>
          <span className="Info">{`${Math.floor(returnDuration / 60)}ч ${returnDuration % 60}м`}</span>
        </div>

        <div>
          <span className="InfoLabel">
            {
              returnStops.length
                ? `${returnStops.length} пересадк${returnStops.length === 1 ? "а" : "и"}`
                : "Без пересадок"
            }
          </span>
          <span className="Info">{returnStops.map(stop => (`${stop} `))}</span>
        </div>
      </div>
    </div>
  )
}

export default TicketItem;