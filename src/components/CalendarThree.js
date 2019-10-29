import React from 'react';
import Month from './MonthThree';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentMonth,
      currentYear: this.props.currentYear,
      filterProps: this.props.filterProps
    };
  }
  componentWillReceiveProps(props) {
    console.log(props.filterProps)
    this.setState({
      currentMonth: props.currentMonth,
      currentYear: props.currentYear,
      filterProps: props.filterProps
    }, () => {
      this.padMonths();
    })
  }

  daysInThisMonth(inMonth) {
    const now = new Date();
    return new Date(now.getFullYear(), inMonth, 0).getDate();
  }

  displayDayModal = (games, date) => {
    this.props.displayDayModal(games, date)
  }

  componentDidMount() {
    var there = this;
    // const url = 'http://localhost:3001/';
    const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/'
    let fromDate = new Date(this.state.currentYear, this.state.currentMonth-1, 1, 0, 0, 0);
    let toDate = new Date(this.state.currentYear, this.state.currentMonth-1, this.daysInThisMonth(this.state.currentMonth), 23, 59, 59);
    axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
    .then(function (response) {
      let games = response.data;
      let yearGames = [];

      for (let i = 1; i <= 12; i++) {
        const originalGames = games.filter((currentGame) => currentGame.m == i);

        const currentGames = originalGames.filter((currentGame) => {
          let monthNo = currentGame.m;
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
        })
      }
      
      there.setState({
        yearGames
      })
    })
    .then(() => {
      this.padMonths();
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  padMonths() {
    let thisMonth = this.state.currentMonth;
    let thisYear = this.state.currentYear;
    let nextMonth = thisMonth === 12 ? 1 : thisMonth + 1;
    let lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    let nextYear = thisMonth === 12 ? thisYear + 1 : thisYear;
    let lastYear = thisMonth === 1 ? thisYear - 1 : thisYear;
    // const url = 'http://localhost:3001/';
    const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';
    if (this.state.yearGames[nextMonth-1].games.length == 0) {
      let fromDate = new Date(nextYear, nextMonth-1, 1, 0, 0, 0);
      let toDate = new Date(nextYear, nextMonth-1, this.daysInThisMonth(nextMonth), 23, 59, 59);
      axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
      .then((response) => {
        this.setState(state => {
          let foo = state.yearGames;
          foo[nextMonth-1].originalGames = foo[nextMonth-1].originalGames.concat(response.data);
          foo[nextMonth-1].games = foo[nextMonth-1].games.concat(response.data);
          return {
            yearGames: foo
          }
        })
      })
      .catch((err) => { console.log(err) })
    }
    
    if (this.state.yearGames[lastMonth-1].games.length == 0) {
      let fromDate = new Date(lastYear, lastMonth-1, 1, 0, 0, 0);
      let toDate = new Date(lastYear, lastMonth-1, this.daysInThisMonth(lastMonth), 23, 59, 59);
      axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
      .then((response) => {
        this.setState(state => {
          let foo = state.yearGames;
          foo[lastMonth-1].originalGames = foo[lastMonth-1].originalGames.concat(response.data);
          foo[lastMonth-1].games = foo[lastMonth-1].games.concat(response.data);
          return {
            yearGames: foo
          }
        })
      })
    }
    this.filterTest();
  }

  filterTest() {
    var there = this;
    if (there.props.filterProps.platforms.length > 0) {
      this.setState(state => {
        let foo = state.yearGames;
        for (let i = 0; i < foo.length; i++) {
          foo[i].games = foo[i].originalGames.filter(currentGame => {
            let arrayCount = currentGame.platform.filter((platformEl) => {
              return there.props.filterProps.platforms.includes(platformEl.name);
            }).length;
            return arrayCount > 0;
          })
        }
        return {
          yearGames: foo
        }
      });
    } else {
      this.setState(state => {
        let foo = state.yearGames;
        for (let i = 0; i < foo.length; i++) {
          foo[i].games = foo[i].originalGames;
        }
        return {
          yearGames: foo
        }
      });
    }
  }

  render() {
    let months = [];
    if (this.state.yearGames) {
      for (let i = 1; i <= 12; i++) {
        months.push(
          <Month
            className={i==this.state.currentMonth ? '' : 'is-hidden'}
            monthId={i}
            games={this.state.yearGames[i-1].games}
            displayDayModal={this.displayDayModal}
          />
        )
      }
    }
    return <div id="calendar" className="calendar">
      {months}
    </div>;
  }
}

export default Calendar;
