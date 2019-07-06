import React from 'react';

function Day(props) {
  let games = [];

  props.foo.games.forEach(element => {
    let y = element.platform.map(a => a.name);
    let x = y.join(', ');
    // let x = element.platform;
    let platforms = []
    // x.forEach(platform => {
    //   let platformClass = 'platform-item ' + platform.trim().replace(/\s+/g, '-').toLowerCase();
    //   platforms.push(<span className=''>{platform}</span>)
    // })
    games.push(
      <div title={element.Title} className="game-name">
        <span className="text">{element.game.name}</span>
        <div className="platform-wrapper"><span className="platform-items">{x}</span></div>
      </div>
      );
  });
  return (
    <div onClick={() => props.displayModal(props.foo.games, props.foo.date)} className={'day ' + props.className}>
      <div className="date">{props.foo.date}</div>
      <div className="games">{games}</div>
    </div>
  );
}

export default Day;
