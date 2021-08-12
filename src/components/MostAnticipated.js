import React, { useEffect, useState } from 'react';
import GameListItem from './GameListItem';
import { getMostAnticipatedGames } from '../services/GamesService';
import { Link, useParams } from 'react-router-dom';

const filters = [
  { name: 'PlayStation 5', value: 167 },
  { name: 'Xbox Series', value: 169 },
  { name: 'Nintendo Switch', value: 130 },
  { name: 'PC', value: 6 },
  { name: 'PlayStation 4', value: 48 },
  { name: 'Xbox One', value: 49 }
];

function MostAnticipated() {
  const params = useParams();
  const [displayGames, setDisplayGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (displayGames.length > 0) {
      setLoading(false);
    }
    return () => {
      document.getElementById('searchInput').value = '';
    };
  }, [displayGames]);

  useEffect(() => {
    if (loading == false) { window.scrollTo(0, 0); }
  }, [loading]);

  useEffect(async () => {
    setLoading(true);
    const platform = params ? params.platform : null;
    const { data } = await getMostAnticipatedGames(platform);
    const newData = data.map(game => {
      game.human = game.release_dates[0].human;
      return game;
    });
    if (newData != []) {
      const gameList = [];

      newData.forEach((game, idx) => {
        gameList.push(<GameListItem key={idx} game={game} />);
      });

      setDisplayGames(gameList);
    }
  }, [params.platform]);

  return <div id="searchView" className='body-wrapper body-min-height'>
    <div className='body-container--no-flex p-h-15'>
      <h2 className='h2'>Most Anticipated {params && params.platform ? `${filters.find(filter => filter.value == params.platform).name} games` : 'New Releases'}</h2>
      <div className='filter-buttons-wrapper'>
        {filters.map((filter, idx) => <Link className={`button primary ${filter.value == params.platform ? 'active-link' : ''}`} key={idx} to={filter.value == params.platform ? '/most-anticipated' : `/most-anticipated/${filter.value}`}>{filter.name}</Link>)}
      </div>
      <hr className='hr-light-grey' />
    </div>
    <div className="body-container month-view">
      {
        loading ?
          <div className='loader-wrapper'><div className="loader" id="loader-1"></div></div> :
          <>
            {displayGames}
            <div className='body-container m-b-15'>
              <button className='button primary u-margin-0-auto' onClick={() => window.scrollTo(0, 0)}>Back to top</button>
            </div>
          </>
      }
    </div>
  </div>;
}

export default MostAnticipated;
