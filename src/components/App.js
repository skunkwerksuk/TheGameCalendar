import React from 'react';
import '../styles/App.scss';
import Calendar from './CalendarThree';
import HeaderPanel from './HeaderPanel';
import DayModal from './DayModal';
import SidePanel from './SidePanel';

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: (new Date().getMonth()+1),
      months: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };
  }
  nextMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth + 1
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth - 1
    })
  }

  displayDayModal = (games, date) => {
    // this.props.history.push('/day')
    let dateEl = `<h1>${date}</h1>`
    let gameList = games.map(el => {
      let x = el.platform.map(pl => `<span class="platform-items">${pl.name}</span>`).join(' ');
      return `<div class="game-name">${el.game.name}<div class="platform-wrapper">${x}</div></div>`
    }).join('');
    // console.log(games)
    document.getElementById('dayModalContent').innerHTML = dateEl;
    document.getElementById('dayModalContent').innerHTML += gameList;
    let modal = document.getElementById('modal');
    modal.classList.remove('is-hidden');
    let calendar = document.getElementById('calendar');
    calendar.classList.add('modal-open');
    let veil = document.getElementById('veil');
    veil.classList.remove('is-hidden');
  }

  render() {
    return (
      <div className="App">
        {/* <HeaderPanel month={this.state.months[this.state.currentMonth-1]} /> */}
        <div className="body-panel">
          <SidePanel
            month={this.state.months[this.state.currentMonth-1]}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
          />
          <Calendar currentMonth={this.state.currentMonth} displayDayModal={this.displayDayModal} />
          <DayModal />
        </div>
      </div>
    );
  }
}

export default App;
