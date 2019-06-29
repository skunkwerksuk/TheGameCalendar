import React from 'react';

class DayModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        games: props.games
    };
  }

  componentDidMount() {

  }

  render() {
    return <div className="veil">
      <div className="modal">
      <h1>Hi, I’m a smart component!</h1>

      </div>
    </div>;
  }
}

export default DayModal;
