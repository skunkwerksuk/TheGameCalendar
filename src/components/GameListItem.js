import React from 'react';
import { Link } from 'react-router-dom';
import { getPlatformLogo } from '../services/ImageService';
import { ReactComponent as CalendarIcon } from '../images/calendar.svg';

const status = {
  0: 'Released',
  2: 'Alpha',
  3: 'Beta',
  4: 'Early Access',
  5: 'Offline',
  6: 'Cancelled',
  7: 'Rumored' 	
};

function getReviewClass(reviewScore) {
  if (reviewScore >= 90) { return 'masterpiece'; }
  if (reviewScore >= 80) { return 'great'; }
  if (reviewScore >= 70) { return 'good'; }
  if (reviewScore >= 60) { return 'average'; }
  return 'poor';
}

function gameItem(props) {
  const platformRenderList = [];
  const game = props.game.game ? props.game.game : props.game;
  const coverUrl = game.cover ? `https:${game.cover.url.replace('thumb', '720p')}` : '';
  const todaysDate = (new Date()).toDateString().substr(4).replace(/ (?=[^ ]*$)/i, ', ');
  const platforms = props.game.platform ? props.game.platform : game.platforms;
  // Remove any duplicate platform names
  const reducedPlatforms = platforms ? platforms.reduce((uniqueList, current) => {
    if (!uniqueList.some(obj => obj.name === current.name)) {
      uniqueList.push(current);
    }
    return uniqueList;
  },[]) : []; 

  // Sort platforms by name
  const sortedPlatformList = reducedPlatforms.sort((ela, elb) => {
    if ( ela.name < elb.name ) { return 1; }
    if ( ela.name > elb.name ) { return -1; }
    return 0;
  });

  sortedPlatformList.map((el, idx) => platformRenderList.push(<div key={idx} className='icon-wrapper'><span hidden>{el.id}</span><img title={el.name} alt={el.name} className='platform-icon' src={getPlatformLogo(el.name)} /></div>));
  return (
    <Link to={`/game-view/${game.id}`} id={props.game.id ? props.game.id : game.id} style={props.style} className='game-item'>
      <div className='game-cover'>
        {game.cover ? <img src={coverUrl} alt={`${game.name} cover art`} /> : ''}
        {game.status ? <div className='game-status'>{status[game.status]}</div> : ''}
        {todaysDate == props.game.human ? <div className='today-banner'>Released Today</div> : ''}
        {game.total_rating ? <div className='review-score-wrapper'><div className={`review-score-small ${getReviewClass(game.total_rating)}`}>{Math.round(game.total_rating)}</div></div> : <></>}
      </div>
      {props.game.human ?
        <div className='game-details'>
          <div className='game-title'>{game.name}</div>
          <div className='release-date'><CalendarIcon /><span>{props.game.human}</span></div>
          <div className='platforms'>{platformRenderList}</div>
        </div> :
        <div className='game-details'>
          <div className='game-title game-title--full'>{game.name}</div>
          <div className='platforms'>{platformRenderList}</div>
        </div>}
    </Link>
  );
}

export default gameItem;
