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

var EachTimeSettingOptions = function (_React$Component) {
    _inherits(EachTimeSettingOptions, _React$Component);

    function EachTimeSettingOptions(props) {
        _classCallCheck(this, EachTimeSettingOptions);

        var _this = _possibleConstructorReturn(this, (EachTimeSettingOptions.__proto__ || Object.getPrototypeOf(EachTimeSettingOptions)).call(this, props));

        _this.choosetime = _this.choosetime.bind(_this);

        return _this;
    }

    _createClass(EachTimeSettingOptions, [{
        key: 'choosetime',
        value: function choosetime(e) {
            console.log("wilachat");
            if (e.target.className == "timebuttonsuccess") {
                e.target.className = "timebutton";
            } else {
                e.target.className = "timebuttonsuccess";
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var buttons = "";
            for (var i = 0; i < this.props.time.length; i++) {
                if (this.props.time == this.props.timearray[i]) {
                    buttons = React.createElement(
                        'button',
                        { id: "choosetimebutton" + this.props.idnumber, 'class': 'timebuttonsuccess', onClick: this.choosetime },
                        this.props.time
                    );

                    console.log("SUCCESSFUL");
                    break;
                } else {
                    buttons = React.createElement(
                        'button',
                        { id: "choosetimebutton" + this.props.idnumber, 'class': 'timebutton', onClick: this.choosetime },
                        this.props.time
                    );
                }
            }

            return React.createElement(
                'div',
                null,
                buttons
            );
        }
    }]);

    return EachTimeSettingOptions;
}(React.Component);

var SettingOptions = function (_React$Component2) {
    _inherits(SettingOptions, _React$Component2);

    function SettingOptions(props) {
        _classCallCheck(this, SettingOptions);

        var _this2 = _possibleConstructorReturn(this, (SettingOptions.__proto__ || Object.getPrototypeOf(SettingOptions)).call(this, props));

        _this2.savethetime = _this2.savethetime.bind(_this2);
        _this2.pauseLive = _this2.pauseLive.bind(_this2);
        _this2.pauseCustom = _this2.pauseCustom.bind(_this2);

        _this2.state = {
            timearray: _this2.props.data,
            customvdo: _this2.props.customvdo,
            livevdo: _this2.props.livevdo
        };

        return _this2;
    }

    _createClass(SettingOptions, [{
        key: 'pauseCustom',
        value: function pauseCustom() {
            var _this3 = this;

            Swal.fire({
                title: '<strong>HTML <u>example</u></strong>',
                icon: 'info',
                html: 'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Pause Account',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText: '<i class="fa fa-thumbs-up"></i> No',
                cancelButtonAriaLabel: 'Thumbs down'
            }).then(function (result) {
                console.log(result);
                var getcooked = getCookie('csrftoken');
                var type = "";
                if (result["isConfirmed"] == true) {

                    if (_this3.state.customvdo == true) {
                        type = "pausecustom";
                    } else {
                        type = "unpausecustom";
                    }
                    fetch('/setting', {
                        method: 'POST',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            arraytime: "",
                            type: type
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        console.log(data);
                        console.log("ngongs", data["customvdo"]);
                        _this3.setState({ customvdo: data["customvdo"] });
                    });
                }
            });
        }
    }, {
        key: 'pauseLive',
        value: function pauseLive() {
            var _this4 = this;

            Swal.fire({
                title: '<strong>HTML <u>example</u></strong>',
                icon: 'info',
                html: 'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Pause Account',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText: '<i class="fa fa-thumbs-up"></i> No',
                cancelButtonAriaLabel: 'Thumbs down'
            }).then(function (result) {
                console.log(result);
                var getcooked = getCookie('csrftoken');
                var type = "";
                if (result["isConfirmed"] == true) {
                    if (_this4.state.livevdo == true) {
                        type = "pauselive";
                    } else {
                        type = "unpauselive";
                    }

                    fetch('/setting', {
                        method: 'POST',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            arraytime: "",
                            type: type
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        console.log(data);
                        _this4.setState({ livevdo: data["livevdo"] });
                    });
                }
            });
        }
    }, {
        key: 'savethetime',
        value: function savethetime(e) {
            var _this5 = this;

            var arraytime = [];
            for (var i = 0; i < document.getElementById("rachar").children.length; i++) {
                if (document.getElementById("rachar").children[i].children[0].className == "timebuttonsuccess") {
                    arraytime.push(document.getElementById("rachar").children[i].children[0].innerHTML);
                }
            }

            Swal.fire({
                title: '<strong>HTML <u>example</u></strong>',
                icon: 'info',
                html: 'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Pause Account',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText: '<i class="fa fa-thumbs-up"></i> No',
                cancelButtonAriaLabel: 'Thumbs down'
            }).then(function (result) {
                var arraytime = "";
                console.log(result);
                var getcooked = getCookie('csrftoken');

                if (result["isConfirmed"] == true) {

                    fetch('/setting', {
                        method: 'POST',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            arraytime: arraytime,
                            type: "settime"
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        console.log("this is datanewtime", data["time"]);
                        _this5.setState({ timearray: data["time"] });
                        //if data returns successful show beautiful success stuff
                        //if not show failed html
                        //location.reload();
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var rows = [];
            var time = ['7:00-7:30', '7:30-8:00', '8:00-8:30', '8:30-9:00', '9:00-9:30', '9:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00', '20:00-20:30', '20:30-21:00', '21:00-21:30', '21:30-22:00'];
            for (var i = 0; i < time.length; i++) {
                rows.push(React.createElement(EachTimeSettingOptions, { time: time[i], idnumber: i, timearray: this.state.timearray }));
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'accountsettingsecondcolumn' },
                        React.createElement(
                            'h1',
                            { 'class': 'settingheading' },
                            '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E04\u0E31\u0E2A\u0E15\u0E2D\u0E21'
                        ),
                        React.createElement(
                            'button',
                            { id: 'customstatusid', 'class': 'pauseaccountbtn mt-2', onClick: this.pauseCustom },
                            this.state.customvdo == true ? "หยุดการสั่งวีดีโอคัสตอม" : "เริ่มการสั่งวีดีโอคัสตอม"
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'accountsettingsecondcolumn' },
                        React.createElement(
                            'h1',
                            { 'class': 'settingheading' },
                            '\u0E44\u0E25\u0E1F\u0E4C\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D'
                        ),
                        React.createElement(
                            'button',
                            { 'class': 'pauseaccountbtn mt-2', onClick: this.pauseLive },
                            this.state.livevdo == true ? "หยุดการไลฟ์วีดีโอ" : "เริ่มการไลฟ์วีดีโอ"
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'h3',
                            { 'class': 'settingheading2 mt-3' },
                            '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E2A\u0E14\u0E27\u0E01\u0E44\u0E25\u0E1F\u0E4C'
                        ),
                        this.state.livevdo == true ? React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { id: 'rachar' },
                                rows
                            ),
                            React.createElement(
                                'button',
                                { onClick: this.savethetime, 'class': 'savethetime mt-3' },
                                '\u0E15\u0E31\u0E49\u0E07\u0E40\u0E27\u0E25\u0E32\u0E44\u0E25\u0E1F\u0E4C'
                            )
                        ) : null
                    )
                )
            );
        }
    }]);

    return SettingOptions;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    var getcooked = getCookie('csrftoken');

    fetch('/setting', {
        method: 'POST',
        headers: { 'X-CSRFToken': getcooked },
        body: JSON.stringify({
            type: "beginning"

        })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("everything", data);
        console.log("mono", data["time"]);
        console.log("mono", data["customvdo"]);

        ReactDOM.render(React.createElement(SettingOptions, { data: data["time"], customvdo: data["customvdo"], livevdo: data["livevdo"] }), document.querySelector('#settingsreactid'));
    });
});