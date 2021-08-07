import React, { useEffect, useState } from 'react';
import GameListItem from './GameListItem';
import { searchGamesByTerm } from '../services/GamesService';
import { useParams } from 'react-router-dom';
// import { submitSearchAnalytic } from '../utils/Analytics';

function Search() {
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
    const { data } = await searchGamesByTerm(params.searchTerm);

    // submitSearchAnalytic(window.location.hostname, props.ReactGA, params.searchTerm);

    if (data != []) {
      const gameList = [];

      data.forEach((game, idx) => {
        gameList.push(<GameListItem key={idx} game={game} />);
      });

      setDisplayGames(gameList);
    }
  }, [params.searchTerm]);

  return <div id="searchView" className='body-wrapper body-min-height'>
    <div className='body-container--no-flex p-h-15'>
      <h2 className='h2'>Search for: {params.searchTerm}</h2>
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

export default Search;
