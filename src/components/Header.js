import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/Logo2.svg';
import { ReactComponent as SearchIcon } from '../images/search.svg';

function Header() {
  let history = useHistory();
  function searchHandler(evt) {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      searchRedirect();
    }
  }

  function searchRedirect() {
    const searchTerm = encodeURIComponent(document.getElementById('searchInput').value);
    history.push(`/search-games/${searchTerm}`);
  }

  return <header className="header body-wrapper">
    <div className="body-container p-h-15">
      <Link to='/' className='logo-link'><Logo /><h1 className="logo-text"><span>Game</span><span>Cal</span></h1></Link>
      {/* <Link to='/' className='header-link'>Upcoming Releases</Link> */}
      <div className='search-bar'>
        <input id='searchInput' placeholder='Search' onKeyUp={searchHandler} />
        <SearchIcon onClick={searchRedirect} />
      </div>
    </div>
  </header>;
}


export default Header;
