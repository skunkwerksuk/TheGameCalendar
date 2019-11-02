import React from 'react';
import xbox from '../images/xbox.svg';
import nSwitch from '../images/switch.svg';
import ps from '../images/ps.svg';
import pc from '../images/PC.svg';
import mac from '../images/Mac.svg';
import ios from '../images/iOS.svg';
import linux from '../images/Linux.svg';
import stadia from '../images/stadia.png';

function getLogo(name) {
  switch (name) {
    case 'Xbox One':
      return xbox;
    case 'PlayStation 4':
      return ps;
    case 'Nintendo Switch':
      return nSwitch;
    case 'PC (Microsoft Windows)':
      return pc;
    case 'Mac':
      return mac;
    case 'iOS':
      return ios;
    case 'Linux':
      return linux;
    case 'Google Stadia':
      return stadia;
    default:
      return '';
  }
}

class GameViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      loading: props.loading
    };
  }

  componentDidMount() {

  }
  componentWillReceiveProps(props) {
    console.log('props',props)
    console.log('props.game',props.game)
    this.setState({
      game: props.game,
      loading: props.loading
    }, () => {
      // this.padMonths();
    })
  }
  closeModals(evt) {
    if (evt.target.id === 'veil' || evt.target.id === 'modalClose') {
      let modal = document.getElementById('modal');
      modal.classList.add('is-hidden');
      let calendar = document.getElementById('calendar');
      calendar.classList.remove('modal-open');
      let veil = document.getElementById('veil');
      veil.classList.add('is-hidden');
    }
  }

  componentDidUpdate() {
    var pies = document.getElementsByClassName('js-simple-pie');
    if (pies.length > 0) {
      let val = pies[0].querySelector('label').textContent.trim();
      let rotation = (val/100)*360;
      if (val > 50) {
        pies[0].querySelector('.pie').classList.add('pie--over-fifty');
        let el = pies[0].querySelector('.left-circle');
        el.style.transform = 'rotate('+rotation+'deg)';
      } else {
        let el = pies[0].querySelector('.left-circle');
        el.style.transform = 'rotate('+rotation+'deg)';
      }
    }
  }

  render() {
    const displayGame = this.state.game;
    let platformRenderList = [];
    console.log('displayGAME:',displayGame)
    let coverUrl = displayGame.cover ? displayGame.cover.url.replace('thumb', 'cover_big') : '';

    const genres = displayGame.genres ? displayGame.genres.map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.name}</span>) : <span></span>;
    const developers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.developer).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;
    const publishers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.publisher).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;

    if (displayGame.platforms) {
      displayGame.platforms.map(el => platformRenderList.push(<div className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getLogo(el.name)} /></div>));
    }

    return <div onClick={this.closeModals} className="veil is-hidden" id="veil">
      {this.state.loading ? 
        <div className='loader-wrapper'><div class="loader" id="loader-1"></div></div>
      : <div className="modal" id="modal">
        <div className="modal-content">
          <a id="modalClose" onClick={this.closeModals} class="close"></a>
          <div className="game-summary">
            <div className="game-cover"><img src={coverUrl} /></div>
            <div className="game-details">
              <h2 className="modal-title">{displayGame.name}</h2>
              <span>Released: <b>{displayGame.jsReleaseDate}</b></span>
              <div className="platforms">{platformRenderList}</div>
              <hr className="hr" />
              <p><em>Genres: </em>{genres}</p>
              <p><em>Developer(s): </em>{developers}</p>
              <p><em>Publisher(s): </em>{publishers}</p>
              <hr className="hr" />
            </div>
            <div className="score-wrapper">
              <div className="score--avg js-simple-pie">
                <label>{displayGame.aggregated_rating ? Math.round(displayGame.aggregated_rating) : 'TBC'}</label>
                <div className="pie">
                  <div className="left-circle half-circle"></div>
                  <div className="right-circle half-circle"></div>
                </div>
              </div>
            </div>
          </div>
          <p><b>Description:</b></p>
          <p>{displayGame.summary}</p>
        </div>
      </div>
      }
    </div>;
  }
}

export default GameViewModal;
