import React from 'react';
import './FilterSection.scss';

type Props = {
  filter: number[],
  filterChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterSection: React.FC<Props> = ({ filter, filterChangeHandler }) => {

  const filterOptions: string[] = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  return (
    <section className="FilterSection">
      <div className="FilterBlock">
        <p className="FilterHeader">Количество пересадок</p>
        <ul className="FilterList">
          {
            filterOptions.map((label, index) => (
              <li className="FilterItem" key={index}>
                <input
                  className="FilterItemInput"
                  type="checkbox"
                  id={`checkbox_${index}`}
                  value={index}
                  checked={filter.includes(index - 1)}
                  onChange={filterChangeHandler}
                />
                <label className="FilterItemLabel" htmlFor={`checkbox_${index}`}>{label}</label>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default FilterSection;