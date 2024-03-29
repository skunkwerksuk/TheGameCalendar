import React, { useState, useEffect } from 'react';
import GameListItem from './GameListItem';
import filterIconUrl from '../images/filter.svg';
import { newGetGamesByMonthYear } from '../services/GamesService';
import { useParams } from 'react-router-dom';

const filters = [
  { name: 'PlayStation 5', value: 'PlayStation 5' },
  { name: 'Xbox Series', value: 'Xbox Series' },
  { name: 'Nintendo Switch', value: 'Nintendo Switch' },
  { name: 'PC', value: 'PC (Microsoft Windows)' },
  { name: 'PlayStation 4', value: 'PlayStation 4' },
  { name: 'Xbox One', value: 'Xbox One' },
  { name: 'Stadia', value: 'Stadia' }
];

function Month(props) {
  const params = useParams();
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [games, setGames] = useState([]);
  const [unfilteredGames, setUnfilteredGames] = useState([]);
  const [displayDays, setDisplayDays] = useState([]);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(params.month ? params.month : (new Date().getMonth()+1));
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  document.title = 'GameCal | Upcoming video game releases';


  function setFilters(ev) {
    const input = ev.target;
    let platforms;

    if (input.checked) {
      platforms = [...filteredPlatforms, input.value];
    } else {
      platforms = filteredPlatforms.filter(platform => platform != input.value);
    }
    setFilteredPlatforms(platforms);
  }

  function clearFilters() {
    let checkboxes = document.getElementsByClassName('filter-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setFilteredPlatforms([]);
  }

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
    setGames(runFilter(unfilteredGames));
  }, [filteredPlatforms, unfilteredGames]);

  useEffect(async () => {
    setLoading(true);
    const result = await newGetGamesByMonthYear(month-1, year);

    if (result) {
      setUnfilteredGames(result.data.filteredDates);
    } else {
      console.error(`No games available for ${month}/${year}`);
    }
  }, [month]);

  useEffect(() => {
    const monthDays = [];
    if (games && games != [] && games.length > 0) {
      games.forEach((game, idx) => {
        monthDays.push(<GameListItem displayModal={props.displayModal} key={idx} game={game} />);
      });
    }
    setDisplayDays(monthDays);
  }, [games]);

  const runFilter = (gamesToFilter = []) => {
    if (gamesToFilter == undefined || gamesToFilter.length == 0) {
      return [];
    }

    const filteredGamesByMonth = filteredPlatforms && filteredPlatforms.length > 0 ? gamesToFilter.filter(game => {
      const platformMatches = game.platform.some(gamePlatform => {
        return filteredPlatforms.includes(gamePlatform.name);
      });
      return platformMatches;
    }) : gamesToFilter;

    return filteredGamesByMonth;
  };

  return <div id="monthView" className='body-container u-flex-column'>
    <div className='p-h-15'>
      <div className='month-panel'>
        <h2 className='h2'>{monthNames[month-1]}, {year}</h2>
        <div className='filter-wrapper dropdown-anchor'>
          <img className='' src={filterIconUrl} />
          <ul className='dropdown-target filter-list'>
            {filters.map((filter, idx) => <li className="checkable" key={idx}>
              <input onChange={setFilters} type="checkbox" name={filter.value} value={filter.value} id={filter.value} className="filter-checkbox" />
              <label htmlFor={filter.value} id={filter.value + 'checkbox'}>{filter.name}</label>
            </li>)}
            <li><button className="button primary m-t-10" onClick={clearFilters}>Clear</button></li>
          </ul>
        </div>
      </div>
      <hr className='hr-light-grey' />
    </div>
    <div className="body-container month-view">
      {
        loading ?
          <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div> :
          <>
            {displayDays}
            <div className='body-container m-b-15'>
              <button className='button primary u-margin-0-auto' onClick={() => window.scrollTo(0, 0)}>Back to top</button>
            </div>
          </>
      }
    </div>
  </div>;
}

export default Month;
