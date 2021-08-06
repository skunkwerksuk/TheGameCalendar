import React from 'react';
import { Router as Router, Route } from 'react-router-dom';
import '../styles/App.scss';
import Calendar from './Calendar';
import CalendarPanel from './CalendarPanel';
import Header from './Header';
import Footer from './Footer';
import GameView from './GameView';
import Search from './Search';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { 
  submitFilterAnalytic,
  submitPageViewAnalytic
} from '../utils/Analytics';

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
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    const currentMonth = months.includes(location.pathname.substr(1)) ? months.indexOf(location.pathname.substr(1))+1 : new Date().getMonth()+1;

    this.state = {
      currentMonth: currentMonth,
      currentYear: (new Date().getFullYear()),
      yearBoundary: 0,
      filterProps: {
        platforms: [ ],
      },
      modalGame: {},
      loading: false
    };
  }

  setFilters = (ev) => {
    const input = ev.target;
    if (ev.target.checked) {
      // Submit a GA ping for this filter
      submitFilterAnalytic(host, ReactGA, input.value);

      this.setState(state => {
        const platforms = state.filterProps.platforms;
        platforms.push(input.value);
        return {
          filterProps: {
            platforms: platforms,
          }
        };
      });
    } else {
      this.setState(state => {
        const platforms = state.filterProps.platforms.filter(platform => platform != input.value);
        return {
          filterProps: {
            platforms: platforms,
          }
        };
      });
    }
  }

  clearFilters = () => {
    let checkboxes = document.getElementsByClassName('filter-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    this.setState(state => {
      return {
        filterProps: {
          platforms: [ ],
          nameText: state.filterProps.nameText
        }
      };
    });
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
              <CalendarPanel
                yearBoundary={this.state.yearBoundary}
              />
              <Calendar
                setFilters={this.setFilters}
                clearFilters={this.clearFilters}
                filterProps={this.state.filterProps}
              />
            </Route>
            <Route path={['/game-view/:gameId']}>
              <GameView />
            </Route>
            <Route path={['/search-games/:searchTerm']}>
              <Search reactGA={ReactGA} />
            </Route>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
