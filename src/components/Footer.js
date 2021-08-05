import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/Logo2.svg';

function Footer() {
  return <footer className="footer body-wrapper">
    <div className="body-container footer-content p-h-15">
      <div>
        <Link to='/' className='logo-link'><Logo /><h1 className="logo-text"><span>Game</span><span>Cal</span></h1></Link>
      </div>
      <hr className='hr-light-purple' />
      <div className="signature">
        <span>Copyright © Game Cal. All rights reseved.</span>
        <span>Developed by: <a className='font--white' href="https://github.com/skunkwerksuk">@skunkwerksuk</a> </span>
        <span>Powered by: <a className='font--white' href="https://www.igdb.com/api">IGDB API</a></span>
      </div>
    </div>
  </footer>;
}


export default Footer;
