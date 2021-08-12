import React, { useState, useEffect } from 'react';
import GameListItem from './GameListItem';
import { newGetGamesByMonthYear } from '../services/GamesService';
import { useParams } from 'react-router-dom';

function getFirstDay() {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay() + 1;
  const firstday = new Date(curr.setDate(first));
  firstday.setUTCHours(0,0,-1,0);
  return firstday;
}

function getLastDay() {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay() + 1;
  const last = first + 6;
  const lastday = new Date(curr.setDate(last));
  lastday.setUTCHours(23,59,59,999);
  return lastday;
}

function getWeekString() {
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const firstDay = getFirstDay();
  firstDay.setHours(24);
  const lastDay = getLastDay();
  return `${firstDay.toUTCString().substr(0, 7).replace(',','')} - ${lastDay.toUTCString().substr(0, 7).replace(',','')} ${monthNames[lastDay.getMonth()]}`;
}

function WeekView(props) {
  const params = useParams();
  const [games, setGames] = useState([]);
  const [unfilteredGames, setUnfilteredGames] = useState([]);
  const [displayDays, setDisplayDays] = useState([]);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(params.month ? params.month : (new Date().getMonth()+1));
  const [loading, setLoading] = useState(true);
  document.title = 'GameCal | Upcoming video game releases';

  useEffect(() => {
    if (games.length > 0) {
      setLoading(false);
    }
  }, [displayDays]);

  useEffect(() => {
    if (loading == false) {
      const currentDate = new Date().toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' }).replaceAll(' ','');
      if (document.getElementById(currentDate)) {
        document.getElementById(currentDate).scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [loading]);

  useEffect(() => {
    setYear(params.year ? params.year : (new Date().getFullYear()));
    setMonth(params.month ? params.month : (new Date().getMonth()+1));
  }, [params.year, params.month]);

  useEffect(() => {
    setGames(unfilteredGames);
  }, [unfilteredGames]);

  useEffect(async () => {
    setLoading(true);
    const result = await newGetGamesByMonthYear(month-1, year);
  
    if (result) {
      // const curr = new Date();
      // const first = curr.getDate() - curr.getDay() + 1;
      // const last = first + 6;
      // const firstday = new Date(curr.setDate(first));
      // const lastday = new Date(curr.setDate(last));
      // firstday.setUTCHours(0,0,-1,0);
      // lastday.setUTCHours(23,59,59,999);
      const firstTime = Math.round(getFirstDay().getTime()/1000);
      const lastTime = Math.round(getLastDay().getTime()/1000);
      const filterGames = result.data.filteredDates.filter(item => item.date > firstTime && item.date < lastTime);
      setUnfilteredGames(filterGames);
    } else {
      console.error(`No games available for ${month}/${year}`);
    }
  }, [month]);

  useEffect(() => {
    const monthDays = [];
    if (games && games != [] && games.length > 0) {
      games.forEach((game, idx) => {
        if (idx == 0 || idx%2 == 0) {
          monthDays.push(<h3>{getWeekString()}</h3>);
        }
        monthDays.push(<GameListItem displayModal={props.displayModal} key={idx} game={game} />);
      });
    }
    setDisplayDays(monthDays);
  }, [games]);

  return <div id="monthView" className='body-container u-flex-column'>
    <div className='p-h-15'>
      <div className='month-panel'>
        <h2 className='h2'>Current week view - Experimental</h2>
      </div>
      <hr className='hr-light-grey' />
    </div>
    <div className="body-container week-view">
      {
        loading ?
          <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div> :
          <>
            {displayDays}
          </>
      }
    </div>
  </div>;
}

export default WeekView;
