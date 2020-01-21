import React from 'react';
import Day from './DayTwo';
import moment from 'moment';

function daysInThisMonth(i) {
  var now = new Date();
  return new Date(now.getFullYear(), i, 0).getDate();
}

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      days: daysInThisMonth(props.monthId),
      games: props.games
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      games: nextProps.games
    })
  }

  daysInThisMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  componentDidMount() {
    let currentDate = moment().format('DD MMMM YYYY');
    if (document.getElementById(currentDate)) {
      document.getElementById(currentDate).scrollIntoView();
    }
  }

  render() {
    const gameList = this.state.games;
    const monthClasses = '';
    const dateMap = [];
    const monthDays = [];

    for (let i = 1; i <= this.state.days; i++) {
      dateMap.push({ date: i, games: []})
    }

    if (gameList.length > 0) {
      for (let i = 0; i < gameList.length; i++) {
        let releaseDate = new Date(gameList[i].date*1000);
        const date = releaseDate.getDate();
        dateMap[date-1].games.push(gameList[i]);
      }
    }

    dateMap.forEach((element, index) => {
      monthDays.push(<Day displayModal={this.props.displayDayModal} key={index} games={element.games} className={element.className} dayId={element.date} monthId={this.props.monthId}/>);
    });

    return <div id="monthView" className={`${monthClasses}${this.props.className}`}>
      {monthDays}
    </div>;
  }
}

export default Month;
