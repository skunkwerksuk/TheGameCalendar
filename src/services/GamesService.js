import axios from 'axios';

// const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';
// const url = 'http://localhost:3001/';
const newUrl = 'https://r49h3dsh07.execute-api.us-east-2.amazonaws.com/dev';
// const newUrl = 'https://r49h3dsh07.execute-api.us-east-2.amazonaws.com/dev/game/{gameId}';

export function newGetGamesByMonthYear(month, year) {
  return axios.get(`${newUrl}/release-dates/${year}/${month}`).then((response) => {
    return response;
  }).catch(err => {
    console.warn(err);
  });
}

export function getGameById(gameId) {
  return axios.get(`${newUrl}/game/${gameId}`).then((response) => {
    return response;
  }).catch(err => {
    console.log(err);
  });
}

export function searchGamesByTerm(searchTerm) {
  return axios.get(`${newUrl}/game-search/${searchTerm}`).then((response) => {
    return response;
  }).catch(err => {
    console.log(err);
  });
}

export function getMostAnticipatedGames(platform) {
  return axios.get(`${newUrl}/games/most-anticipated/${platform ? platform : ''}`).then((response) => {
    return response;
  }).catch(err => {
    console.log(err);
  });
}
