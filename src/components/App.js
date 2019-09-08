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
      ],
      shortMonths: ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ] ,
      filterProps: {
        platforms: [ ]
      }
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

  filterTest = (ev) => {
    const input = ev.target;
    if (ev.target.checked) {
      this.setState(state => {
        const platforms = state.filterProps.platforms;
        platforms.push(input.value);
        return {
          filterProps: {
            platforms: platforms
          }
        }
      })
    } else {
      this.setState(state => {
        const platforms = state.filterProps.platforms.filter(platform => platform != input.value);
        return {
          filterProps: {
            platforms: platforms
          }
        }
      })
    }
  }

  clearFilters = () => {
    let checkboxes = document.getElementsByClassName('filter-checkbox');
    for(let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    this.setState({
      filterProps: {
        platforms: [ ]
      }
    })
  }

  displayDayModal = (games, date) => {
    let dateEl = `<h1>${date}</h1>`
    let gameList = games.map(el => {
      let x = el.platform.map(pl => `<span class="platform-items">${pl.name}</span>`).join(' ');
      return `<div class="game-name">${el.game.name}<div class="platform-wrapper">${x}</div></div>`
    }).join('');
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
        <div className="body-panel">
          <SidePanel
            month={this.state.months[this.state.currentMonth-1]}
            shortMonth={this.state.shortMonths[this.state.currentMonth-1]}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
            filterTest={this.filterTest}
            clearFilters={this.clearFilters}
          />
          <Calendar
            currentMonth={this.state.currentMonth}
            displayDayModal={this.displayDayModal}
            filterProps={this.state.filterProps}
          />
          <DayModal />
        </div>
      </div>
    );
  }
}

export default App;
