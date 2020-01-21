import React from 'react';
import xbox from '../images/xbox.svg';
import nSwitch from '../images/switch.svg';
import ps from '../images/ps.svg';
import pc from '../images/PC.svg';
import mac from '../images/Mac.svg';
import ios from '../images/iOS.svg';
import linux from '../images/Linux.svg';
import stadia from '../images/stadia.png';
import wikiaLogo from '../images/fandom.svg';
import wikipediaLogo from '../images/wikipedia.svg';
import facebookLogo from '../images/facebook.svg';
import twitterLogo from '../images/twitter.svg';
import twitchLogo from '../images/twitch.png';
import instagramLogo from '../images/instagram.svg';
import youtubeLogo from '../images/youtube.svg';
import steamLogo from '../images/steam.svg';
import redditLogo from '../images/reddit.svg';
import epicLogo from '../images/epic.svg';
import gogLogo from '../images/gog.svg';

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

function getSocialIcon(id) {
  switch (id) {
    case 2:
      return wikiaLogo;
    case 3:
      return wikipediaLogo;
    case 4:
      return facebookLogo;
    case 5:
      return twitterLogo;
    case 6:
      return twitchLogo;
    case 8:
      return instagramLogo;
    case 9:
      return youtubeLogo;
    case 13:
      return steamLogo;
    case 14:
      return redditLogo;
    case 16:
      return epicLogo;
    case 17:
      return gogLogo;
    default:
      return '';
  }
}

function getSocialName(id) {
  switch (id) {
    case 2:
      return 'Fandom/Wikia';
    case 3:
      return 'Wikipedia';
    case 4:
      return 'Facebook';
    case 5:
      return 'Twitter';
    case 6:
      return 'Twitch';
    case 8:
      return 'Instagram';
    case 9:
      return 'Youtube';
    case 13:
      return 'Steam';
    case 14:
      return 'Reddit';
    case 16:
      return 'Epic';
    case 17:
      return 'GoG';
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

  componentWillReceiveProps(props) {
    this.setState({
      game: props.game,
      loading: props.loading
    });
  }

  closeModals(evt) {
    if (evt.target.id === 'veil' || evt.target.id === 'modalClose') {
      document.getElementById('modal').classList.add('is-hidden');
      document.getElementById('calendar').classList.remove('modal-open');
      document.getElementById('sidePanel').classList.remove('modal-open');
      document.getElementById('body').classList.remove('modal-open');
      document.getElementById('veil').classList.add('is-hidden');
    }
  }

  componentDidUpdate() {
    const pies = document.getElementsByClassName('js-simple-pie');
    if (pies.length > 0) {
      let val = pies[0].querySelector('label').textContent.trim();
      let rotation = (val / 100) * 360;
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
    let coverUrl = displayGame.cover ? displayGame.cover.url.replace('thumb', 'cover_big') : '';
    console.log(displayGame)
    const screenshotUrl = displayGame.screenshots ? displayGame.screenshots[0] .url.replace('thumb', 'screenshot_big_2x') : '';
    const genres = displayGame.genres ? displayGame.genres.map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.name}</span>) : <span></span>;
    const developers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.developer).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;
    const publishers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.publisher).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;

    const websites = displayGame.websites ? displayGame.websites.map((item, idx) =>
      item.category !== 1 ? <div className='icon-wrapper' key={idx}><a target="_blank" href={item.url}><img title={getSocialName(item.category)} alt={getSocialName(item.category)} className='platform-icon' src={getSocialIcon(item.category)} /></a></div> : <span></span>
    ) : <span></span>;

    const officialSite = displayGame.websites ? displayGame.websites.find(item => item.category === 1) : 0;

    const officialSiteLink = officialSite ? <div className="m-b-10"><a href={officialSite.url} target="_blank">Official Website</a></div> : <span></span>;

    if (displayGame.platforms) {
      displayGame.platforms.map(el => platformRenderList.push(<div className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getLogo(el.name)} /></div>));
    }

    return <div onClick={this.closeModals} className="veil is-hidden" id="veil">
      {this.state.loading ? 
        <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div>
      : <div className="modal" id="modal">
        <div className="modal-content">
          <a id="modalClose" onClick={this.closeModals} className="close"></a>
          <img class="screen-splash" src={screenshotUrl} />
          <div className="game-summary">
            <div className="game-cover"><img src={coverUrl} /></div>
            <div className="game-details">
              <h2 className="modal-title">{displayGame.name}</h2>
              <div>Release Date: <b>{displayGame.jsReleaseDate}</b></div>
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
          <div className="game-description">
            <div><b>Description:</b></div>
            <p>{displayGame.summary}</p>
            {officialSiteLink}
            <div className="socials">{websites}</div>
          </div>
        </div>
      </div>
      }
    </div>;
  }
}

export default GameViewModal;
