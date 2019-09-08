import React from 'react';
import Cal from '../images/GroupCal.svg';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div className="side-panel">
      <img src={Cal} className="calendar-logo" alt="cal icon" />
      <h1 className="page-title">The Game Calendar</h1>
      <h2 className="sub-title">Upcoming Video Game Releases</h2>
      <nav>
        <button className="month-nav" onClick={this.props.prevMonth}>&#60;&#60;</button>
        <h3 className="month-name">{this.props.month}</h3>
        <h3 className="month-name-short">{this.props.shortMonth}</h3>
        <button className="month-nav" onClick={this.props.nextMonth}>&#62;&#62;</button>
      </nav>
  </div>
  }
}

export default SidePanel;
