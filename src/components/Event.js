import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  workdayCount,
  dayCount,
  holidaysThru,
} from '../utility';

type Props = {};
export default class Event extends Component<Props> {
  static navigationOptions = {
    title: 'CountAway'
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isDateTimePickerVisible: false,
    }
  }

  async componentWillMount() {
    let savedDate = await AsyncStorage.getItem('savedDate');
    if(savedDate) {
      let date = new Date(savedDate)
      this.setState({
        date
      });
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showDaysOff = () => this.props.navigation.navigate('DaysOff')

  async _handleDatePicked(date) {
    await AsyncStorage.setItem(
      'savedDate',
        date.toISOString()
    );

    this.setState({date});
    this._hideDateTimePicker();
  };


  render() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
      <Container>
        <Content>
          <Text>{workdayCount(this.state.date)}</Text>
          <Text>working days until</Text>
          <Button
            onPress={this._showDateTimePicker}
          >
            <Text>{this.state.date.toLocaleDateString('en-US', options)}</Text>
          </Button>
          <Text>Total days: {dayCount(this.state.date)}</Text>
          <Text>Number of non-working days: {holidaysThru(this.state.date).length}</Text>
          <Button
            onPress={this._showDaysOff}
          >
            <Text>Edit</Text>
          </Button>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked.bind(this)}
            onCancel={this._hideDateTimePicker}
          />
        </Content>
      </Container>
    );
  }
}
