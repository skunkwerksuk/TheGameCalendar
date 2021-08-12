import React from 'react';
import { Router as Router, Route } from 'react-router-dom';
import '../styles/App.scss';
import Calendar from './Calendar';
import CalendarPanel from './CalendarPanel';
import Header from './Header';
import Footer from './Footer';
import GameView from './GameView';
import Search from './Search';
import MostAnticipated from './MostAnticipated';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { submitPageViewAnalytic } from '../utils/Analytics';
import WeekView from './WeekView';

const history = createBrowserHistory();
const host = window.location.hostname;
const hash = location.hash;

if (hash && hash.includes('#!/')) {
  // Check if we need to redirect a hash route created by S3
  history.replace(hash.substr(3));
}

if (host != 'localhost') {
  const trackingId = 'UA-142536846-1';
  ReactGA.initialize(trackingId, {
    debug: false,
  });
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearBoundary: 0,
    };
  }

  componentDidMount() {
    submitPageViewAnalytic(host, ReactGA, window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App" role="main">
          <div className="body-panel">
            <Header />
            <Route exact path={['/month-view/:month/:year', '/']}>
              <CalendarPanel yearBoundary={this.state.yearBoundary} />
              <Calendar />
            </Route>
            <Route exact path={['/week-view/']}>
              <WeekView />
            </Route>
            <Route path={['/game-view/:gameId']}>
              <GameView />
            </Route>
            <Route path={['/search-games/:searchTerm']}>
              <Search reactGA={ReactGA} />
            </Route>
            <Route path={['/most-anticipated/:platform', '/most-anticipated',]}>
              <MostAnticipated />
            </Route>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
