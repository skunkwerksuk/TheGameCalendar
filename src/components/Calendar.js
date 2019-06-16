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
      days: daysInThisMonth(),
      games: [
        {title: "Fallout 76: Nuclear Winter expansion", platforms: ["PC", "PS4", "XBO"], releaseDate: 1560124800},
        {title: "The Last Remnant Remastered", platforms: ["Switch"], releaseDate: 1560124800},
        {title: "Battle Worlds: Kronos", platforms: ["Switch"], releaseDate: 1560211200},
        {title: "Collection of Mana", platforms: ["Switch"], releaseDate: 1560211200},
        {title: "Cadence of Hyrule", platforms: ["Switch"], releaseDate: 1560384000},
        {title: "Forza Horizon 4: Lego Speed Champions DLC", platforms: ["PC", "XBO"], releaseDate: 1560384000},
        {title: "World End Syndrome", platforms: ["PS4", "Switch"], releaseDate: 1560470400},
        {title: "Another Sight", platforms: ["PC", "PS4", "XBO"], releaseDate: 1560816000},
        {title: "Bloodstained: Ritual of the Night", platforms: ["PC", "PS4", "XBO"], releaseDate: 1560816000},
        {title: "Citizens of Space", platforms: ["PC", "PS4", "XBO", "Switch"], releaseDate: 1560816000},
        {title: "Lovely Planet 2", platforms: ["PC"], releaseDate: 1560816000},
        {title: "Mini-Mech Mayhem", platforms: ["PSVR"], releaseDate: 1560816000},
        {title: "Vacation Simulator", platforms: ["PSVR"], releaseDate: 1560816000},
        {title: "Boxing Champs", platforms: ["Switch"], releaseDate: 1560988800},
        {title: "Catan", platforms: ["Switch"], releaseDate: 1560988800},
        {title: "Muse Dash", platforms: ["PC", "Switch"], releaseDate: 1560988800},
        {title: "My Friend Pedro", platforms: ["PC", "Switch"], releaseDate: 1560988800},
        {title: "Scrap Rush", platforms: ["PC", "Switch"], releaseDate: 1560988800},
        {title: "Tech Corp.", platforms: ["PC"], releaseDate: 1560988800},
        {title: "Captain Cat", platforms: ["Switch"], releaseDate: 1561075200},
        {title: "Crash Team Racing Nitro-Fueled", platforms: ["PS4", "XBO", "Switch"], releaseDate: 1561075200},
        {title: "Judgment", platforms: ["PS4"], releaseDate: 1561075200},
        {title: "The Sims 4: Island Living expansion", platforms: ["PC"], releaseDate: 1561075200},
        {title: "Triton Survival", platforms: ["PC"], releaseDate: 1561075200},
        {title: "Heavy Rain", platforms: ["PC"], releaseDate: 1561334400},
        {title: "Bloodstained: Ritual of the Night", platforms: ["Switch"], releaseDate: 1561420800},
        {title: "Judgment", platforms: ["PS4"], releaseDate: 1561420800},
        {title: "Monster Jam Steel Titans", platforms: ["PC", "PS4", "XBO"], releaseDate: 1561420800},
        {title: "Mutant Year Zero: Road to Eden", platforms: ["PC", "PS4", "XBO", "Switch"], releaseDate: 1561420800},
        {title: "Ace Combat 7: Skies Unknown: ADF-01 FALKEN DLC", releaseDate: 1561507200},
        {title: "Battlefield 5: Chapter 4: Defying The Odds", platforms: ["PC", "PS4", "XBO"], releaseDate: 1561593600},
        {title: "My Child Lebensborn", platforms: ["PC"], releaseDate: 1561593600},
        {title: "The Sinking City", platforms: ["PC", "PS4", "XBO"], releaseDate: 1561593600},
        {title: "Tour de France 2019", platforms: ["PS4", "XBO"], releaseDate: 1561593600},
        {title: "Virtua Racing", platforms: ["Switch"], releaseDate: 1561593600},
        {title: "Wonder Boy: Monster Land", platforms: ["Switch"], releaseDate: 1561593600},
        {title: "F1 2019", platforms: ["PC", "PS4", "XBO"], releaseDate: 1561680000},
        {title: "Super Mario Maker 2", platforms: ["Switch"], releaseDate: 1561680000},
      ]
    };
  }

  componentDidMount() {

  }

  render(){
    var date = new Date();
    const gameList = this.state.games;
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = firstDate.getDay();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let dateMap = []
    let monthDays = [];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

   

    for (let i = 1; i <= this.state.days; i++) {
      if (date.getDate() === i) {
        dateMap.push({ date: i, games: [], className: 'today'})
      } else {
        dateMap.push({ date: i, games: []})
      }
    }
    
    for (let i = 0; i < gameList.length; i++) {
      const releaseDate = new Date(gameList[i].releaseDate*1000);
      const date = releaseDate.getDate();
      dateMap[date-1].games.push(gameList[i]);
    }
    
    for(let i = 0; i < firstDay - 1; i++) {
      dateMap.unshift({ date: 'blank', className: 'blank', games: [] });
    }
    
    dateMap.forEach((element, index) => {
      monthDays.push(<Day key={index} foo={element} className={element.className} />);
    });

    return <div className="calendar">
      <h1>The Game Calendar - {monthNames[date.getMonth()]}</h1>
      {monthDays}
    </div>;
  }
}

export default Calendar;
