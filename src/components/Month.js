import React, { useState, useEffect } from 'react';
import Day from './Day';
import { newGetGamesByMonthYear } from '../services/GamesService';
import { useParams } from 'react-router-dom';


function daysInThisMonth(i) {
  var now = new Date();
  return new Date(now.getFullYear(), i, 0).getDate();
}

function Month(props) {
  const params = useParams();
  const [days] = useState(daysInThisMonth(params.month ? params.month : (new Date().getMonth()+1)));
  const [games, setGames] = useState([]);
  const [unfilteredGames, setUnfilteredGames] = useState([]);
  const [displayDays, setDisplayDays] = useState([]);
  const [year, setYear] = useState(params.year ? params.year : (new Date().getFullYear()));
  const [month, setMonth] = useState(params.month ? params.month : (new Date().getMonth()+1));
  const [loading, setLoading] = useState(true);

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
      const dateMap = [];
      const monthDays = [];
  
      for (let i = 1; i <= days; i++) {
        dateMap.push({ date: i, games: []});
      }
  
      if (games && games.length > 0) {
        games.forEach(game => {
          const gameDate = new Date(game.date*1000).getDate();
          dateMap[gameDate-1].games.push(game);
        });
      }
  
      dateMap.forEach((element, index) => {
        monthDays.push(
          <Day
            displayModal={props.displayDayModal}
            key={index}
            games={element.games}
            className={element.className}
            dayId={element.date}
            monthId={props.monthId}
          />
        );
      });
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

  return <div id="monthView" className={`${props.className}`}>
    {
      loading ?
        <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div> :
        displayDays
    }
  </div>;
}

export default Month;
