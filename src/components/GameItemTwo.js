import React from 'react';
import xbox from '../images/xbox.svg';
import nSwitch from '../images/switch.svg';
import ps from '../images/ps.svg';
import pc from '../images/PC.svg';
import mac from '../images/Mac.svg';
import ios from '../images/iOS.svg';
import linux from '../images/Linux.svg';

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
    default:
      return '';
  }
}

function GameItem(props) {
  const gamelist = props.foo.game;
  const releaseDate = new Date(props.foo.date*1000);
  const platformList = props.foo.platform.sort((ela, elb) => {
    if ( ela.name < elb.name ){
      return 1;
    }
    if ( ela.name > elb.name ){
      return -1;
    }
    return 0;
  });

  const platformRenderList = [];

  platformList.map(el => platformRenderList.push(<div className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getLogo(el.name)} /></div>));
  let coverUrl = props.foo.game.cover ? props.foo.game.cover.url.replace('thumb', 'cover_big') : '';
  let displayDate = releaseDate.getDate();
  displayDate = displayDate < 10 ? `0${displayDate}` : displayDate;

  return (
    <div style={props.style} className={'game-item ' + props.className}>
      <div className='game-cover'>{props.foo.game.cover && props.isbig ? <img src={coverUrl} /> : ''}</div>
      <div className='game-details'>
        {/* <div className='game-date'>{displayDate}</div> */}
        <div className='game-title'><b>{gamelist.name}</b></div>
        {/* <div className=''>[{Math.round(gamelist.popularity)}]</div> */}
        <div className='popularity'>{gamelist.id}</div>
        <div className='platforms'>{platformRenderList}</div>
      </div>
    </div>
  );
}

export default GameItem;
