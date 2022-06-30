var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var BookingTimeRow = function (_React$Component) {
  _inherits(BookingTimeRow, _React$Component);

  function BookingTimeRow(props) {
    _classCallCheck(this, BookingTimeRow);

    var _this = _possibleConstructorReturn(this, (BookingTimeRow.__proto__ || Object.getPrototypeOf(BookingTimeRow)).call(this, props));

    _this.clickButton = _this.clickButton.bind(_this);

    _this.state = {
      buttonred1: "",
      buttonred2: "",
      buttonred3: ""
    };

    return _this;
  }

  _createClass(BookingTimeRow, [{
    key: 'clickButton',
    value: function clickButton(e) {
      console.log("remake", e.target.id);
      if (document.getElementById('booktimearrayid').children.length == 0) {
        this.setState({ buttonred1: e.target.id });
      } else if (document.getElementById('booktimearrayid').children.length == 1) {
        this.setState({ buttonred2: e.target.id });
      } else if (document.getElementById('booktimearrayid').children.length == 2) {
        this.setState({ buttonred3: e.target.id });
      }
      this.props.onClickButton(e.target.innerHTML, e.target.id);
    }
  }, {
    key: 'render',
    value: function render() {

      console.log("remake needs to show twice");
      var buttons = "";
      var mystyle = {
        backgroundColor: 'red'
      };
      var mystylenothing = {
        backgroundColor: ''
      };

      var buttonid = this.props.monthnumber.toString() + this.props.active.toString() + "button" + this.props.timesomething.toString();

      if (this.state.buttonred1 == buttonid || this.state.buttonred2 == buttonid || this.state.buttonred3 == buttonid) {

        try {
          if (document.getElementById(buttonid).style.backgroundColor == "red") {
            buttons = React.createElement(
              'button',
              { style: mystylenothing, id: buttonid, onClick: this.clickButton },
              this.props.timesomething
            );
          } else {
            buttons = React.createElement(
              'button',
              { style: mystyle, id: buttonid, onClick: this.clickButton },
              this.props.timesomething
            );
          }
        } catch (err) {}
      } else {
        buttons = React.createElement(
          'button',
          { 'class': 'buttontimenotactive', id: buttonid, onClick: this.clickButton },
          this.props.timesomething
        );
      }

      console.log("WILACHAT IS THE BEST", this.state.buttonred1);

      return React.createElement(
        'div',
        { id: 'coversallbooktimeid', 'class': 'coversallbooktimeid' },
        buttons
      );
    }
  }]);

  return BookingTimeRow;
}(React.Component);

