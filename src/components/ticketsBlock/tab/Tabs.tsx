import React from 'react';
import './Tabs.scss';

type Props = {
  tab: string,
  tabChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Tabs: React.FC<Props> = ({ tab, tabChangeHandler }) => {
  return (
    <section className="Tabs">
      <div className="TabsRadio">
        <input
          className="RadioInput"
          type="radio"
          name="radioTab"
          id="cheapestRadio"
          checked={tab === "cheapest"}
          value={"cheapest"}
          onChange={tabChangeHandler}
        />
        <label className="RadioLabel" htmlFor="cheapestRadio">Самый дешевый</label>
      </div>
      <div className="TabsRadio">
        <input
          className="RadioInput"
          type="radio"
          name="radioTab"
          id="fastestRadio"
          checked={tab === "fastest"}
          value={"fastest"}
          onChange={tabChangeHandler}
        />
        <label className="RadioLabel" htmlFor="fastestRadio">Самый быстрый</label>
      </div>
    </section>
  )
}

export default Tabs;