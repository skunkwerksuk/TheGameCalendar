import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import { useParams } from 'react-router-dom';
import { getGameById } from '../services/GamesService';
import { getPlatformLogo, getSocialIcon } from '../services/ImageService';

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

function generatePlatformIcons(platformList) {
  return platformList.map((el, idx) => <div className='icon-wrapper' key={idx}><img title={el.name} alt={el.name} className='platform-icon' src={getPlatformLogo(el.name)} /></div>);
}

function reviewPieUpdate() {
  const pies = document.getElementsByClassName('js-simple-pie');
  if (pies.length > 0) {
    for (let i = 0; i < pies.length; i++) {
      const pie = pies[i];
      const leftCircle = pie.querySelector('.left-circle');
      const pieScore = pie.querySelector('label').textContent.trim();
      const rotation = (pieScore / 100) * 360;

      if (pieScore > 50) {
        pie.querySelector('.pie').classList.add('pie--over-fifty');
      }

      leftCircle.style.transform = `rotate(${rotation}deg)`;
    }
    
  }
}

function GameView() {
  const params = useParams();
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const ratingEnum = ['ESRB', 'PEGI'];
  const ratings = ['Three', 'Seven', 'Twelve', 'Sixteen', 'Eighteen', 'RP', 'EC', 'E', 'E10', 'T', 'M', 'AO'];

  useEffect(async () => {
    setLoading(true);
    const response = await getGameById(params.gameId);
    document.title = `${response.data.name} | GameCal`;
    setGame(response.data);
  }, [params.gameId]);

  useEffect(() => {
    if(game && game.name && Object.keys(game.name).length) {
      console.log(game);
      setLoading(false);
      
    }
  }, [game]);

  useEffect(() => {
    if (!loading) {
      reviewPieUpdate();
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return <div className='body-wrapper body-min-height'>
    <div className='body-container p-h-15'>
      {
        loading ?
          <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div> :
          <div className='game-view'>
            <div id='sectionOneDetails' className='game-view-section col-wrapper'>
              <div id='coverGallery' className='col-50 p-h-15'>
                <ImageCarousel images={[game.cover, ...game.screenshots]} />
              </div>
              <div id='coreGameData' className='col-50 p-h-15'>
                <h2 className='h2'>{game.name}</h2>
                <div className='description'>{`${game.summary.substr(0, 150)}...`}</div>
                <div id='glanceCreators' className='glance-creators'>
                  <span className='describer detail-sub-title'>{game.release_dates.length > 1 ? 'Release Dates: ' : 'Release Date: '}</span>
                  <span className='detail'>
                    {game.release_dates.length > 1 ? 
                      <ul className='release-date-list'>
                        {game.release_dates.map((date, idx) => <div key={idx}>
                          <li><span className='m-r-10'>{date.human} - </span><span className='platforms'>{generatePlatformIcons(date.platform)}</span></li>
                        </div>)}
                      </ul> : <div></div>}
                  </span>
                  <span className='describer detail-sub-title'>{game.involved_companies.filter(item => item.developer).length > 1 ? 'Developers: ' : 'Developer: '}</span>
                  <span className='detail'>
                    {game.involved_companies ? game.involved_companies.filter(item => item.developer).map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>}
                  </span>
                  <span className='describer detail-sub-title'>{game.involved_companies.filter(item => item.publisher).length > 1 ? 'Publishers: ' : 'Publisher: '}</span>
                  <span className='detail'>
                    {game.involved_companies ? game.involved_companies.filter(item => item.publisher).map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.company.name}</span>) : <span></span>}
                  </span>
                  <span className='describer detail-sub-title'>Format:</span>
                  <span className='detail-icons platforms'>
                    {generatePlatformIcons(game.platforms)}
                  </span>
                </div>
                <div id='glanceDetails' className='glance-details'>
                  <div className='socials'>
                    <div>
                      {game.websites ? game.websites.map((item, idx) =>
                        item.category !== 1 ? <div className='icon-wrapper' key={idx}><a target="_blank" rel="noopener noreferrer" href={item.url}><img title={getSocialName(item.category)} alt={getSocialName(item.category)} className='platform-icon' src={getSocialIcon(item.category)} /></a></div> : <span></span>
                      ) : <span></span>}
                    </div>
                    {game.websites && game.websites.find(item => item.category === 1) ? <a className='button primary' href={game.websites.find(item => item.category === 1).url} target="_blank" rel="noopener noreferrer">Official Website</a> : <span></span>}
                  </div>
                  <div className='critic-score'>
                    <div className='detail-sub-title'>Review score</div>
                    <div className="score-wrapper">
                      <div className="score--avg js-simple-pie">
                        <label>{game.total_rating ? Math.round(game.total_rating) : 'TBC'}</label>
                        <div className="pie">
                          <div className="left-circle half-circle"></div>
                          <div className="right-circle half-circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id='sectionTwoDetails' className='game-view-section'>
              <div className='tab-box'>
                <input defaultChecked="checked" id="tab1" type="radio" name="pct" />
                <input id="tab2" type="radio" name="pct" />
                <input id="tab3" type="radio" name="pct" />
                <nav>
                  <ul className='tab-box-ul'>
                    <li className="tab1"><label htmlFor="tab1">DESCRIPTION</label></li>
                    <li className="tab2"><label htmlFor="tab2">MORE DETAILS</label></li>
                    <li className="tab3"><label htmlFor="tab3">REVIEWS</label></li>
                  </ul>
                </nav>
                <section>
                  <div className="tab1 tab-box--container">
                    {game.summary}
                  </div>
                  <div className="tab2 tab-box--container">
                    <div className='col-wrapper pipe-separated'>
                      <div className='col col-33'>
                        <div className='detail-sub-title'>Age Ratings:</div>
                        <div>{game.age_ratings ? game.age_ratings.map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + `${ratingEnum[item.category-1]} ${ratings[item.rating-1]}`}</span>) : <span></span>}</div>
                      </div>
                      <div className='col col-33'>
                        <div className='detail-sub-title'>Genres:</div>
                        <div>{game.genres ? game.genres.map((item, idx) => <span key={idx}>{(idx ? ', ' : '') + item.name}</span>) : <span></span>}</div>
                      </div>
                      <div className='col col-33'>
                        <div className='detail-sub-title'>Customer Rating:</div>
                        <div>N/A</div>
                      </div>
                    </div>
                  </div>
                  <div className="tab3 tab-box--container">
                    <div className='col-wrapper'>
                      <div className='col-50'>
                        <div className='critic-score'>
                          <div className='detail-sub-title'>User score ({game.rating_count}):</div>
                          <div className="score-wrapper">
                            <div className="score--avg js-simple-pie">
                              <label>{game.rating ? Math.round(game.rating) : 'TBC'}</label>
                              <div className="pie">
                                <div className="left-circle half-circle"></div>
                                <div className="right-circle half-circle"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-50'>
                        <div className='critic-score'>
                          <div className='detail-sub-title'>Critic score ({game.aggregated_rating_count}):</div>
                          <div className="score-wrapper">
                            <div className="score--avg js-simple-pie">
                              <label>{game.aggregated_rating ? Math.round(game.aggregated_rating) : 'TBC'}</label>
                              <div className="pie">
                                <div className="left-circle half-circle"></div>
                                <div className="right-circle half-circle"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div id='sectionThree' className='game-view-section'>
              <div className='video-gallery-wrapper'>
                <div className='video-gallery'>
                  {game.videos ? game.videos.map((video, idx) => <iframe key={idx} width="460" height="259" src={`https://www.youtube-nocookie.com/embed/${video.video_id}`} title="YouTube video player" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen></iframe>) : <span></span>}
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  </div>;
}

export default GameView;
