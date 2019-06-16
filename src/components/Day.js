import React from 'react';

function Day(props) {
  let games = [];
  props.foo.games.forEach(element => {
    games.push(<div title={element.title} className="game-name">{element.title}</div>);
  });
  return (
    <div className={'day ' + props.className}>
      <div className="date">{props.foo.date}</div>
      {games}
    </div>
  );
}

export default Day;
