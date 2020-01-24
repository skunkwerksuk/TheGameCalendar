import React from 'react';

class HeaderPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return <div className="header-panel">
      {/* <h1 className="page-title">The Game Calendar - {monthNames[this.state.currentMonth-1]}</h1> */}
      <h1 className="page-title">The Game Calendar [WIP]- {this.props.month}</h1>
      <h3 className="sub-title">Upcoming Video Game Releases</h3>
    </div>
  }
}

export default HeaderPanel;
