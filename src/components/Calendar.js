/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Month from './Month';

function Calendar(props) {
  return <div id="calendar" className="calendar">
    <Switch>
      <Route path={['/month-view/:month/:year', '/']}>
        <Month
          filters={props.filterProps}
          displayDayModal={props.displayDayModal}
        />
      </Route>
    </Switch>
  </div>;
}

export default Calendar;
