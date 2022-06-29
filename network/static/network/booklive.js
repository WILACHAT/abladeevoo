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

var BookLiveRow = function (_React$Component) {
  _inherits(BookLiveRow, _React$Component);

  function BookLiveRow(props) {
    _classCallCheck(this, BookLiveRow);

    var _this = _possibleConstructorReturn(this, (BookLiveRow.__proto__ || Object.getPrototypeOf(BookLiveRow)).call(this, props));

    _this.clickHe = _this.clickHe.bind(_this);

    _this.state = {
      active: "",
      previousid: ""
    };

    return _this;
  }

  _createClass(BookLiveRow, [{
    key: 'clickHe',
    value: function clickHe(value, idid) {
      console.log("tong took laew pa");
      console.log(this.state.active);
      console.log(this.state.previousid);

      console.log("successfull or nah");
      this.setState({
        active: value,
        previousid: idid
      });

      this.props.onClickDay(idid, value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
                return _this2.clickHe(_this2.props.rowname, idid);
              } },
            this.props.rowname
          );

          break;
        }
        what = React.createElement(
          'button',
          { style: mystyle, id: idid, 'class': this.state.active == this.props.rowname ? "active" : "notactive", onClick: function onClick() {
              return _this2.clickHe(_this2.props.rowname, idid);
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

var BookLivePage = function (_React$Component2) {
  _inherits(BookLivePage, _React$Component2);

  function BookLivePage(props) {
    _classCallCheck(this, BookLivePage);

    var _this3 = _possibleConstructorReturn(this, (BookLivePage.__proto__ || Object.getPrototypeOf(BookLivePage)).call(this, props));

    _this3.changeMonth = _this3.changeMonth.bind(_this3);
    _this3.monthConversion = _this3.monthConversion.bind(_this3);
    _this3.clickDay = _this3.clickDay.bind(_this3);
    _this3.pickTime = _this3.pickTime.bind(_this3);
    _this3.dayThai = _this3.dayThai.bind(_this3);
    _this3.saveReserve = _this3.saveReserve.bind(_this3);

    var d = new Date();
    var month = d.getMonth();
    var thaimonth = _this3.monthConversion(month, "constructor");

    var w = new Date();
    var day = w.getDate();
    console.log("this is day", day);

    console.log("this is thaimonth", thaimonth);
    /* request for live -> choose 3 time -> in inbox -> normal -> history ror doo wa what time dai bab dara is choosing time then por dai gor ja plien pen showwela nun mee 3 steps un pokati mee kae 2 then dara choose time to accept OR cancel order
    -> then when wun nud sed gor ma jer gun torn t decidated place wela nun (you cant just randomly call cuz that is dumb) */
    _this3.state = {
      active: day,
      notactive: "",
      currentmonth: month,
      themonth: thaimonth,
      monthnumber: month,
      themonthdetail: "",
      dayclicked: "",
      currentdateclicked: "",
      daysallow: [],
      booktime1: "",
      booktime2: "",
      booktime3: ""

    };
    return _this3;
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
    key: 'pickTime',
    value: function pickTime(e) {
      console.log("background color", e.target.style.backgroundColor);

      var fakeid = e.target.getAttribute('data-fakeid');
      console.log("does this work", fakeid);

      var variable = "[data-fakeid=" + fakeid + "]";

      if (this.state.currentdateclicked == "") {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล'
        });
      } else {

        var experi = document.getElementById('time1');
        var daythai = this.dayThai(this.state.dayclicked);
        var whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf");
        daythai = this.dayThai(this.state.dayclicked);
        var idnumber = "";
        var randomtext = "";
        var randomtextagain = "";
        var checker = 0;

        //append into an array or smthing
        //if theres one in the array use booking two if theres two use booking 3
        if (document.getElementById('booktimearrayid').children.length > 2) {
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

            var removebutton = document.getElementById("วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + e.target.innerHTML);
            removebutton.remove();
          };

          div.id = "วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + e.target.innerHTML;

          for (var i = 0; i < targetdiv.children.length; i++) {
            randomtextagain = "วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022" + "เวลา" + " " + e.target.innerHTML;
            randomtext = targetdiv.children[i].innerHTML;
            randomtext = randomtext.replace('<button>X</button>', '');

            if (randomtext == randomtextagain) {
              checker = 1;
              console.log("ASHITA WA KIREI DA YO");
            }
          }
          if (checker == 0) {
            console.log("check for targetdiv", targetdiv);
            console.log("wakawaka1", document.getElementById('booktimearrayid'));
            console.log("i dont know the", targetdiv);
            targetdiv.append(div);

            div.append("วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022" + "เวลา" + " " + e.target.innerHTML);
            div.append(button);
          } else {
            Swal.fire({
              icon: 'error',
              text: 'กรุณาเลือกวันที่ที่ไม่ซํ้า'
            });
          }

          // targetdiv.insertAdjacentHTML('afterend', this.state.booktime1);  

        }
      }
    }
  }, {
    key: 'clickDay',
    value: function clickDay(idid, value) {
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
      this.setState({ notactive: idid, dayclicked: dayy, currentdateclicked: value });
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
        console.log("walouch is the best", this.state.booktime1);
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
      var _this4 = this;

      /*
       for (let i = 0; i < document.getElementById('coversallbooktimeid').children.length; i++)
      {
        console.log("walouch", document.getElementById('coversallbooktimeid').children[0].id)
              document.getElementById('coversallbooktimeid').children[0].style.backgroundColor = ""
       }
      */

      console.log("STRESSING");
      var stateonearray = this.state.onearray;
      var daythai = "";
      console.log("LUFFY GEAR 5", this.state.currentdateclicked);
      var whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf");
      daythai = this.dayThai(this.state.dayclicked);

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
          one = (this.state.active + 1 + i) % howmanydays;
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

      for (var _i = 1; _i < howmanydays + 1; _i++) {
        date_rows.push(React.createElement(BookLiveRow, { rowname: _i, monthnumber: this.state.monthnumber, firstactive: this.state.active, currentmonth: this.state.currentmonth, onearray: onearray, onClickDay: this.clickDay }));
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
                  return _this4.changeMonth("back", onearray);
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
                  return _this4.changeMonth("next", onearray);
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
          React.createElement(
            'div',
            { id: 'coversallbooktimeid' },
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time1", id: this.state.monthnumber + "time1", onClick: this.pickTime },
              '12-12:30'
            ),
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time2", id: this.state.monthnumber + "time2", onClick: this.pickTime },
              '12:30-13'
            ),
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time3", id: this.state.monthnumber + "time3", onClick: this.pickTime },
              '13-13:30'
            ),
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time4", id: this.state.monthnumber + "time4", onClick: this.pickTime },
              '13:30-14'
            ),
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time5", id: this.state.monthnumber + "time5", onClick: this.pickTime },
              '14-14:30'
            ),
            React.createElement(
              'button',
              { 'data-fakeid': this.state.monthnumber + "time6", id: this.state.monthnumber + "time6", onClick: this.pickTime },
              '14:30-15'
            )
          ),
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