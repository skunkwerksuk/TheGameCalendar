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
      {/* <img src={Cal} className="calendar-logo" alt="cal icon" /> */}
      <h1 className="page-title">GAME<br/>CAL</h1>
      <hr className="hr" />
      <h2 className="sub-title">Upcoming Video Game Releases</h2>
      <hr className="hr" />
      <nav>
        {this.props.yearBoundary === -4 ? <button className="month-nav disabled" disabled>&#60;&#60;</button> : <button className="month-nav" onClick={this.props.prevMonth}>&#60;&#60;</button>}
        <div>
          <h3 className="month-name">{this.props.month}</h3>
          <h3 className="month-name-short">{this.props.shortMonth}</h3>
          <h4 className="month-name">{this.props.currentYear}</h4>
        </div>
        {this.props.yearBoundary === 4 ? <button className="month-nav disabled" disabled>&#62;&#62;</button> : <button className="month-nav" onClick={this.props.nextMonth}>&#62;&#62;</button>}
      </nav>
      <hr className="hr" />
      <div className="filters">
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="xboxOne" value="Xbox One" id="xboxOne" className="filter-checkbox" />
          <label for="xboxOne">Xbox One</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="ps4" value="PlayStation 4" id="ps4" className="filter-checkbox" />
          <label for="ps4">PlayStation 4</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="nintendoSwitch" value="Nintendo Switch" id="nintendoSwitch" className="filter-checkbox" />
          <label for="nintendoSwitch">Nintendo Switch</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="pc" value="PC (Microsoft Windows)" id="pc" className="filter-checkbox" />
          <label for="pc">PC</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="mac" value="Mac" id="mac" className="filter-checkbox" />
          <label for="mac">Mac</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="linux" value="Linux" id="linux" className="filter-checkbox" />
          <label for="linux">Linux</label>
        </div>
        <div>
          <input onChange={this.props.filterTest} type="checkbox" name="stadia" value="Google Stadia" id="stadia" className="filter-checkbox" />
          <label for="stadia">Google Stadia</label>
        </div>
        <button onClick={this.props.clearFilters}>Clear</button>
      </div>
      <div className="signature">
        <p>Developed by: <a href="https://github.com/skunkwerksuk">@skunkwerksuk</a></p>
        <p>Powered by: <a href="https://www.igdb.com/api">IGDB API</a></p>
      </div>
    </div>
  }
}

export default SidePanel;
