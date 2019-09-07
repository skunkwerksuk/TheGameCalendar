import React, {useRef, useEffect} from 'react';
import GameItem from './GameItemTwo';
import moment from 'moment';

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
// const useMountEffect = (fun) => useEffect(fun, [])

function Day(props) {
  // const myRef = useRef(null)
	// useMountEffect(() => scrollToRef(myRef));

  let gamelist = props.foo.games;
  if (gamelist.length === 0) {
    return (<div></div>);
    // return (<div id={rdate3.format('DD MMMM YYYY')}></div>);
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
  
  gamelist.forEach((element, idx) => {
    let releaseDate = new Date(element.game.date*1000);
    games.push(
      <GameItem displayModal={props.displayModal} date={releaseDate} key={idx} foo={element} className='is-big' isbig={true}/>
      );
  });
  if (rdate3.isSame(moment().subtract(1, 'day'), 'day')) {
    {/* <div className='list-day' ref={myRef}> */}
    return (
      <div className='list-day' id={rdate3.format('DD MMMM YYYY')}>
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
    <div className='list-day' id={rdate3.format('DD MMMM YYYY')}>
      {/* <div className="date">{props.foo.date}</div> */}
      {/* <h2 className="date">{releaseDate2.format('dddd Do MMMM')}</h2> */}
      <h2 className="date">{rdate3.format('dddd Do MMMM')}</h2>
      <hr />
      <div className="games day-item">{games}</div>
    </div>
  );
}

export default Day;
