import React from 'react';
import Day from './Day';
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

  daysInThisMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  componentDidMount() {
  }

  render(){
    const gameList = this.state.games;
    const dateMap = []
    const monthDays = [];
    let todaysDate = new Date();
    let firstDate = new Date(todaysDate.getFullYear(), this.props.monthId-1, 1);
    let monthClasses = '';
    let firstDay = firstDate.getDay();
    let lastDate = new Date(todaysDate.getFullYear(), this.props.monthId, 0);
    let lastDay = lastDate.getDay();

    for (let i = 1; i <= this.state.days; i++) {
      let dayDate = (new Date(2019, this.props.monthId-1, i)).getDay();
      let classPlus = (dayDate === 6 || dayDate === 0) ? ' weekend' : '';
      classPlus = (todaysDate.getDate() === i && this.props.monthId === (todaysDate.getMonth() + 1)) ? classPlus + ' today' : classPlus;
      dateMap.push({ date: i, games: [], className: classPlus, dayDate: dayDate})
    }
    
    if (gameList.length > 0) {
      for (let i = 0; i < gameList.length; i++) {
        let releaseDate = moment(gameList[i].ReleaseDate);
        const date = releaseDate.date();
        dateMap[date-1].games.push(gameList[i]);
      }
    }

    for(let i = 0; i < firstDay; i++) {
      let dayDate = (new Date(2019, this.props.monthId-1, 0 - i)).getDay();
      let x = (dayDate === 6 || dayDate === 0) ? 'blank weekend' : 'blank';
      dateMap.unshift({ date: ' ', className: x, games: [] });
    }

    if (dateMap.length > 35) {
      monthClasses = 'shortened';
    }
    
    let j = 1;
    for(let i = lastDay; i < 7; i++) {
      let foo = new Date(2019, this.props.monthId-1, lastDate.getDate() + j++);
      let dayDate = (foo).getDay();
      let x = (dayDate === 6 || dayDate === 0) ? 'blank weekend' : 'blank';
      dateMap.push({ date: ' ' , className: x, games: [] });
    }

    dateMap.forEach((element, index) => {
      monthDays.push(<Day key={index} foo={element} className={element.className} />);
    });
    

    return <div className={`month ${monthClasses} ${this.props.className}`}>
      {monthDays}
    </div>;
  }
}

export default Month;
