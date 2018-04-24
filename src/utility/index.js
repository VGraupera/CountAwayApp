import moment from 'moment';

export function workdayCount(date) {
  // adapted from
  //https://stackoverflow.com/questions/28425132/how-to-calculate-number-of-working-days-between-two-dates-in-javascript-using

  let start = moment();
  let end = moment(date);
  let holidays = 0;

  // days based on complete weeks
  const first = start.clone().endOf('week'); // end of first week
  const last = end.clone().startOf('week'); // start of last week

  const days = last.diff(first,'days') * 5 / 7; // this will always multiply of 7

  var wfirst = first.day() - start.day(); // check first week
  if(start.day() == 0) --wfirst; // -1 if start with sunday

  var wlast = end.day() - last.day(); // check last week
  if(end.day() == 6) --wlast; // -1 if end with saturday

  return Math.max(0,Math.floor(wfirst + days + wlast - 1));
}

export function dayCount(date) {
  let start = moment();
  let end = moment(date);
  return Math.max(0,end.diff(start, 'days'));
}

const holidays = [
  { name: "Memorial Day", date: "2018-05-28" },
  { name: "Independence Day", date: "2018-07-04" },
  { name: "Labor Day", date: "2018-09-03" },
  { name: "Veterans Day", date: "2018-11-12" },
  { name: "Thanksgiving Day", date: "2018-11-22" },
  { name: "Day after Thanksgiving", date: "2018-11-23" },
  { name: "Christmas Day", date: "2018-12-25" },
  { name: "New Year's Day", date: "2019-01-01" },
  { name: "Martin Luther King", date: "2019-01-21" },
  { name: "Washington’s Birthday", date: "2019-02-18" },
  { name: "Memorial Day", date: "2019-05-27" },
];

export function holidaysThru(endDate) {

  let startDate = moment();
  filterByDate = (value) => {
    return moment(value.date, "YYYY-MM-DD").isBetween(startDate, endDate, null, '[]');
  }

  return holidays.filter(filterByDate);
}

export function daysOff() {
  return holidays;
}
