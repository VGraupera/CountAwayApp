import React from 'react';
import { StackNavigator } from 'react-navigation';
import DaysOff from './components/DaysOff';
import Event from './components/Event';

const Navigator = StackNavigator({
  Event: { screen: Event },
  DaysOff: { screen: DaysOff },
});

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Navigator />;
  }
}
