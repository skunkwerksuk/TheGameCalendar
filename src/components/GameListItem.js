import React from 'react';
import xbox from '../images/xbox.svg';
import nSwitch from '../images/switch.svg';
import ps from '../images/ps.svg';
import pc from '../images/PC.svg';
import mac from '../images/Mac.svg';
import ios from '../images/iOS.svg';
import linux from '../images/Linux.svg';
import stadia from '../images/stadia.png';

function getLogo(name) {
  switch (name) {
    case 'Xbox One':
      return xbox;
    case 'PlayStation 4':
      return ps;
    case 'Nintendo Switch':
      return nSwitch;
    case 'PC (Microsoft Windows)':
      return pc;
    case 'Mac':
      return mac;
    case 'iOS':
      return ios;
    case 'Linux':
      return linux;
    case 'Google Stadia':
      return stadia;
    default:
      return '';
  }
}

function GameItem(props) {
  const platformRenderList = [];
  const gamelist = props.game.game;
  const coverUrl = gamelist.cover ? gamelist.cover.url.replace('thumb', 'cover_big') : '';

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

  sortedPlatformList.map((el, idx) => platformRenderList.push(<div key={idx} className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getLogo(el.name)} /></div>));

  return (
    <div id={props.game.id} onClick={() => props.displayModal(gamelist, props.date, sortedPlatformList)} style={props.style} className={'game-item ' + props.className}>
      <div className='game-cover'>{gamelist.cover && props.isbig ? <img src={coverUrl} alt={`${gamelist.name} cover art`} /> : ''}</div>
      <div className='game-details'>
        <div className='game-title'>{gamelist.name}</div>
        <div className='popularity'>{props.game.id}</div>
        <div className='popularity'>{gamelist.id}</div>
        <div className='platforms'>{platformRenderList}</div>
      </div>
    </div>
  );
}

export default GameItem;
