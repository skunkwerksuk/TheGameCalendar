export const submitFilterAnalytic = (host, ReactGA, value) => {
  if (host != 'localhost') {
    ReactGA.event({
      category: 'filter',
      action: 'Filtered by platform',
      value: value
    });
    return true;
  } else {
    return false;
  }
};

export const submitSearchAnalytic = (host, ReactGA, value) => {
  if (host != 'localhost') {
    ReactGA.event({
      category: 'search',
      action: 'Searched for a game',
      value: value
    });
    return true;
  } else {
    return false;
  }
};

export const submitModalAnalytic = (host, ReactGA, value) => {
  if (host != 'localhost') {
    ReactGA.modalview(value);
    return true;
  } else {
    return false;
  }
};

export const submitPageViewAnalytic = (host, ReactGA, value) => {
  if (host != 'localhost') {
    ReactGA.pageview(value);
    return true;
  } else {
    return false;
  }
};

