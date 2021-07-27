import axios from 'axios';

// const url = 'http://game-calendar-web-service.us-east-2.elasticbeanstalk.com/';
// const url = 'http://localhost:3001/';
const url = 'https://6ogt74v5b6.execute-api.us-east-2.amazonaws.com/dev/';
const newUrl = 'https://r49h3dsh07.execute-api.us-east-2.amazonaws.com/dev';
// const newUrl = 'https://r49h3dsh07.execute-api.us-east-2.amazonaws.com/dev/game/{gameId}';

export function getGamesByMonthYear(month, year) {
  // TODO: Change to not use month - 1
  const fromDate = new Date(year, month - 1, 1, 0, 0, 0);
  const toDate = new Date(year, month - 1, daysInMonth(month), 23, 59, 59);

  return axios.get(`${url}release-dates?fromDate=${fromDate}&toDate=${toDate}`).then((response) => {
    return response;
  }).catch(err => {
    console.warn(err);
  });
}

export function newGetGamesByMonthYear(month, year) {
  return axios.get(`${newUrl}/release-dates/${year}/${month}`).then((response) => {
    return response;
  }).catch(err => {
    console.warn(err);
  });
}

export function getGameById(gameId) {
  return axios.get(`${url}game?id=${gameId}`).then((response) => {
    return response;
  }).catch(err => {
    console.log(err);
  });
}

export function getGamesByMonthYearArray(arrayList) {
  const newArry = [];
  arrayList.forEach((item) => {
    newArry.push(getGamesByMonthYear(item.month, item.year));
  });

  return axios.all(newArry);
}


function daysInMonth(inMonth) {
  const now = new Date();
  return new Date(now.getFullYear(), inMonth, 0).getDate();
}