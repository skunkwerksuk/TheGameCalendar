/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';
import Month from './Month';
import { getGamesByMonthYear, getGamesByMonthYearArray, newGetGamesByMonthYear } from '../services/GamesService';

function daysInMonth(inMonth) {
  const now = new Date();
  return new Date(now.getFullYear(), inMonth, 0).getDate();
}

function Calendar(props) {
  const [currentMonth] = useState(props.currentMonth);
  const [currentYear, setCurrentYear] = useState(props.currentYear);
  const [filterProps, setFilterProps] = useState(props.filterProps);
  const [gamesPerMonth, setGamesPerMonth] = useState([{},{},{},{},{},{},{},{},{},{},{},{}]);
  const [displayMonths, setDisplayMonths] = useState([]);
  const [searching, setSearching] = useState(false);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const loc = useLocation();

  useEffect(() => {
    getGamesForMonth(props.currentMonth);
  }, [props.currentMonth]);

  useEffect(() => {
    setCurrentYear(props.currentYear);
  }, [props.currentYear]);

  useEffect(() => {
    setFilterProps(props.filterProps);
  }, [props.filterProps]);

  useEffect(() => {
    runFilter();
  }, [filterProps]);

  useEffect(() => {
    const months = [];

    if (gamesPerMonth.length > 0) {
      for (let i = 1; i <= 12; i++) {
        if (i === currentMonth) {
          months.push(
            <Route exact path={['/',`/${monthNames[i-1]}`]} key={i}>
              <Month
                monthId={i}
                games={gamesPerMonth[i-1].games}
                displayDayModal={props.displayDayModal}
              />
            </Route>
          );
        } else {
          months.push(
            <Route path={`/${monthNames[i-1]}`} key={i}>
              <Month
                monthId={i}
                games={gamesPerMonth[i-1].games}
                displayDayModal={props.displayDayModal}
              />
            </Route>
          );
        }
        // let route = i === currentMonth ? '/' : `/${monthNames[i-1]}`;
        // months.push(
        //   <Route path={route} key={i}>
        //     <Month
        //       monthId={i}
        //       games={gamesPerMonth[i-1].games}
        //       displayDayModal={props.displayDayModal}
        //     />
        //   </Route>
        // );
      }

      setDisplayMonths(months);
    }
    // runFilter();
  }, [gamesPerMonth]);

  useEffect(async () => {
    // ComponentDidMount TODO: Check if needed
    // const fromDate = new Date(currentYear, currentMonth - 1, 1, 0, 0, 0);
    // const toDate = new Date(currentYear, currentMonth - 1, daysInMonth(currentMonth), 23, 59, 59);
    // const platformFilters = filterProps.platforms;
    
    // let response = await newGetGamesByMonthYear(currentMonth-1, currentYear);
    // const responseGamesPerMonth = [];
    // debugger;
    // for (let i = 1; i <= 12; i++) {
    //   const gamesUnfiltered = response.data.filter(currentGame => currentGame.m == i);
    //   responseGamesPerMonth.push({
    //     month: i,
    //     games: gamesUnfiltered,
    //     gamesUnfiltered
    //   });
    // }

    // setGamesPerMonth(responseGamesPerMonth);
    // padMonths();

  }, []);

  const getGamesForMonth = async (newMonth) => {
    if (!gamesPerMonth[newMonth-1].gamesUnfiltered || gamesPerMonth[newMonth-1].gamesUnfiltered.length == 0) {
      const result = await newGetGamesByMonthYear(newMonth-1, currentYear);
      
      if (result) {
        let newArr = [...gamesPerMonth];
        newArr[newMonth-1].gamesUnfiltered = result.data.filteredDates;
        newArr[newMonth-1].games = result.data.filteredDates;
        runFilter(newArr);
      } else {
        console.warn(`No games available for ${newMonth}/${currentYear}`);
      }
    }
  };

  const checkMonthForGames = (monthId) => {
    return gamesPerMonth[monthId].games ? gamesPerMonth[monthId].games.length : 0;
  };

  // TODO: Remove
  const padMonths = async () => {
    // Get the next two consecutive months and their years
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextMonth2 = nextMonth === 12 ? 1 : nextMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const nextYear2 = nextMonth === 12 ? currentYear + 1 : nextYear;

    // Get the previous month and its' year
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const callArray = [];
    const callArray2 = [];

    // Get next month's games
    if (checkMonthForGames(nextMonth - 1) == 0) {
      const fromDate = new Date(nextYear, nextMonth-1, 1, 0, 0, 0);
      const toDate = new Date(nextYear, nextMonth-1, daysInMonth(nextMonth), 23, 59, 59);
      // callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
      callArray2.push({ month: nextMonth, year: nextYear });
    }
    
    // Get the following month's games
    if (checkMonthForGames(nextMonth2 - 1) == 0) {
      const fromDate = new Date(nextYear2, nextMonth2-1, 1, 0, 0, 0);
      const toDate = new Date(nextYear2, nextMonth2-1, daysInMonth(nextMonth2), 23, 59, 59);
      // callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
      callArray2.push({ month: nextMonth2, year: nextYear2 });
    }
    
    // Get last month's games
    if (checkMonthForGames(lastMonth - 1) == 0) {
      const fromDate = new Date(lastYear, lastMonth-1, 1, 0, 0, 0);
      const toDate = new Date(lastYear, lastMonth-1, daysInMonth(lastMonth), 23, 59, 59);
      // callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
      callArray2.push({ month: lastMonth, year: lastYear });
    }

    let response = await getGamesByMonthYearArray(callArray2);
    let count = 0;
    let newArr = [...gamesPerMonth];

    if (checkMonthForGames(nextMonth - 1) == 0) {
      newArr[nextMonth-1].gamesUnfiltered = response[count].data;
      newArr[nextMonth-1].games = response[count].data;
      count++;
    }
    if (checkMonthForGames(nextMonth2 - 1) == 0) {
      newArr[nextMonth2-1].gamesUnfiltered = response[count].data;
      newArr[nextMonth2-1].games = response[count].data;
      count++;
    }
    if (checkMonthForGames(lastMonth - 1) == 0) {
      newArr[lastMonth-1].gamesUnfiltered = response[count].data;
      newArr[lastMonth-1].games = response[count].data;
    }

    setGamesPerMonth(newArr);
    runFilter();
  };

  const runFilter = (newlyUpdatedGames = []) => {
    const filteredGamesByMonth = newlyUpdatedGames.length == 0 ? [...gamesPerMonth] : newlyUpdatedGames;
    const filterByPlatforms = filterProps.platforms.length > 0;
    const filterByName = filterProps.nameText.length > 0;

    filteredGamesByMonth.forEach(month => {
      if (month.gamesUnfiltered) {
        month.games = (filterByPlatforms || filterByName) ? month.gamesUnfiltered.filter(game => {
          if (filterByPlatforms) {
            const platformMatches = game.platform.some(gamePlatform => {
              return filterProps.platforms.includes(gamePlatform.name);
            });
            if (filterByName) {
              const name = game.game.name.toLowerCase();
              const searchText = filterProps.nameText.toLowerCase();
              return platformMatches && name.indexOf(searchText) > -1;
            } else {
              return platformMatches;
            }
          } else if (filterByName) {
            const name = game.game.name.toLowerCase();
            const searchText = filterProps.nameText.toLowerCase();
            return name.indexOf(searchText) > -1;
          }
        }) : month.gamesUnfiltered;
      }
    });
    setGamesPerMonth(filteredGamesByMonth);
  };

  return <div id="calendar" className="calendar">
    <Switch>
      {displayMonths}
      {/* <Route render={() => <Redirect to="/" />} /> */}
    </Switch>
  </div>;
}


export default Calendar;
