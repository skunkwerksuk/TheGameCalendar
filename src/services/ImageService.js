import xbox from '../images/platforms/xbox.svg';
import xboxOG from '../images/platforms/xboxOG.png';
import seriesX from '../images/platforms/seriesx.png';
import xbox360 from '../images/platforms/xbox360.svg';
import nSwitch from '../images/platforms/switch.svg';
import ps from '../images/platforms/ps.svg';
import ps2 from '../images/platforms/ps2.svg';
import ps3 from '../images/platforms/ps3.svg';
import ps5 from '../images/platforms/ps5.svg';
import pc from '../images/platforms/PC.svg';
import mac from '../images/platforms/Mac.svg';
import ios from '../images/platforms/iOS.svg';
import linux from '../images/platforms/Linux.svg';
import stadia from '../images/platforms/stadia.png';
import steamVr from '../images/platforms/steamvr.svg';
import oculusVr from '../images/platforms/oculusvr.svg';
import gameCube from '../images/platforms/gamecube.svg';
import ds from '../images/platforms/ds.svg';
import dsi from '../images/platforms/dsi.svg';
import threeDS from '../images/platforms/3ds.svg';
import new3ds from '../images/platforms/new3ds.svg';
import wii from '../images/platforms/wii.svg';
import wiiu from '../images/platforms/wiiu.svg';
import nes from '../images/platforms/nes.svg';
import famicom from '../images/platforms/famicom.svg';
import virtualConsole from '../images/platforms/virtualconsole.svg';
import gameAndWatch from '../images/platforms/gameandwatch.svg';
import amiga from '../images/platforms/amiga.svg';
import snes from '../images/platforms/snes.svg';
import n64 from '../images/platforms/n64.svg';
import gameBoy from '../images/platforms/gameboy.svg';
import gameBoyColor from '../images/platforms/gameboycolor.svg';
import gameBoyAdvance from '../images/platforms/gameboyadvance.png';

import wikiaLogo from '../images/socials/fandom.svg';
import wikipediaLogo from '../images/socials/wikipedia.svg';
import facebookLogo from '../images/socials/facebook.svg';
import twitterLogo from '../images/socials/twitter.svg';
import twitchLogo from '../images/socials/twitch.png';
import instagramLogo from '../images/socials/instagram.svg';
import youtubeLogo from '../images/socials/youtube.svg';
import steamLogo from '../images/socials/steam.svg';
import redditLogo from '../images/socials/reddit.svg';
import epicLogo from '../images/socials/epic.svg';
import gogLogo from '../images/socials/gog.svg';
import discordLogo from '../images/socials/discord.svg';

export function getPlatformLogo(name) {
  switch (name) {
  case 'Xbox':
    return xboxOG;
  case 'Xbox One':
    return xbox;
  case 'Xbox Series':
    return seriesX;
  case 'Xbox 360':
    return xbox360;
  case 'PlayStation 2':
    return ps2;
  case 'PlayStation 3':
    return ps3;
  case 'PlayStation 4':
    return ps;
  case 'PlayStation 5':
    return ps5;
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
  case 'SteamVR':
    return steamVr;
  case 'Oculus VR':
    return oculusVr;  
  case 'Google Stadia':
  case 'Stadia':
    return stadia;
  case 'Nintendo GameCube':
    return gameCube;
  case 'Nintendo 3DS':
    return threeDS;
  case 'New Nintendo 3DS':
    return new3ds;
  case 'Nintendo DS':
    return ds;
  case 'Nintendo DSi':
    return dsi;
  case 'Wii':
    return wii;
  case 'Wii U':
    return wiiu;
  case 'Nintendo Entertainment System (NES)':
    return nes;
  case 'Family Computer Disk System':
    return famicom;
  case 'Virtual Console (Nintendo)':
    return virtualConsole;
  case 'Game & Watch':
    return gameAndWatch;
  case 'Amiga':
    return amiga;
  case 'Nintendo 64':
    return n64;
  case 'Game Boy':
    return gameBoy;
  case 'Game Boy Color':
    return gameBoyColor;
  case 'Game Boy Advance':
    return gameBoyAdvance;
  case 'Super Nintendo Entertainment System (SNES)':
    return snes;
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
  case 18:
    return discordLogo;
  default:
    return '';
  }
}