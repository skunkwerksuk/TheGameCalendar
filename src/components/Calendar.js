import React from 'react';
import Month from './Month';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date().getMonth()+1
    };
  }

  componentDidMount() {
    console.log('hey')
    var there = this;
    axios.get('http://localhost:3001/')
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
    return <div className="">
      <h1>The Game Calendar - {monthNames[this.state.currentMonth-1]}</h1>
      {months}
      <button onClick={() => this.prevMonth()}>PREVIOUS</button>
      <button onClick={() => this.nextMonth()}>NEXT</button>
    </div>;
  }
}

export default Calendar;
