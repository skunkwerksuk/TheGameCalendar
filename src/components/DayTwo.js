import React from 'react';
import GameItem from './GameItemTwo';
import moment from 'moment';

function Day(props) {
  let gamelist = props.foo.games;
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

  let rdate3 = moment(props.foo.games[0].date*1000);
  // let releaseDate2 = moment().date(props.foo.game.date);
  gamelist.forEach((element, idx) => {
    let releaseDate = new Date(element.game.date*1000);
    games.push(
        <GameItem displayModal={props.displayModal} date={releaseDate} key={idx} foo={element} className='is-big' isbig={true}/>
      );
  });
  if (rdate3.isSame(moment().subtract(1, 'day'), 'day')) {
    return (
      <div className='list-day'>
        {/* <div className="date">{props.foo.date}</div> */}
        {/* <h2 className="date">{releaseDate2.format('dddd Do MMMM')}</h2> */}
        <div>today</div>
        <h2 className="date">{rdate3.format('dddd Do MMMM')}</h2>
        <hr />
        <div className="games day-item">{games}</div>
      </div>
    );
  }
  return (
    <div className='list-day'>
      {/* <div className="date">{props.foo.date}</div> */}
      {/* <h2 className="date">{releaseDate2.format('dddd Do MMMM')}</h2> */}
      <h2 className="date">{rdate3.format('dddd Do MMMM')}</h2>
      <hr />
      <div className="games day-item">{games}</div>
    </div>
  );
}

export default Day;
