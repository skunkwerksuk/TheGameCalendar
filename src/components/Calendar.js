import React from 'react';
import Month from './Month';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: (new Date().getMonth()+1)
    };
  }

  componentDidMount() {
    console.log('hey')
    var there = this;
    axios.get('https://damp-waters-19516.herokuapp.com/')
    .then(function (response) {
      console.log(response.data);

      let games = response.data;
      let month = new Date().getMonth();

      let yearGames = [];

      for (let i = 1; i <= 12; i++) {
        const currentGames = games.filter((el) => {
          let monthNo = parseInt(el.ReleaseDate.substring(5, 7));
          return monthNo === i;
        })
        yearGames.push({
          month: i,
          games: currentGames
        })
      }

      console.log(yearGames)



      there.setState({
        games: yearGames[5].games,
        yearGames
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  nextMonth() {
    let month = new Date().getMonth();
    console.log('wot')
    this.setState({
      currentMonth: this.state.currentMonth + 1
    })
  }

  prevMonth() {
    let month = new Date().getMonth();
    console.log('wot')
    this.setState({
      currentMonth: this.state.currentMonth - 1
    })
  }

  render(){
    console.log('currmonth', this.state.currentMonth)
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var date = new Date();
    let months = [];
    if (this.state.games) {
      for (let i = 1; i <= 12; i++) {
        months.push(<Month className={i==this.state.currentMonth ? '' : 'is-hidden'} monthId={i} games={this.state.yearGames[i-1].games} />)
      }
    }
    return <div className="calender">
      <h1 className="page-title">The Game Calendar - {monthNames[this.state.currentMonth-1]}</h1>
      <div className="weekDayHeader">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div className="weekend">S</div>
        <div className="weekend">S</div>
      </div>
      {months}
      <button onClick={() => this.prevMonth()}>PREVIOUS</button>
      <button onClick={() => this.nextMonth()}>NEXT</button>
    </div>;
  }
}

export default Calendar;
