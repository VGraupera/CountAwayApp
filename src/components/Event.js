import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native';
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
  View,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
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
    return (
      <Container>
        <Content>
          <View style={{
            flex: 1,
            flexDirection:'column',
            alignItems:'center',
            justifyContent: 'center',
            margin: 10
          }}>
          <Text style={styles.heading}>{workdayCount(this.state.date)}</Text>
          <Text style={styles.text}>working days until</Text>
          <Button
            full
            primary
            onPress={this._showDateTimePicker}
            style={{
              margin: 10
            }}
          >
            <Text>{moment(this.state.date).format("dddd, LL")}</Text>
          </Button>
          <Text style={styles.text}>Total days: {dayCount(this.state.date)}</Text>
          <Text style={styles.text}>Number of non-working days: {holidaysThru(this.state.date).length}</Text>
          <Button
            full
            rounded
            onPress={this._showDaysOff}
            style={{
              margin: 10
            }}
          >
            <Text>Edit</Text>
          </Button>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked.bind(this)}
            onCancel={this._hideDateTimePicker}
            date={this.state.date}
          />
        </View>
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 48,
    fontWeight:'bold',
    paddingTop:20,
    paddingBottom:10,
  },
  text: {
    fontSize: 20,
  }
});
