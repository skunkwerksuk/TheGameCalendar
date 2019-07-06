import React from 'react';
import '../styles/App.scss';
import Calendar from './Calendar';
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
    console.log('wot')
    this.setState({
      currentMonth: this.state.currentMonth + 1
    })
  }

  prevMonth = () => {
    console.log('wot')
    this.setState({
      currentMonth: this.state.currentMonth - 1
    })
  }

  displayDayModal = (games, date) => {
    let dateEl = `<h1>${date}</h1>`
    let gameList = games.map(el => `<div class="game-name">${el.game.name}</div>`).join('');
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
