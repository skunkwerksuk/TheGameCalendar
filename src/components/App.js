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

  showModal = () => {
    document.getElementById('calendar').classList.add('modal-open');
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
          <Calendar currentMonth={this.state.currentMonth} showModal={this.showModal} />
          <DayModal />
        </div>
      </div>
    );
  }
}

export default App;
