import React from 'react';
import { getPlatformLogo } from '../utils/ImageService';

const status = {
  0: 'Released',
  2: 'Alpha',
  3: 'Beta',
  4: 'Early Access',
  5: 'Offline',
  6: 'Cancelled',
  7: 'Rumored' 	
};

function GameListItem(props) {
  const platformRenderList = [];
  const gamelist = props.game.game;
  const coverUrl = gamelist.cover ? `https:${gamelist.cover.url.replace('thumb', 'cover_big')}` : '';

  // Remove any duplicate platform names
  const reducedPlatforms = props.game.platform.reduce((uniqueList, current) => {
    if (!uniqueList.some(obj => obj.name === current.name)) {
      uniqueList.push(current);
    }
    return uniqueList;
  },[]); 

  // Sort platforms by name
  const sortedPlatformList = reducedPlatforms.sort((ela, elb) => {
    if ( ela.name < elb.name ) { return 1; }
    if ( ela.name > elb.name ) { return -1; }
    return 0;
  });

  sortedPlatformList.map((el, idx) => platformRenderList.push(<div key={idx} className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getPlatformLogo(el.name)} /></div>));

  return (
    <div id={props.game.id} onClick={() => props.displayModal(gamelist, props.date, sortedPlatformList)} style={props.style} className={'game-item ' + props.className}>
      <div className='game-cover'>
        {gamelist.cover ? <img src={coverUrl} alt={`${gamelist.name} cover art`} /> : ''}
        {gamelist.status ? <div className='game-status'>{status[gamelist.status]}</div> : ''}
      </div>
      <div className='game-details'>
        <div className='game-title'>{gamelist.name}</div>
        <div className='popularity'>{props.game.id}</div>
        <div className='popularity'>{gamelist.id}</div>
        <div className='platforms'>{platformRenderList}</div>
      </div>
    </div>
  );
}

export default GameListItem;
