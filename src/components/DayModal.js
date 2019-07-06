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

  closeModals() {
    let modal = document.getElementById('modal');
    modal.classList.add('is-hidden');
    let calendar = document.getElementById('calendar');
    calendar.classList.remove('modal-open');
    let veil = document.getElementById('veil');
    veil.classList.add('is-hidden');
  }

  render() {
    return <div onClick={this.closeModals} className="veil is-hidden" id="veil">
      <div className="modal is-hidden" id="modal">
        <div id='dayModalContent'></div>
      </div>
    </div>;
  }
}

export default DayModal;
