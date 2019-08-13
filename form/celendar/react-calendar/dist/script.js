function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const arrMonth = {
  January: 30,
  February: 27,
  March: 30,
  April: 29,
  May: 30,
  June: 29,
  July: 30,
  August: 30,
  September: 29,
  October: 30,
  November: 29,
  December: 30 };

const arrDays = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"];


class Calendar extends React.Component {
  constructor() {
    super();_defineProperty(this, "pushTable",



























    (table, children) => {
      table.push(
      React.createElement("tbody", { key: table },
      React.createElement("tr", { key: children }, children)));


      return [];
    });_defineProperty(this, "createTable",
    () => {
      let table = [];
      // Outer loop to create parent
      let count = 1 - this.state.firstDay;
      //let startval = this.firstDay;
      let children = [];
      for (let i = 0; i < 7; i++) {
        children.push(React.createElement("td", { key: i }, arrDays[i].substring(0, 3)));
      }
      children = this.pushTable(table, children);
      while (count <= this.state.strMonthValue + 1) {
        //Inner loop to create children
        for (let j = 0; j < 7; j++) {
          count <= this.state.strMonthValue + 1 && count > 0 ?
          children.push(
          React.createElement("td", {
            key: count,
            onClick: this.onItemClick.bind(this),
            className: `item-block ${
            this.state.day === count ? "active" : "inactive"
            }`,
            "data-id": count },

          count)) :


          children.push(React.createElement("td", { key: count }));

          count += 1;
        }
        //Create the parent and add the children
        children = this.pushTable(table, children);
        //startval = 0;
      }
      return table;
    });_defineProperty(this, "previousMonth",
    () => {
      let lastDay = this.state.firstDay - 1 < 0 ? 6 : this.state.firstDay - 1;
      if (this.state.month - 1 < 0) {
        this.setState({ year: this.state.year - 1, month: 11 }, () => {
          let newMonth = this.state.month;
          let newYear = this.state.year;
          this.calcPrevMonth(lastDay, newMonth, newYear);
        });
      } else {
        this.setState({ month: this.state.month - 1 }, () => {
          let newMonth = this.state.month;
          this.calcPrevMonth(lastDay, newMonth, this.state.year);
        });
      }
      return this.createTable();
    });_defineProperty(this, "nextMonth",
    () => {
      let lastDay = this.state.firstDay + this.state.strMonthValue % 7;
      let firstDay = lastDay + 1 > 6 ? lastDay - 6 : lastDay + 1;
      if (this.state.month + 1 > 11) {
        this.setState(
        { year: this.state.year + 1, month: 0, firstDay: firstDay },
        () => {
          let newMonth = this.state.month;
          let newYear = this.state.year;
          this.calcNextMonth(newMonth, newYear);
        });

      } else {
        this.setState({ month: this.state.month + 1, firstDay: firstDay }, () => {
          let newMonth = this.state.month;
          this.calcNextMonth(newMonth, this.state.year);
        });
      }
      return this.createTable();
    });this.today = new Date(); //e.g. Saturday 20th July 2019
    let year = parseInt(this.today.toJSON().slice(0, 4)); //2019
    let month = parseInt(this.today.toJSON().slice(5, 7)) - 1; // e.g. 7 - 1
    this.dayToday = parseInt(this.today.toJSON().slice(8, 10)) - 1; // e.g. 20 - 1
    this.weekdayToday = this.today.getDay() === 0 ? 6 : this.today.getDay() - 1; // e.g. 5
    let _firstDay = this.weekdayToday - this.dayToday % 7;_firstDay = _firstDay < 0 ? 6 - _firstDay : _firstDay; //5 - (19 % 7) = 0
    let strMonth = Object.keys(arrMonth)[month]; //July
    let strMonthValue = Object.values(arrMonth)[month]; //30
    if (month === 1 && year % 4 === 0) {strMonthValue = 28;}this.state = { year: year, //e.g. 2019
      month: month, //e.g. 6
      day: this.dayToday + 1, //e.g. 20
      firstDay: _firstDay, //e.g. 0
      strMonth: strMonth, //July
      strMonthValue: strMonthValue //30
    };}onItemClick(event) {this.setState({ day: parseInt(event.currentTarget.dataset.id) });}calcPrevMonth(lastDay, newMonth, newYear) {let newMonthValue = Object.values(arrMonth)[newMonth];if (this.state.month === 1 && newYear % 4 === 0) {newMonthValue = 28;}let first = lastDay - newMonthValue % 7;first = first < 0 ? 7 + first : first;console.log(lastDay);this.setState({ strMonth: Object.keys(arrMonth)[newMonth], strMonthValue: newMonthValue, firstDay: first, day: newMonthValue + 1 });

  }
  calcNextMonth(newMonth, newYear) {
    let newMonthValue = Object.values(arrMonth)[newMonth];
    if (this.state.month === 1 && newYear % 4 === 0) {
      newMonthValue = 28;
    }
    this.setState({
      strMonth: Object.keys(arrMonth)[newMonth],
      strMonthValue: newMonthValue,
      day: 1 });

  }
  render() {
    return (
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-4", id: "col-left" },
      React.createElement("div", { className: "row", id: "part-1" },
      React.createElement("div", { className: "col" },
      React.createElement("h2", null, "Today"),
      React.createElement("h1", null, this.dayToday + 1),
      React.createElement("h5", null, arrDays[this.weekdayToday])))),




      React.createElement("div", { className: "col-8", id: "col-right" },
      React.createElement("div", { className: "row", id: "title" },
      React.createElement("div", { className: "col-3 my-auto", id: "l-arrow" },
      React.createElement("button", { className: "btn", onClick: this.previousMonth }, "<")),



      React.createElement("div", { className: "col-6", id: "title-date" }, `${this.state.strMonth} ${
      this.state.year
      }`),
      React.createElement("div", { className: "col-3 my-auto", id: "r-arrow" },
      React.createElement("button", { className: "btn", onClick: this.nextMonth }, ">"))),




      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col" },
      React.createElement("table", { className: "table" }, this.createTable()))))));





  }}

ReactDOM.render(React.createElement(Calendar, null), document.getElementById("root"));