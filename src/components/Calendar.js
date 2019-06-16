import React from 'react';
import Day from './Day';

function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      days: daysInThisMonth()
    };
  }

  componentDidMount() {

  }

  render(){
    let monthDays = [];
    let preDays = [];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date();
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = firstDate.getDay();
    console.log(firstDay)
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for(let i = 0; i < firstDay - 1; i++) {
      preDays.push(<Day key={i} className="blank" date='blank' />);      
    }

    for (let i = 1; i <= this.state.days; i++) {
      monthDays.push(<Day key={i} date={i} />);
    }
    
    return <div className="calendar">
      <h1>Calendar</h1>
      {preDays}
      {monthDays}
    </div>;
  }
}

export default Calendar;
