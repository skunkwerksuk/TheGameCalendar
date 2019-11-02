import React from 'react';
import '../styles/App.scss';
import Calendar from './ListCalendar';
import GameViewModal from './GameViewModal';
import SidePanel from './SidePanel';
import axios from 'axios';

const apiUrl = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: (new Date().getMonth()+1),
      currentYear: (new Date().getFullYear()),
      yearBoundary: 0,
      months: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      shortMonths: ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ] ,
      filterProps: {
        platforms: [ ]
      },
      modalGame: {},
      loading: false
    };
  }
  nextMonth = () => {
    if (this.state.yearBoundary < 4) {
      this.state.yearBoundary++;
      if (this.state.currentMonth === 12) {
        this.setState({
          currentMonth: 1,
          currentYear: this.state.currentYear + 1
        })
      } else {
        this.setState({
          currentMonth: this.state.currentMonth + 1
        })
      }
    }
  }

  prevMonth = () => {
    if (this.state.yearBoundary > -4) {
      this.state.yearBoundary--;
      if (this.state.currentMonth === 1) {
        this.setState({
          currentMonth: 12,
          currentYear: this.state.currentYear - 1
        })
      } else {
        this.setState({
          currentMonth: this.state.currentMonth - 1
        })
      }
    }
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

  displayDayModal = (game, date, platforms) => {
    const that = this;
    this.setState({
      loading: true
    });
    console.log('pre-call', platforms)
    // console.log(`${apiUrl}game?id=${game.id}`)
    axios.get(`${apiUrl}game?id=${game.id}`)
    .then(function (response) {
      let gameResponse = response.data;
      // console.log('gamereponse name', gameResponse.name)
      if (gameResponse.name === undefined) {
        // console.log('applying name')
        gameResponse[0].name = game.name;
      }
      gameResponse[0].jsReleaseDate = date;
      gameResponse[0].platforms = platforms;
      // console.log('GAME RESPONSE', gameResponse)
      that.setState({
        modalGame: gameResponse[0],
        loading: false
      });
    })
    .catch(function (err) {
      console.log(err)
    })
    // console.log(game)
    let modal = document.getElementById('modal');
    let calendar = document.getElementById('calendar');
    let veil = document.getElementById('veil');
    modal.classList.remove('is-hidden');
    calendar.classList.add('modal-open');
    veil.classList.remove('is-hidden');
  }

  render() {
    return (
      <div className="App">
        <div className="body-panel">
          <SidePanel
            month={this.state.months[this.state.currentMonth-1]}
            currentYear={this.state.currentYear}
            shortMonth={this.state.shortMonths[this.state.currentMonth-1]}
            yearBoundary={this.state.yearBoundary}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
            filterTest={this.filterTest}
            clearFilters={this.clearFilters}
          />
          <Calendar
            currentMonth={this.state.currentMonth}
            currentYear={this.state.currentYear}
            displayDayModal={this.displayDayModal}
            filterProps={this.state.filterProps}
          />
          <GameViewModal
            game={this.state.modalGame}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default App;
