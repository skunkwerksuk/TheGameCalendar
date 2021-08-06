import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../images/left-arrow-new.svg';
import { ReactComponent as RightArrow } from '../images/right-arrow-new.svg';

function CalendarPanel(props) {
  const params = useParams();
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const thisMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(thisMonth);
  const [monthNameLong, setMonthNameLong] = useState(monthNames[thisMonth-1]);

  useEffect(() => {
    const newMonth = params.month ? parseInt(params.month) : (new Date().getMonth()+1);
    setYear(params.year ? parseInt(params.year) : (new Date().getFullYear()));
    setMonth(newMonth);
    setMonthNameLong(monthNames[newMonth-1]);
  }, [params.year, params.month]);

  return <div className="calendar-panel-wrapper body-wrapper" id="sidePanel">
    <div className="calendar-panel body-container">
      <div className="month-navigation">
        {
          props.yearBoundary === -4 ?
            <button className="nav-icon disabled" disabled><LeftArrow /></button> :
            <Link className="nav-icon" to={`/month-view/${month-1}/${year}`}><LeftArrow /></Link>
        }
        <div className="description">
          <h3 className="month-name">{monthNameLong}, {year}</h3>
        </div>
        {
          props.yearBoundary === 4 ?
            <button className="nav-icon disabled" disabled><RightArrow /></button> :
            <Link className="nav-icon" to={`/month-view/${month+1}/${year}`}><RightArrow /></Link>
        }
      </div>
    </div>
  </div>;
}

export default CalendarPanel;
