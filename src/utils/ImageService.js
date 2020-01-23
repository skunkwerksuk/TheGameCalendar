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

export function getPlatformLogo(name) {
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


export function getSocialIcon(id) {
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