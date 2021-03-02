import React from 'react';
import { Link } from 'react-router-dom';
import rArrow from '../images/rArrow.svg';
import lArrow from '../images/lArrow.svg';

function refresh() {
  window.location.reload();
}

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const nextMonthId = this.props.monthId === 12 ? 0 : this.props.monthId;
    const prevMonthId = this.props.monthId === 1 ? 11 : this.props.monthId - 2;

    return <div className="side-panel" id="sidePanel">
      <h1 className="page-title" onClick={refresh}>GAME<br/>CAL</h1>
      <h2 className="sub-title m-b-40">Video Game Releases</h2>
      <nav className="">
        {
          this.props.yearBoundary === -4 ?
            <button className="month-nav disabled" disabled><img src={lArrow} /></button> :
            <Link className="month-nav" to={monthNames[prevMonthId]} onClick={this.props.prevMonth}><img src={lArrow} /></Link>
        }
        <div>
          <h3 className="month-name">{this.props.month}</h3>
          <h3 className="month-name-short">{this.props.shortMonth}</h3>
          <h4 className="month-name">{this.props.currentYear}</h4>
        </div>
        {
          this.props.yearBoundary === 4 ?
            <button className="month-nav disabled" disabled><img src={rArrow} /></button> :
            <Link className="month-nav" to={monthNames[nextMonthId]} onClick={this.props.nextMonth}><img src={rArrow} /></Link>
        }
      </nav>

      <div className="search m-b-30">
        <label htmlFor="searchBox" className="search-label u-display-none">Search for upcoming games</label>
        <input id="searchBox" className="input" onChange={this.props.search} placeholder="Search" />
      </div>
      
      <div className="filters">
        <label>Filter</label>
        <div className="icons m-b-5">
          <div className="checkbox-wrapper">
            <input onChange={this.props.setFilters} type="checkbox" name="xboxOne" value="Xbox One" id="xboxOne" className="filter-checkbox" />
            <label htmlFor="xboxOne" id="xboxOneCheckbox"></label>
          </div>
          <div className="checkbox-wrapper">
            <input onChange={this.props.setFilters} type="checkbox" name="ps4" value="PlayStation 4" id="ps4" className="filter-checkbox" />
            <label htmlFor="ps4" id="ps4Checkbox"></label>
          </div>
          <div className="checkbox-wrapper">
            <input onChange={this.props.setFilters} type="checkbox" name="nintendoSwitch" value="Nintendo Switch" id="nintendoSwitch" className="filter-checkbox" />
            <label htmlFor="nintendoSwitch" id="nintendoSwitchCheckbox"></label>
          </div>
          <div className="checkbox-wrapper">
            <input onChange={this.props.setFilters} type="checkbox" name="pc" value="PC (Microsoft Windows)" id="pc" className="filter-checkbox" />
            <label htmlFor="pc" id="pcCheckbox"></label>
          </div>
          <div className="checkbox-wrapper">
            <input onChange={this.props.setFilters} type="checkbox" name="stadia" value="Google Stadia" id="stadia" className="filter-checkbox" />
            <label htmlFor="stadia" id="stadiaCheckbox"></label>
          </div>
        </div>
        <button className="button primary" onClick={this.props.clearFilters}>Clear Filters</button>
      </div>
      <div className="signature">
        <p>Developed by: <a href="https://github.com/skunkwerksuk">@skunkwerksuk</a></p>
        <p>Powered by: <a href="https://www.igdb.com/api">IGDB API</a></p>
      </div>
    </div>;
  }
}

export default SidePanel;
