import React from 'react';

function Day(props) {
  let games = [];
  props.foo.games.forEach(element => {
    games.push(<div title={element.Title} className="game-name">{element.Title}</div>);
  });
  return (
    <div className={'day ' + props.className}>
      <div className="date">{props.foo.date}</div>
      <div className="games">{games}</div>
    </div>
  );
}

export default Day;
