import React from 'react';

function Day(props) {
  return (
    <div className={'day ' + props.className}>
      <div className="date">{props.date}</div>
    </div>
  );
}

export default Day;
