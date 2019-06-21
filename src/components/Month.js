import React from 'react';
import Day from './Day';
import axios from 'axios';
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
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

  componentDidMount() {
  }

  render(){
    var date = new Date();
    const gameList = this.state.games;
    var firstDate = new Date(date.getFullYear(), this.props.monthId-1, 1);

    let firstDay = firstDate.getDay();
    var lastDate = new Date(date.getFullYear(), this.props.monthId, 0);
    let lastDay = lastDate.getDay();
    let dateMap = []
    let monthDays = [];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 1; i <= this.state.days; i++) {
      let dayDate = (new Date(2019, date.getMonth(), i)).getDay();
      let classPlus = (dayDate == 6 || dayDate == 0) ? ' weekend' : '';
      if (date.getDate() === i && this.props.monthId == (date.getMonth() + 1)) {
        let className = 'today' + classPlus;
        dateMap.push({ date: i, games: [], className: 'today', dayDate: dayDate})
      } else {
        dateMap.push({ date: i, games: [], className: classPlus, dayDate: dayDate})
      }
    }
    
    if(gameList.length > 0) {
      for (let i = 0; i < gameList.length; i++) {
        let releaseDate = moment(gameList[i].ReleaseDate);
        const date = releaseDate.date();
        dateMap[date-1].games.push(gameList[i]);
      }

      
    }
    if (firstDay == 0) {
      firstDay = 7;
    }
    for(let i = 0; i < firstDay - 1; i++) {
      dateMap.unshift({ date: 'blank', className: 'blank', games: [] });
    }
    // console.log('lastDay',lastDate)
    // console.log(this.props.monthId + ': '+ lastDay)
    if (lastDay != 0) {
      for(let i = lastDay; i < 7; i++) {
        dateMap.push({ date: 'blank', className: 'blank', games: [] });
      }

    }
    dateMap.forEach((element, index) => {
      monthDays.push(<Day key={index} foo={element} className={element.className} />);
    });
    

    return <div className={'month ' + this.props.className}>
      {monthDays}
    </div>;
  }
}

export default Month;
