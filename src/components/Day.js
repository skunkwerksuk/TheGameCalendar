import React from 'react';
import GameListItem from './GameListItem';
import moment from 'moment';

function Day(props) {
  let gamelist = props.games;

  if (gamelist.length === 0) {
    let currentDate = moment(props.monthId, 'MM');
    currentDate.date(props.dayId);
    return (<div id={currentDate.format('DD MMMM YYYY')}></div>);
  }

  let games = [];  
  let currentDate = moment(props.games[0].date*1000);
  let dateText = '';

  gamelist.sort((a, b) => {
    if ( a.game.popularity > b.game.popularity ){ return -1; }
    if ( a.game.popularity < b.game.popularity ){ return 1; }
    return 0;
  });
  
  gamelist.forEach((element, idx) => {
    games.push(
      <GameListItem
        displayModal={props.displayModal}
        date={currentDate.format('DD MMMM YYYY')}
        key={idx}
        game={element}
        className='is-big'
      />
    );
  });
  
  if (currentDate.isSame(moment(), 'day')) {
    dateText = `${currentDate.format('dddd Do MMMM')} - Today!`;
  } else if (currentDate.format('Do MMMM') === '31st December') {
    dateText = 'TBC';
  } else {
    dateText = currentDate.format('dddd Do MMMM');
  }

  return (
    <div className='list-day' id={currentDate.format('DD MMMM YYYY')}>
      <h2 className="date">{dateText}</h2>
      <hr className="hr" />
      <div className="games day-item">{games}</div>
    </div>
  );
}

export default Day;
