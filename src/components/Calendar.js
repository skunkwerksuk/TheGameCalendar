import React from 'react';
import Month from './Month';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentMonth
    };
  }
  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      currentMonth: props.currentMonth
    })
  }

  displayDayModal = (games, date) => {
    this.props.displayDayModal(games, date)
  }

  componentDidMount() {
    var there = this;
    // axios.get('https://damp-waters-19516.herokuapp.com/games')
    let fromDate = new Date(2019, 6, 1, 0, 0, 0);
    let toDate = new Date(2019, 6, 31, 23, 59, 59);
    axios.get(`https://damp-waters-19516.herokuapp.com/release-dates?fromDate=${fromDate}&toDate=${toDate}`)
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
        games: yearGames[5].games,
        yearGames
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let months = [];
    if (this.state.games) {
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
      <div className="weekDayHeader">
        <div className="weekend">S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div className="weekend">S</div>
      </div>
      {months}
    </div>;
  }
}

export default Calendar;
