import React from 'react';
import GameItem from './GameItem';
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
  }

  displayModal = (games, date) => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const monthId = this.props.monthId-1;
    this.props.displayDayModal(games, `${date} ${months[monthId]}`)
  }

  render(){
    const gameList = this.state.games;
    const monthClasses = '';
    const monthDays = [];
    let gameCount = gameList.length;
    let className = `page-panel`;

    for (let i = 0; i < gameList.length; i++) {
      if (i < gameList.length - 3 && gameList[i].game.popularity < 10 && gameList[i + 1].game.popularity < 10 && gameList[i + 2].game.popularity < 10 && gameList[i + 3].game.popularity < 10) {
        let releaseDate = new Date(gameList[i].game.date*1000);
        let releaseDate2 = new Date(gameList[i + 1].game.date*1000);
        let releaseDate3 = new Date(gameList[i + 2].game.date*1000);
        let releaseDate4 = new Date(gameList[i + 3].game.date*1000);

        monthDays.push(<div className={className}>
          <GameItem displayModal={this.displayModal} date={releaseDate} key={i} foo={gameList[i]} className='half-item' />
          <GameItem displayModal={this.displayModal} date={releaseDate2} key={i+1} foo={gameList[i + 1]} className='half-item' />
        </div>);
        monthDays.push(<div className={className}>
          <GameItem displayModal={this.displayModal} date={releaseDate2} key={i} foo={gameList[i + 2]} className='half-item' />
          <GameItem displayModal={this.displayModal} date={releaseDate3} key={i+1} foo={gameList[i + 3]} className='half-item' />
        </div>);
        i++;
        i++;
        i++;
        i++;
      } else if (i < gameList.length - 2 && gameList[i].game.popularity < 10 && gameList[i + 1].game.popularity < 10 && gameList[i + 2].game.popularity < 10) {
        let releaseDate = new Date(gameList[i].game.date*1000);
        let releaseDate2 = new Date(gameList[i + 1].game.date*1000);
        let releaseDate3 = new Date(gameList[i + 2].game.date*1000);

        monthDays.push(<div className={className}>
          <GameItem displayModal={this.displayModal} date={releaseDate} key={i} foo={gameList[i]} className='third-item' />
          <GameItem displayModal={this.displayModal} date={releaseDate2} key={i+2} foo={gameList[i + 1]} className='third-item' />
          <GameItem displayModal={this.displayModal} date={releaseDate3} key={i+1} foo={gameList[i + 2]} className='third-item' />
        </div>);
        i++;
        i++;
        i++;
      } else if (i < gameList.length - 1 && gameList[i].game.popularity < 10 && gameList[i + 1].game.popularity < 10) {
        let releaseDate = new Date(gameList[i].game.date*1000);
        let releaseDate2 = new Date(gameList[i + 1].game.date*1000);

        monthDays.push(<div className={className}>
          <GameItem displayModal={this.displayModal} date={releaseDate} key={i} foo={gameList[i]} className='half-item' />
          <GameItem displayModal={this.displayModal} date={releaseDate2} key={i+1} foo={gameList[i + 1]} className='half-item' />
        </div>);
        i++;
      } else {
        let releaseDate = new Date(gameList[i].game.date*1000);
        monthDays.push(<div className={className}><GameItem isbig={true} displayModal={this.displayModal} date={releaseDate} key={i} foo={gameList[i]} className='is-big' /></div>);
      }
    }

    let height = Math.ceil(gameList.length / 7);
    return <div className={`month ${monthClasses} ${this.props.className} stack-${height}`}>
      {monthDays}
    </div>;
  }
}

export default Month;
