import React from 'react';
import Day from './DayTwo';

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
  }

  // displayModal = (games, date) => {
  //   const months = ["January", "February", "March", "April", "May", "June",
  //       "July", "August", "September", "October", "November", "December"
  //     ];
  //   const monthId = this.props.monthId-1;
  //   this.props.displayDayModal(games, `${date} ${months[monthId]}`)
  // }

  render() {
    const gameList = this.state.games;
    const monthClasses = '';
    const dateMap = [];
    const monthDays = [];
    let gameCount = gameList.length;
    let className = `page-panel`;


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
      monthDays.push(<Day displayModal={this.props.displayDayModal} key={index} games={element.games} className={element.className} />);
    });

    return <div className={` ${monthClasses} ${this.props.className}`}>
      {monthDays}
    </div>;
  }
}

export default Month;
