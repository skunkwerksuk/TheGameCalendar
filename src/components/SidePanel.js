import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import rArrow from '../images/rArrow.svg';
import lArrow from '../images/lArrow.svg';

const filters = [
  {
    name: 'Xbox One',
    value: 'xboxOne'
  },
  {
    name: 'Xbox Series',
    value: 'xboxSeries'
  },
  {
    name: 'PlayStation 4',
    value: 'ps4'
  },
  {
    name: 'PlayStation 5',
    value: 'ps5'
  },
  {
    name: 'Nintendo Switch',
    value: 'nintendoSwitch'
  },
  {
    name: 'PC',
    value: 'pc'
  },
  {
    name: 'Stadia',
    value: 'stadia'
  },
];

function SidePanel(props) {
  const params = useParams();
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNamesShort = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const thisMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(thisMonth);
  const [monthNameLong, setMonthNameLong] = useState(monthNames[thisMonth-1]);
  const [monthNameShort, setMonthNameShort] = useState(monthNamesShort[thisMonth-1]);

  useEffect(() => {
    const newMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);

    setYear(params.year ? parseInt(params.year) : (new Date().getFullYear()));
    setMonth(newMonth);
    setMonthNameLong(monthNames[newMonth-1]);
    setMonthNameShort(monthNamesShort[newMonth-1]);
  }, [params.year, params.month]);

  return <div className="side-panel" id="sidePanel">
    <Link to='/'><h1 className="page-title">GAME<br/>CAL</h1></Link>
    <h2 className="sub-title m-b-40">Video Game Releases</h2>
    <nav className="">
      {
        props.yearBoundary === -4 ?
          <button className="month-nav disabled" disabled><img src={lArrow} /></button> :
          <Link className="month-nav" to={`/month-view/${month-1}/${year}`} onClick={props.prevMonth}><img src={lArrow} /></Link>
      }
      <div>
        <h3 className="month-name">{monthNameLong}</h3>
        <h3 className="month-name-short">{monthNameShort}</h3>
        <h4 className="month-name">{year}</h4>
      </div>
      {
        props.yearBoundary === 4 ?
          <button className="month-nav disabled" disabled><img src={rArrow} /></button> :
          <Link className="month-nav" to={`/month-view/${month+1}/${year}`} onClick={props.nextMonth}><img src={rArrow} /></Link>
      }
    </nav>

    <div className="search m-b-30">
      <label htmlFor="searchBox" className="search-label u-display-none">Search for upcoming games</label>
      <input id="searchBox" className="input" onChange={props.search} placeholder="Search" />
    </div>
    
    <div className="filters">
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
    </div>
    <div className="signature">
      <p>Developed by: <a href="https://github.com/skunkwerksuk">@skunkwerksuk</a></p>
      <p>Powered by: <a href="https://www.igdb.com/api">IGDB API</a></p>
    </div>
  </div>;
}

export default SidePanel;
