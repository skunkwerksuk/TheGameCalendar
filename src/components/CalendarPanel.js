import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../images/left-arrow-new.svg';
import { ReactComponent as RightArrow } from '../images/right-arrow-new.svg';

// const filters = [
//   {
//     name: 'Xbox One',
//     value: 'xboxOne'
//   },
//   {
//     name: 'Xbox Series',
//     value: 'xboxSeries'
//   },
//   {
//     name: 'PlayStation 4',
//     value: 'ps4'
//   },
//   {
//     name: 'PlayStation 5',
//     value: 'ps5'
//   },
//   {
//     name: 'Nintendo Switch',
//     value: 'nintendoSwitch'
//   },
//   {
//     name: 'PC',
//     value: 'pc'
//   },
//   {
//     name: 'Stadia',
//     value: 'stadia'
//   },
// ];

// gamelist.sort((a, b) => {
//   if ( a.game.hypes > b.game.hypes ){ return -1; }
//   if ( a.game.hypes < b.game.hypes ){ return 1; }
//   return 0;
// });
function CalendarPanel(props) {
  const params = useParams();
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // const monthNamesShort = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const thisMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(thisMonth);
  const [monthNameLong, setMonthNameLong] = useState(monthNames[thisMonth-1]);
  // const [monthNameShort, setMonthNameShort] = useState(monthNamesShort[thisMonth-1]);

  useEffect(() => {
    const newMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);

    setYear(params.year ? parseInt(params.year) : (new Date().getFullYear()));
    setMonth(newMonth);
    setMonthNameLong(monthNames[newMonth-1]);
    // setMonthNameShort(monthNamesShort[newMonth-1]);
  }, [params.year, params.month]);

  return <div className="calendar-panel-wrapper body-wrapper" id="sidePanel">
    <div className="calendar-panel body-container">
      <div className="month-navigation">
        {
          props.yearBoundary === -4 ?
            <button className="nav-icon disabled" disabled><LeftArrow /></button> :
            <Link className="nav-icon" to={`/month-view/${month-1}/${year}`} onClick={props.prevMonth}><LeftArrow /></Link>
        }
        <div className="description">
          <h3 className="month-name">{monthNameLong}, {year}</h3>
          {/* <h3 className="month-name-short">{monthNameShort}</h3> */}
        </div>
        {
          props.yearBoundary === 4 ?
            <button className="nav-icon disabled" disabled><RightArrow /></button> :
            <Link className="nav-icon" to={`/month-view/${month+1}/${year}`} onClick={props.nextMonth}><RightArrow /></Link>
        }
      </div>
    </div>

    {/* <div className="search m-b-30">
      <label htmlFor="searchBox" className="search-label u-display-none">Search for upcoming games</label>
      <input id="searchBox" className="input" onChange={props.search} placeholder="Search" />
    </div> */}
    
    {/* <div className="filters">
      <label>Filter</label>
      <div>
        {filters.map((filterItem, index) => (
          <span className="checkable" key={index}>
            <input onChange={props.setFilters} type="checkbox" name={filterItem.value} value={filterItem.name} id={filterItem.value} className="filter-checkbox" />
            <label htmlFor={filterItem.value} id={filterItem.value + 'checkbox'}>{filterItem.name}</label>
          </span>
        ))}
      </div>
      <button className="button primary m-t-10" onClick={props.clearFilters}>Clear</button>
    </div> */}
  </div>;
}

export default CalendarPanel;
