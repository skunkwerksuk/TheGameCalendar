import React from 'react';
import { Link } from "react-router-dom";

function refresh() {
  window.location.reload();
}

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const nextMonthId = this.props.monthId === 12 ? 0 : this.props.monthId;
    const prevMonthId = this.props.monthId === 1 ? 11 : this.props.monthId - 2;
    return <div className="side-panel" id="sidePanel">
      <h1 className="page-title" onClick={refresh}>GAME<br/>CAL</h1>
      <hr className="hr" />
      <h2 className="sub-title">Upcoming Video Game Releases</h2>
      <hr className="hr" />
      <nav>
        {this.props.yearBoundary === -4 ? <button className="month-nav disabled" disabled>&#60;&#60;</button> : <Link className="month-nav" to={monthNames[prevMonthId]} onClick={this.props.prevMonth}>&#60;&#60;</Link>}
        <div>
          <h3 className="month-name">{this.props.month}</h3>
          <h3 className="month-name-short">{this.props.shortMonth}</h3>
          <h4 className="month-name">{this.props.currentYear}</h4>
        </div>
        {this.props.yearBoundary === 4 ? <button className="month-nav disabled" disabled>&#62;&#62;</button> : <Link className="month-nav" to={monthNames[nextMonthId]} onClick={this.props.nextMonth}>&#62;&#62;</Link>}
      </nav>
      <hr className="hr" />
      <div className="search">
        <label for="searchBox" className="search-label">Look for games in the next few months:</label>
        <input id="searchBox" className="input" onChange={this.props.search} placeholder="Search" />
      </div>
      <hr className="hr" />
      <div className="filters">
        <label>Platforms:</label>
        <div className="checkbox-wrapper">
          <input onChange={this.props.setFilters} type="checkbox" name="xboxOne" value="Xbox One" id="xboxOne" className="filter-checkbox" />
          <label for="xboxOne" id="xboxOneCheckbox">Xbox One</label>
        </div>
        <div className="checkbox-wrapper">
          <input onChange={this.props.setFilters} type="checkbox" name="ps4" value="PlayStation 4" id="ps4" className="filter-checkbox" />
          <label for="ps4" id="ps4Checkbox">PlayStation 4</label>
        </div>
        <div className="checkbox-wrapper">
          <input onChange={this.props.setFilters} type="checkbox" name="nintendoSwitch" value="Nintendo Switch" id="nintendoSwitch" className="filter-checkbox" />
          <label for="nintendoSwitch" id="nintendoSwitchCheckbox">Nintendo Switch</label>
        </div>
        <div className="checkbox-wrapper">
          <input onChange={this.props.setFilters} type="checkbox" name="pc" value="PC (Microsoft Windows)" id="pc" className="filter-checkbox" />
          <label for="pc" id="pcCheckbox">PC</label>
        </div>
        <div className="checkbox-wrapper">
          <input onChange={this.props.setFilters} type="checkbox" name="stadia" value="Google Stadia" id="stadia" className="filter-checkbox" />
          <label for="stadia" id="stadiaCheckbox">Google Stadia</label>
        </div>
        <button className="button primary" onClick={this.props.clearFilters}>Clear</button>
      </div>
      <div className="signature">
        <p>Developed by: <a href="https://github.com/skunkwerksuk">@skunkwerksuk</a></p>
        <p>Powered by: <a href="https://www.igdb.com/api">IGDB API</a></p>
      </div>
    </div>
  }
}

export default SidePanel;
