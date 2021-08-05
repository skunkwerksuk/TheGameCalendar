import React, { useState, useEffect } from 'react';
import GameListItem from './GameListItem';
import { newGetGamesByMonthYear } from '../services/GamesService';
import { useParams } from 'react-router-dom';

function Month(props) {
  const params = useParams();
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
      // document.getElementById('searchInput').value = '';
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

  useEffect(async () => {
    setGames(runFilter(unfilteredGames));
  }, [props.filters]);

  useEffect(() => {
    setGames(runFilter(unfilteredGames));
  }, [unfilteredGames]);

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
    if (games != []) {
      const monthDays = [];

      if (games && games.length > 0) {
        console.log(games);
        games.forEach((game, idx) => {
          monthDays.push(
            <GameListItem
              displayModal={props.displayModal}
              key={idx}
              game={game}
            />
          );
        });
      }
      setDisplayDays(monthDays);
    }
  }, [games]);

  const runFilter = (gamesToFilter = []) => {
    if (gamesToFilter == undefined || gamesToFilter.length == 0) {
      return [];
    }

    const filterByPlatforms = props.filters.platforms.length > 0;
    const filterByName = props.filters.nameText.length > 0;
    const filteredGamesByMonth = (filterByPlatforms || filterByName) ? gamesToFilter.filter(game => {
      if (filterByPlatforms) {
        const platformMatches = game.platform.some(gamePlatform => {
          return props.filters.platforms.includes(gamePlatform.name);
        });
        if (filterByName) {
          const name = game.game.name.toLowerCase();
          const searchText = props.filters.nameText.toLowerCase();
          return platformMatches && name.indexOf(searchText) > -1;
        } else {
          return platformMatches;
        }
      } else if (filterByName) {
        const name = game.game.name.toLowerCase();
        const searchText = props.filters.nameText.toLowerCase();
        return name.indexOf(searchText) > -1;
      }
    }) : gamesToFilter;

    return filteredGamesByMonth;
  };

  return <div id="monthView">
    <div className='p-h-15'>
      <h2 className='h2'>{monthNames[month-1]}, {year}</h2>
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