var BookLiveRow = function (_React$Component2) {
  _inherits(BookLiveRow, _React$Component2);

  function BookLiveRow(props) {
    _classCallCheck(this, BookLiveRow);

    var _this2 = _possibleConstructorReturn(this, (BookLiveRow.__proto__ || Object.getPrototypeOf(BookLiveRow)).call(this, props));

    _this2.clickHe = _this2.clickHe.bind(_this2);
    _this2.pickTime = _this2.pickTime.bind(_this2);
    _this2.dayThaiSecond = _this2.dayThaiSecond.bind(_this2);
    _this2.secondMonthConversion = _this2.secondMonthConversion.bind(_this2);

    _this2.state = {
      active: "",
      previousid: "",
      dayclickedlower: "",
      deletionstate: ""
    };

    return _this2;
  }

  _createClass(BookLiveRow, [{
    key: 'secondMonthConversion',
    value: function secondMonthConversion(month) {
      console.log("blah", month);
      var blah = this.props.onClickedMonthConversion(month);
      console.log("blah1", blah);
      return blah;
    }
  }, {
    key: 'dayThaiSecond',
    value: function dayThaiSecond(dayclicked) {
      console.log("is this in fuck me??", dayclicked);
      var youwillsee = this.props.onClickedDayThai(dayclicked);
      return youwillsee;
    }
  }, {
    key: 'pickTime',
    value: function pickTime(innerhtml, clickbuttonid, e) {
      if (this.state.active == "") {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล'
        });
      } else {
        console.log("SUZUKI", this.state.dayclickedlower);
        var daythai = this.dayThaiSecond(this.state.dayclickedlower);
        console.log("FUCK ME3", daythai);
        var whatttttt = this.secondMonthConversion(this.props.monthnumber);

        var idnumber = "";
        var randomtext = "";
        var randomtextagain = "";
        var checker = 0;

        //append into an array or smthing
        //if theres one in the array use booking two if theres two use booking 3
        if (document.getElementById('booktimearrayid').children.length > 2) {
          for (var i = 0; i < document.getElementById('booktimearrayid').children.length; i++) {
            var fakramdomtext = document.getElementById('booktimearrayid').children[i].innerHTML;
            randomtext = fakramdomtext.replace('<button>X</button>', '');

            if (randomtext == "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml) {
              document.getElementById(clickbuttonid).style.backgroundColor = '';
              document.getElementById('booktimearrayid').children[i].remove();
            }
          }

          console.log("cant add anymore mofo");
        } else {
          var targetdiv = document.getElementById('booktimearrayid');
          var div = document.createElement("div");
          var button = document.createElement("button");
          idnumber = "";

          if (document.getElementById('booktimearrayid').children.length == 0) {

            idnumber = 1;
          } else if (document.getElementById('booktimearrayid').children.length == 1) {

            idnumber = 2;
          } else {
            idnumber = 3;
          }
          button.innerHTML = "X";
          button.onclick = function () {
            console.log("why isnt no please", clickbuttonid);
            document.getElementById(clickbuttonid).style.backgroundColor = "";
            var removebutton = document.getElementById("วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml);
            removebutton.remove();
          };

          div.id = "วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml;

          for (var _i = 0; _i < targetdiv.children.length; _i++) {
            console.log("tilly birds", targetdiv.children);
            randomtextagain = "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml;
            randomtext = targetdiv.children[_i].innerHTML;
            randomtext = randomtext.replace('<button>X</button>', '');
            if (randomtext == randomtextagain) {
              console.log("getsunova");
              checker = 1;
            }
          }
          if (checker == 0) {
            console.log("check for targetdiv", targetdiv);
            console.log("wakawaka1", document.getElementById('booktimearrayid'));
            console.log("i dont know the", targetdiv);
            targetdiv.append(div);

            div.append("วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml);
            div.append(button);
          } else {

            console.log("kwai", "วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml);
            console.log("kwai", idnumber);

            console.log("cocaine", clickbuttonid);

            console.log("cocaine", document.getElementById(clickbuttonid).style.backgroundColor);
            document.getElementById(clickbuttonid).style.backgroundColor = "";
            console.log("cocaine", document.getElementById(clickbuttonid).style.backgroundColor);

            console.log("daythai", daythai);
            console.log("idnumber", idnumber);
            console.log("whatttttt", whatttttt);
            console.log("whatttttt2", this.state.active);

            var fakeidnumber = idnumber - 1;
            var _fakramdomtext = "";

            var yea = clickbuttonid;

            var after = yea.substring(yea.indexOf('n') + 1);
            console.log("successfull sure", after);

            console.log("fakkkey", "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml);

            console.log("god", document.getElementById('booktimearrayid').children.length);
            for (var _i2 = 0; _i2 < document.getElementById('booktimearrayid').children.length; _i2++) {
              var _fakramdomtext2 = document.getElementById('booktimearrayid').children[_i2].innerHTML;
              randomtext = _fakramdomtext2.replace('<button>X</button>', '');
              console.log("almost the best", document.getElementById('booktimearrayid').children[_i2].innerHTML);
              console.log("almost the best", "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml);

              if (randomtext == "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml) {

                console.log("almost the best");
                document.getElementById('booktimearrayid').children[_i2].remove();
              }
            }

            //let removebutton = document.getElementById("วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)
            // removebutton.remove()
          }
          //checker is a lil bit weird
          console.log("this is checker", checker);

          // targetdiv.insertAdjacentHTML('afterend', this.state.booktime1);  

        }
      }
    }
  }, {
    key: 'clickHe',
    value: function clickHe(value, idid) {

      var montheng = "";
      if (this.props.monthnumber == 5) {
        console.log("in here now?");
        montheng = "June";
      } else if (this.props.monthnumber == 6) {
        montheng = "July";
      } else if (this.props.monthnumber == 7) {
        montheng = "August";
      } else {
        montheng = "September";
      }

      var currentdate = montheng + " " + value + ", " + "2022";
      var z = new Date(currentdate);
      var dayy = z.getDay();

      console.log("day experimentation2", dayy);

      console.log("successfull or nah");
      this.setState({
        active: value,
        previousid: idid,
        dayclickedlower: dayy
      });

      var button_time_rows = [];
      var timesomething = "";
      for (var j = 0; j < 6; j++) {
        timesomething = j + 1;
        button_time_rows.push(React.createElement(BookingTimeRow, { monthnumber: this.props.monthnumber, timesomething: timesomething, active: value, onClickButton: this.pickTime }));
      }

      this.props.onClickDay(idid, value, button_time_rows);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var mystyle = {
        pointerEvents: 'none',
        opacity: 0.3
      };
      var mystylecorrect = {
        pointerEvents: 'auto',
        opacity: 1
      };

      var idid = this.props.monthnumber.toString() + this.props.rowname.toString();
      var what = "";

      for (var i = 0; i < this.props.onearray.length; i++) {
        if (idid == this.props.onearray[i]) {
          what = React.createElement(
            'button',
            { style: mystylecorrect, id: idid, 'class': this.state.active == this.props.rowname ? "active" : "notactive", onClick: function onClick() {
                return _this3.clickHe(_this3.props.rowname, idid);
              } },
            this.props.rowname
          );

          break;
        }
        what = React.createElement(
          'button',
          { style: mystyle, id: idid, 'class': this.state.active == this.props.rowname ? "active" : "notactive", onClick: function onClick() {
              return _this3.clickHe(_this3.props.rowname, idid);
            } },
          this.props.rowname
        );
      }

      return React.createElement(
        'li',
        null,
        what
      );
    }
  }]);

  return BookLiveRow;
}(React.Component);

var BookLivePage = function (_React$Component3) {
  _inherits(BookLivePage, _React$Component3);

  function BookLivePage(props) {
    _classCallCheck(this, BookLivePage);

    var _this4 = _possibleConstructorReturn(this, (BookLivePage.__proto__ || Object.getPrototypeOf(BookLivePage)).call(this, props));

    _this4.changeMonth = _this4.changeMonth.bind(_this4);
    _this4.monthConversion = _this4.monthConversion.bind(_this4);
    _this4.clickDay = _this4.clickDay.bind(_this4);
    _this4.dayThai = _this4.dayThai.bind(_this4);
    _this4.saveReserve = _this4.saveReserve.bind(_this4);

    var d = new Date();
    var month = d.getMonth();
    var thaimonth = _this4.monthConversion(month, "constructor");

    var w = new Date();
    var day = w.getDate();
    console.log("this is day", day);

    console.log("this is thaimonth", thaimonth);
    /* request for live -> choose 3 time -> in inbox -> normal -> history ror doo wa what time dai bab dara is choosing time then por dai gor ja plien pen showwela nun mee 3 steps un pokati mee kae 2 then dara choose time to accept OR cancel order
    -> then when wun nud sed gor ma jer gun torn t decidated place wela nun (you cant just randomly call cuz that is dumb) */
    _this4.state = {
      active: day,
      notactive: "",
      currentmonth: month,
      themonth: thaimonth,
      monthnumber: month,
      themonthdetail: "",
      dayclicked: "",
      currentdateclicked: "",
      daysallow: [],
      constantbuttonrows: ""

    };
    return _this4;
  }

  _createClass(BookLivePage, [{
    key: 'saveReserve',
    value: function saveReserve(e) {
      console.log("saving");
      var randomtext = "";
      var savetextarray = [];
      if (document.getElementById('booktimearrayid').children.length == 0) {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล'
        });
      } else if (document.getElementById('liveinfoid').value == "") {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล'
        });
      } else {
        for (var i = 0; i < document.getElementById('booktimearrayid').children.length; i++) {
          randomtext = document.getElementById('booktimearrayid').children[i].innerHTML;

          randomtext = randomtext.replace('<button>X</button>', '');
          savetextarray.push(randomtext);
        }

        if (savetextarray[1] == undefined) {
          savetextarray[1] = "";
        }
        if (savetextarray[2] == undefined) {
          savetextarray[2] = "";
        }

        if (savetextarray) document.querySelector('#storevalueid').value = JSON.stringify({
          savetextarray1: savetextarray[0],
          savetextarray2: savetextarray[1],
          savetextarray3: savetextarray[2],
          liveinfovalue: document.getElementById('liveinfoid').value
        });

        document.querySelector('#paymentpage').hidden = false;
        document.querySelector('#livebookid').hidden = true;
        document.querySelector('#realpayment').hidden = false;
      }
    }
  }, {
    key: 'dayThai',
    value: function dayThai(clicked) {
      console.log("is this in fuck me? 23", clicked);
      var daythai = "";
      if (clicked == 0) {
        daythai = "อาทิตย์";
      } else if (clicked == 1) {
        daythai = "จันทร์";
      } else if (clicked == 2) {
        daythai = "อังคาร";
      } else if (clicked == 3) {
        daythai = "พุธ";
      } else if (clicked == 4) {
        daythai = "พฤหัส";
      } else if (clicked == 5) {
        daythai = "ศุกร์";
      } else {
        daythai = "เสาร์";
      }
      return daythai;
    }
  }, {
    key: 'clickDay',
    value: function clickDay(idid, value, buttonrows) {

      console.log("this is the VALUE", value);

      console.log("this is the idid", this.state.notactive);
      console.log("this is clickday", idid);
      var firstchar1 = idid.charAt(0);
      var firstchar2 = this.state.notactive.charAt(0);

      console.log("whatever");
      console.log(this.state.monthnumber);
      console.log(this.state.active);
      document.getElementById(this.state.monthnumber.toString() + this.state.active.toString()).className = "notactive";

      var montheng = "";
      if (this.state.monthnumber == 5) {
        montheng = "June";
      } else if (this.state.monthnumber == 6) {
        montheng = "July";
      } else if (this.state.monthnumber == 7) {
        montheng = "August";
      } else {
        montheng = "September";
      }

      var currentdate = montheng + " " + value + ", " + "2022";
      console.log("checkPLEASEEEE", currentdate);

      console.log("check the firstchar1", firstchar1);
      console.log("check the firstchar2", firstchar2);

      if (this.state.notactive != "") {
        console.log("does this always print", idid);

        if (firstchar1 == firstchar2) {
          document.getElementById(this.state.notactive).className = "notactive";
        }
        console.log("i think i found where the fucking shit is");
        document.getElementById(idid).className = "active";
      }

      var z = new Date(currentdate);
      var dayy = z.getDay();
      console.log("day experimentation", dayy);
      this.setState({ notactive: idid, dayclicked: dayy, currentdateclicked: value, constantbuttonrows: buttonrows });
    }
  }, {
    key: 'monthConversion',
    value: function monthConversion(month, check) {
      console.log("this is month", month);
      var thaimonth = "";
      if (month == 0) {
        thaimonth = "มกราคม";
      } else if (month == 1) {
        thaimonth = "กุมภาพันธ์";
      } else if (month == 2) {
        thaimonth = "มีนาคม";
      } else if (month == 3) {
        thaimonth = "เมษายน";
      } else if (month == 4) {
        thaimonth = "พฤษภาคม";
      } else if (month == 5) {
        thaimonth = "มิถุนายน";
      } else if (month == 6) {
        thaimonth = "กรกฎาคม";
      } else if (month == 7) {
        thaimonth = "สิงหาคม";
      } else if (month == 8) {
        thaimonth = "กันยายน";
      } else if (month == 9) {
        thaimonth = "ตุลาคม";
      } else if (month == 10) {
        thaimonth = "พฤศจิกายน";
      } else {
        thaimonth = "ธันวาคม";
      }

      return thaimonth;
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(where, onearray) {
      console.log("this is one array in changemonth", onearray);
      this.setState({ onearray: onearray });
      if (this.state.notactive != "") {
        console.log("FAIL");
        console.log("this.state.notactive", this.state.notactive);
        try {

          document.getElementById(this.state.notactive).className = "notactive";
        } catch (err) {
          console.log("whateber");
        }
      }
      // document.getElementById(this.state.monthnumber.toString() + this.state.active.toString()).className = "notactive"

      var tuatan = this.state.monthnumber;
      if (where == "next") {
        this.setState({
          monthnumber: this.state.monthnumber + 1

        });
        tuatan = tuatan + 1;
        this.monthConversion(tuatan);
      } else {
        this.setState({
          monthnumber: this.state.monthnumber - 1

        });
        tuatan = tuatan - 1;
        this.monthConversion(tuatan);
      }
      console.log("walouch", this.state.monthnumber);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      console.log("STRESSING");
      var stateonearray = this.state.onearray;
      var daythai = "";
      console.log("LUFFY GEAR 5", this.state.currentdateclicked);
      var whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf");
      daythai = this.dayThai(this.state.dayclicked);

      console.log("red hair", whatttttt);

      var combination = "วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022";

      var date_rows = [];

      console.log("ACTIVE", this.state.active);
      console.log("current month", this.state.currentmonth);
      console.log("month numberbrbrbrbrbrbrbr", this.state.monthnumber);

      var d = new Date();
      var month = d.getMonth();
      var howmanydays = new Date(2022, this.state.monthnumber + 1, 0).getDate();

      var one = "";
      var onearray = [];

      if (stateonearray == undefined) {
        var usecase = this.state.currentmonth;
        for (var i = 0; i < 14; i++) {
          one = (this.state.active + i) % howmanydays;
          if (one == 0) {
            one = howmanydays;
            onearray.push(usecase.toString() + one.toString());
            usecase = usecase + 1;
          } else {
            onearray.push(usecase.toString() + one.toString());
          }
        }
      } else {
        onearray = stateonearray;
      }

      for (var _i3 = 1; _i3 < howmanydays + 1; _i3++) {
        date_rows.push(React.createElement(BookLiveRow, { rowname: _i3, monthnumber: this.state.monthnumber, firstactive: this.state.active, currentmonth: this.state.currentmonth, onearray: onearray, onClickDay: this.clickDay, onClickedDayThai: this.dayThai, onClickedMonthConversion: this.monthConversion }));
      }
      console.log("NFT IS WEIRD", date_rows);

      return React.createElement(
        'div',
        { 'class': 'divsearch d-flex justify-content-center' },
        React.createElement(
          'div',
          { 'class': 'calendar' },
          React.createElement(
            'div',
            { 'class': 'month d-flex justify-content-between' },
            this.state.currentmonth < this.state.monthnumber ? React.createElement(
              'button',
              { onClick: function onClick() {
                  return _this5.changeMonth("back", onearray);
                }, 'class': 'btn prev' },
              '\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32'
            ) : null,
            React.createElement(
              'div',
              { 'class': 'd-flex flex-column' },
              React.createElement(
                'h5',
                { 'class': 'whatmonth' },
                whatttttt
              )
            ),
            this.state.monthnumber < 11 ? React.createElement(
              'button',
              { onClick: function onClick() {
                  return _this5.changeMonth("next", onearray);
                }, 'class': 'btn next' },
              '\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B'
            ) : null
          ),
          React.createElement(
            'ul',
            { 'class': 'days' },
            date_rows
          ),
          React.createElement(
            'h1',
            null,
            combination
          ),
          this.state.constantbuttonrows,
          React.createElement('div', { id: 'booktimearrayid' }),
          React.createElement(
            'div',
            { 'class': 'mt-3' },
            React.createElement(
              'p',
              null,
              '\u0E2D\u0E22\u0E32\u0E01\u0E04\u0E38\u0E22\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2D\u0E30\u0E44\u0E23'
            ),
            React.createElement('input', { id: 'liveinfoid', 'class': 'inputheho' })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-5' },
            React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.saveReserve, value: '\u0E2B\u0E19\u0E49\u0E32\u0E0A\u0E4D\u0E32\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19', 'class': 'btn' })
          )
        )
      );
    }
  }]);

  return BookLivePage;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#paymentpage').hidden = true;
  document.querySelector('#realpayment').hidden = true;

  var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
  ReactDOM.render(React.createElement(BookLivePage), document.querySelector('#livebookid'));
});