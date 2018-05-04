import React from 'react';
import { StackNavigator } from 'react-navigation';
import DaysOff from './components/DaysOff';
import Event from './components/Event';
import { tracker } from './utility/analytics';

const Navigator = StackNavigator({
  Event: { screen: Event },
  DaysOff: { screen: DaysOff },
});

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Navigator
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);

        if (prevScreen !== currentScreen) {
          tracker.trackScreenView(currentScreen);
        }
      }}
    />;
  }
}
