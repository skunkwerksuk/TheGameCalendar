import React from 'react';
import Month from '../MonthTwo';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentMonth
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      currentMonth: props.currentMonth
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
    let fromDate = new Date(2019, this.state.currentMonth-1, 1, 0, 0, 0);
    let toDate = new Date(2019, this.state.currentMonth-1, this.daysInThisMonth(this.state.currentMonth), 23, 59, 59);
    axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
    .then(function (response) {
      let games = response.data;
      let yearGames = [];

      for (let i = 1; i <= 12; i++) {
        const currentGames = games.filter((el) => {
          let monthNo = el.m;
          return monthNo == i;
        })
        yearGames.push({
          month: i,
          games: currentGames
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
    let nextMonth = thisMonth + 1;
    let lastMonth = thisMonth - 1;
    // const url = 'http://localhost:3001/';
    const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';
    if (this.state.yearGames[nextMonth-1].games.length == 0) {
      let fromDate = new Date(2019, nextMonth-1, 1, 0, 0, 0);
      let toDate = new Date(2019, nextMonth-1, this.daysInThisMonth(nextMonth), 23, 59, 59);
      axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
      .then((response) => {
        this.setState(state => {
          let foo = state.yearGames;
          foo[nextMonth-1].games = foo[nextMonth-1].games.concat(response.data);
          return {
            yearGames: foo
          }
        })
      })
      .catch((err) => { console.log(err) })
    }
    
    if (this.state.yearGames[lastMonth-1].games.length == 0) {
      let fromDate = new Date(2019, lastMonth-1, 1, 0, 0, 0);
      let toDate = new Date(2019, lastMonth-1, this.daysInThisMonth(lastMonth), 23, 59, 59);
      axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`)
      .then((response) => {
        this.setState(state => {
          let foo = state.yearGames;
          foo[lastMonth-1].games = foo[lastMonth-1].games.concat(response.data);
          return {
            yearGames: foo
          }
        })
      })
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
