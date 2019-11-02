import React from 'react';
import GameListItem from './GameListItem';
import moment from 'moment';

function Day(props) {
  let gamelist = props.games;
  if (gamelist.length === 0) {
    return (<div></div>);
  }
  gamelist.sort((a, b) => {
    if ( a.game.popularity > b.game.popularity ){
      return -1;
    }
    if ( a.game.popularity < b.game.popularity ){
      return 1;
    }
    return 0;
  })
  let games = [];
  
  let rdate3 = moment(props.games[0].date*1000);
  
  gamelist.forEach((element, idx) => {
    games.push(
      <GameListItem displayModal={props.displayModal} date={rdate3.format('DD MMMM YYYY')} key={idx} game={element} className='is-big' isbig={true}/>
      );
  });
  if (rdate3.isSame(moment().subtract(1, 'day'), 'day')) {
    return (
      <div className='list-day' id={rdate3.format('DD MMMM YYYY')}>
        {/* <div className="date">{props.games.date}</div> */}
        {/* <h2 className="date">{releaseDate2.format('dddd Do MMMM')}</h2> */}
        {/* <div>today</div> */}
        <h2 className="date">{rdate3.format('dddd Do MMMM')}</h2>
        <hr className="hr" />
        <div className="games day-item">{games}</div>
      </div>
    );
  }
  return (
    <div className='list-day' id={rdate3.format('DD MMMM YYYY')}>
      {/* <div className="date">{props.games.date}</div> */}
      {/* <h2 className="date">{releaseDate2.format('dddd Do MMMM')}</h2> */}
      <h2 className="date">{rdate3.format('dddd Do MMMM')}</h2>
      <hr className="hr" />
      <div className="games day-item">{games}</div>
    </div>
  );
}

export default Day;
