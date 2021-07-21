import React, { useState, useEffect } from 'react';
import Day from './Day';

function daysInThisMonth(i) {
  var now = new Date();
  return new Date(now.getFullYear(), i, 0).getDate();
}

function Month(props) {
  const [days] = useState(daysInThisMonth(props.monthId));
  const [games, setGames] = useState(props.games);
  const [displayDays, setDisplayDays] = useState([]);

  useEffect(() => {
    setGames(props.games);
  }, [props.games]);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' }).replaceAll(' ','');
    if (document.getElementById(currentDate)) {
      document.getElementById(currentDate).scrollIntoView();
    }
  }, [displayDays]);

  useEffect(() => {
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
  }, [games]);

  return <div id="monthView" className={`${props.className}`}>
    {displayDays}
  </div>;
}

export default Month;
