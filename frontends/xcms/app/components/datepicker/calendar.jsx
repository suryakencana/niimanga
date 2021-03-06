var React = require('react');
var Day = require('components/datepicker/day');
var DateUtil = require('components/datepicker/util/date');

var Calendar = React.createClass({
  mixins: [require('react-onclickoutside')],

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    return {
      date: new DateUtil(this.props.selected).safeClone(this.props.moment())
    };
  },

  getDefaultProps: function() {
    return {
      weekStart: 1
    };
  },

  componentWillMount: function() {
    this.initializeMomentLocale();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.selected === null) { return; }

    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: new DateUtil(nextProps.selected).clone()
      });
    }
  },

  initializeMomentLocale: function() {
    var weekdays = this.props.weekdays.slice(0);
    weekdays = weekdays.concat(weekdays.splice(0, this.props.weekStart));

    this.props.moment.locale(this.props.locale, {
      week: {
        dow: this.props.weekStart
      },
      weekdaysMin : weekdays
    });
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick: function(day) {
    this.props.onSelect(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key}>
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay: function(day, key) {
    var minDate = new DateUtil(this.props.minDate).safeClone(),
        maxDate = new DateUtil(this.props.maxDate).safeClone(),
        disabled = day.isBefore(minDate) || day.isAfter(maxDate);

    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)}
        disabled={disabled} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  header: function() {
    return this.props.moment.weekdaysMin().map(function(day, key) {
      return <div className="dt__day" key={key}>{day}</div>;
    });
  },

  render: function() {
    return (
      <div className="dt">
        <div className="dt__triangle"></div>
        <div className="dt__header">
          <a className="dt__navigation dt__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          <span className="dt__current-month">
            {this.state.date.localeFormat(this.props.locale, this.props.dateFormat)}
          </span>
          <a className="dt__navigation dt__navigation--next"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <div className="dt__month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
