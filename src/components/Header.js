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
    document.getElementById('menuToggleInput').checked = false;
    history.push(`/search-games/${searchTerm}`);
  }

  return <header className="header body-wrapper">
    <div className="body-container p-h-15">
      <Link to='/' className='logo-link'><Logo /><h1 className="logo-text"><span>Game</span><span>Cal</span></h1></Link>
      <div id="menuToggle" className='menu-toggle-wrapper'>
        <input className='menu-toggle-checkbox' type='checkbox' id='menuToggleInput' />
        <span className='menu-hamburger--line'></span>
        <span className='menu-hamburger--line'></span>
        <span className='menu-hamburger--line'></span>
        <ul id="menu" className='menu-toggle-target'>
          <hr className='hr-light-grey' />
          <li><Link to='/' className='header-link' onClick={() => document.getElementById('menuToggleInput').checked = false}>Upcoming Releases</Link></li>
          <li><Link to='/most-anticipated' className='header-link' onClick={() => document.getElementById('menuToggleInput').checked = false}>Most Anticipated</Link></li>
          <li><div className='search-bar'>
            <input id='searchInput' placeholder='Search' onKeyUp={searchHandler} />
            <SearchIcon onClick={searchRedirect} />
          </div></li>
        </ul>
      </div>
    </div>
  </header>;
}


export default Header;
