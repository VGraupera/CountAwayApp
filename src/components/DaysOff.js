import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
import {
  daysOff,
} from '../utility';

export default class CalendarsList extends Component {
  static navigationOptions = {
    title: 'Non-working Days'
  };

  constructor(props) {
    super(props);
    this.state = {
      markedDates: {
          //'2018-05-16': {selected: true, selectedColor: 'blue'},
      }
    }
  }

  componentWillMount() {
    let markedDates = {};
    for (var value of daysOff()) {
      markedDates[value.date] = {selected: true, selectedColor: 'blue'};
    }

    this.setState({
      markedDates
    });
  }

  _selectDay(day) {
    console.log('selected day', day)
  }

  render() {
    return (
      <CalendarList
        onDayPress={this._selectDay.bind(this)}
        markedDates={this.state.markedDates}
      />
    );
  }
}
