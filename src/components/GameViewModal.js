import React from 'react';
import ImageGallery from './ImageGallery';
import leftArrow from '../images/left-arrow.svg';
import { getPlatformLogo, getSocialIcon } from '../utils/ImageService';

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
  case 18:
    return 'Discord';
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
      const leftCircle = pies[0].querySelector('.left-circle');
      const pieScore = pies[0].querySelector('label').textContent.trim();
      const rotation = (pieScore / 100) * 360;

      if (pieScore > 50) {
        pies[0].querySelector('.pie').classList.add('pie--over-fifty');
      }

      leftCircle.style.transform = `rotate(${rotation}deg)`;
    }
  }

  render() {
    const displayGame = this.state.game;
    console.log('Game modal displayed:',displayGame);
    let platformRenderList = [];
    const coverUrl = displayGame.cover ? `https:${displayGame.cover.url.replace('thumb', 'cover_big')}` : '';
    const bannerScreenshotUrl = displayGame.screenshots ? `https:${displayGame.screenshots[0].url.replace('thumb', 'screenshot_big_2x')}` : '';
    const genres = displayGame.genres ? displayGame.genres.map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.name}</span>) : <span></span>;
    const developers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.developer).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;
    const publishers = displayGame.involved_companies ? displayGame.involved_companies.filter(item => item.publisher).map((item, idx) => <span>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>;
    const officialSite = displayGame.websites ? displayGame.websites.find(item => item.category === 1) : 0;
    const officialSiteLink = officialSite ? <div className="m-b-10"><a href={officialSite.url} target="_blank">Official Website</a></div> : <span></span>;
    const websites = displayGame.websites ? displayGame.websites.map((item, idx) =>
      item.category !== 1 ? <div className='icon-wrapper' key={idx}><a target="_blank" href={item.url}><img title={getSocialName(item.category)} alt={getSocialName(item.category)} className='platform-icon' src={getSocialIcon(item.category)} /></a></div> : <span></span>
    ) : <span></span>;

    if (displayGame.platforms) {
      displayGame.platforms.map(el => platformRenderList.push(<div className='icon-wrapper'><img title={el.name} alt={el.name} className='platform-icon' src={getPlatformLogo(el.name)} /></div>));
    }

    return <div onClick={this.closeModals} className="veil is-hidden" id="veil">
      {this.state.loading ? 
        <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div>
        : <div className="modal" id="modal">
          <div className="modal-content">
            <a id="modalClose" className="return" onClick={this.closeModals}><img src={leftArrow}/></a>
            <img className="screen-splash" src={bannerScreenshotUrl} />
            <div className="game-summary">
              <div className="game-cover"><img src={coverUrl} /></div>
              <div className="game-details">
                <h2 className="modal-title">{displayGame.name}</h2>
                <div className="release-date grey-text">Release Date: <b>{displayGame.jsReleaseDate}</b></div>
                <p className="platforms">{platformRenderList}</p>
                <hr className="hr" />
                <p className="grey-text">{genres}</p>
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
              <p>{displayGame.summary}</p>
              {officialSiteLink}
              <div className="socials">{websites}</div>
            </div>
            <ImageGallery images={displayGame.screenshots} galleryId="screenshots" />
          </div>
        </div>}
    </div>;
  }
}

export default GameViewModal;
