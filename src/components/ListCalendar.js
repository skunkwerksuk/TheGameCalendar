import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Month from './MonthThree';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentMonth,
      currentYear: this.props.currentYear,
      filterProps: this.props.filterProps,
      searching: false
    };
  }

  componentWillReceiveProps(props) {
    if (props.currentMonth !== this.state.currentMonth || props.currentYear !== this.state.currentYear) {
      this.setState({
        currentMonth: props.currentMonth,
        currentYear: props.currentYear,
        filterProps: props.filterProps
      }, () => {
        this.padMonths();
      });
    } else {
      this.setState({
        currentMonth: props.currentMonth,
        currentYear: props.currentYear,
        filterProps: props.filterProps
      }, () => {
        this.filterTest();
      });
    }
  }

  daysInThisMonth(inMonth) {
    const now = new Date();
    return new Date(now.getFullYear(), inMonth, 0).getDate();
  }

  componentDidMount() {
    const there = this;
    // const url = 'http://localhost:3001/';
    const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/'
    let fromDate = new Date(this.state.currentYear, this.state.currentMonth-1, 1, 0, 0, 0);
    let toDate = new Date(this.state.currentYear, this.state.currentMonth-1, this.daysInThisMonth(this.state.currentMonth), 23, 59, 59);
    axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
    .then(function (response) {
      const games = response.data;
      const yearGames = [];

      for (let i = 1; i <= 12; i++) {
        const originalGames = games.filter((currentGame) => currentGame.m == i);
        const currentGames = originalGames.filter((currentGame) => {
          if (there.props.filterProps.platforms.length > 0) {
            let arrayCount = currentGame.platform.filter((platformEl) => {
              return there.props.filterProps.platforms.includes(platformEl.name);
            }).length;
            return arrayCount > 0;
          }
          return true;
        });

        yearGames.push({
          month: i,
          games: currentGames,
          originalGames: originalGames
        });
      }
      
      there.setState({
        yearGames
      });
    })
    .then(() => {
      this.padMonths();
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  padMonths() {
    const thisMonth = this.state.currentMonth;
    const thisYear = this.state.currentYear;
    let nextMonth = thisMonth === 12 ? 1 : thisMonth + 1;
    let nextMonth2 = nextMonth === 12 ? 1 : nextMonth + 1;
    let lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    let nextYear = thisMonth === 12 ? thisYear + 1 : thisYear;
    let nextYear2 = nextMonth === 12 ? thisYear + 1 : nextYear;
    let lastYear = thisMonth === 1 ? thisYear - 1 : thisYear;
    let callArray = [];

    // const url = 'http://localhost:3001/';
    const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';

    if (this.state.yearGames[nextMonth-1].games.length == 0) {
      let fromDate = new Date(nextYear, nextMonth-1, 1, 0, 0, 0);
      let toDate = new Date(nextYear, nextMonth-1, this.daysInThisMonth(nextMonth), 23, 59, 59);
      callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
    }
    
    if (this.state.yearGames[nextMonth2-1].games.length == 0) {
      let fromDate = new Date(nextYear2, nextMonth2-1, 1, 0, 0, 0);
      let toDate = new Date(nextYear2, nextMonth2-1, this.daysInThisMonth(nextMonth2), 23, 59, 59);
      callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
    }
    
    if (this.state.yearGames[lastMonth-1].games.length == 0) {
      let fromDate = new Date(lastYear, lastMonth-1, 1, 0, 0, 0);
      let toDate = new Date(lastYear, lastMonth-1, this.daysInThisMonth(lastMonth), 23, 59, 59);
      callArray.push(axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`));
    }

    axios.all(callArray).then((response) => {
      let count = 0;
      this.setState(state => {
        let stateGames = state.yearGames;
        if (this.state.yearGames[nextMonth-1].games.length == 0) {
          stateGames[nextMonth-1].originalGames = stateGames[nextMonth-1].originalGames.concat(response[count].data);
          stateGames[nextMonth-1].games = stateGames[nextMonth-1].games.concat(response[count].data);
          count++;
        }
        if (this.state.yearGames[nextMonth2-1].games.length == 0) {
          stateGames[nextMonth2-1].originalGames = stateGames[nextMonth2-1].originalGames.concat(response[count].data);
          stateGames[nextMonth2-1].games = stateGames[nextMonth2-1].games.concat(response[count].data);
          count++;
        }
        if (this.state.yearGames[lastMonth-1].games.length == 0) {
          stateGames[lastMonth-1].originalGames = stateGames[lastMonth-1].originalGames.concat(response[count].data);
          stateGames[lastMonth-1].games = stateGames[lastMonth-1].games.concat(response[count].data);
        }

        return {
          yearGames: stateGames
        }
      });
    });

    this.filterTest();
  }

  filterTest() {
    const there = this;
    let stateGames = this.state.yearGames;
    // FILTER: PLATFORM AND SEARCH TEXT
    if (there.props.filterProps.platforms.length > 0 && there.props.filterProps.nameText.length > 0) {
      let allGames = [];
      for (let i = 0; i < stateGames.length; i++) {
        let bar = stateGames[i].originalGames.filter(currentGame => {
          let arrayCount = currentGame.platform.filter((platformEl) => {
            return there.props.filterProps.platforms.includes(platformEl.name);
          }).length;
          if (there.props.filterProps.nameText.length > 0) {
            let name = currentGame.game.name.toLowerCase();
            let searchText = there.props.filterProps.nameText.toLowerCase();
            return (arrayCount > 0 && name.indexOf(searchText) > -1)
          } else {
            return arrayCount > 0;
          }
        })
        allGames = allGames.concat(bar)
      }
      this.setState({
        searching: true,
        results: allGames
      })
    // FILTER: PLATFORM ONLY
    } else if (there.props.filterProps.platforms.length > 0) {
      for (let i = 0; i < stateGames.length; i++) {
        stateGames[i].games = stateGames[i].originalGames.filter(currentGame => {
          let arrayCount = currentGame.platform.filter((platformEl) => {
            return there.props.filterProps.platforms.includes(platformEl.name);
          }).length;
          return arrayCount > 0;
        })
      }
      this.setState({
        yearGames: stateGames
      });
    // FILTER: NAME TEXT ONLY
    } else if (there.props.filterProps.nameText.length > 0) {
      let allGames = [];
      for (let i = 0; i < stateGames.length; i++) {

        let bar = stateGames[i].originalGames.filter(currentGame => {
          let name = currentGame.game.name.toLowerCase();
          let searchText = there.props.filterProps.nameText.toLowerCase();
          return name.indexOf(searchText) > -1;
        })  
        allGames = allGames.concat(bar)
      }

      this.setState({
        searching: true,
        results: allGames
      })
    // FILTER: NONE (Return to default)
    } else {
      for (let i = 0; i < stateGames.length; i++) {
        stateGames[i].games = stateGames[i].originalGames;
      }
      this.setState({
          yearGames: stateGames,
          searching: false,
          results: []
      });
    }
  }

  render() {
    let months = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    if (this.state.searching) {
      months.push(
        <Route path='/'>
          <Month
            className={''}
            monthId={1}
            games={this.state.results}
            displayDayModal={this.props.displayDayModal}
          />
        </Route>
      )
    } else {
      if (this.state.yearGames) {
        for (let i = 1; i <= 12; i++) {
          let route = '';
          if (i === this.props.currentMonth) {
            route = '/';
          } else {
            route = `/${monthNames[i-1]}`;
          }
          months.push(
            <Route path={route} key={i}>
              <Month
                className={''}
                monthId={i}
                games={this.state.yearGames[i-1].games}
                displayDayModal={this.props.displayDayModal}
              />
            </Route>
          )
        }
      }
    }
    return <div id="calendar" className="calendar">
      <Switch>
        {months}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>;
  }
}

export default Calendar;
