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

var BookPage = function (_React$Component) {
    _inherits(BookPage, _React$Component);

    function BookPage(props) {
        _classCallCheck(this, BookPage);

        var _this = _possibleConstructorReturn(this, (BookPage.__proto__ || Object.getPrototypeOf(BookPage)).call(this, props));

        _this.changeIntroReserve = _this.changeIntroReserve.bind(_this);
        _this.changeOccasionReserve = _this.changeOccasionReserve.bind(_this);
        _this.saveReserve = _this.saveReserve.bind(_this);

        //the number of steps can be state as well i believe
        _this.state = {
            reserve_into_html: React.createElement(
                'div',
                { name: 'introname', id: 'someoneelse_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        null,
                        'Who is this cameo from?'
                    ),
                    React.createElement('input', { required: true, id: 'from_intro', placeholder: 'From' })
                )
            ),
            reserve_occasion_html: React.createElement(
                'div',
                { name: 'occasionname', id: 'birthday_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement('input', { required: true, name: 'occa1', placeholder: 'When is their birthday?' }),
                    React.createElement('br', null),
                    React.createElement('input', { required: true, name: 'occa2', placeholder: 'How old are they turning?' }),
                    React.createElement('br', null),
                    React.createElement('input', { required: true, name: 'occa3', placeholder: 'Instructions for' }),
                    React.createElement('br', null),
                    React.createElement('input', { name: 'occa4', placeholder: 'Optional' })
                )
            )
        };

        return _this;
    }

    _createClass(BookPage, [{
        key: 'saveReserve',
        value: function saveReserve(e) {
            var typeintro = "";
            var tointro = "";
            var fromintro = "";
            var typeoccasion = "";
            var firstinputocca = "";
            var secondinputocca = "";
            var thirdinputocca = "";
            var fourthinputocca = "";
            var datetime = "";

            var checkblank = 0;

            var checkerintro = document.getElementsByName("introname")[0].id;
            tointro = document.querySelector('#to_intro').value;

            typeintro = checkerintro;

            if (intro == "") {
                checkblank = 1;
            }

            if (checkerintro == "someoneelse_html_id") {
                fromintro = document.querySelector('#from_intro').value;
                if (fromintro == "") {
                    checkblank = 1;
                }
            }

            var checkeroccasion = document.getElementsByName("occasionname")[0].id;
            typeoccasion = checkeroccasion;

            firstinputocca = document.getElementsByName("occa1")[0].value;
            if (firstinputocca == "") {
                checkblank = 1;
            }
            secondinputocca = document.getElementsByName("occa2")[0].value;
            if (secondinputocca == "") {
                checkblank = 1;
            }

            if (document.getElementsByName("occa3").length != 0) {
                thirdinputocca = document.getElementsByName("occa3")[0].value;
                if (thirdinputocca == "") {
                    checkblank = 1;
                }
            }

            if (document.getElementsByName("occa4").length != 0) {
                fourthinputocca = document.getElementsByName("occa4")[0].value;
                if (fourthinputocca == "") {
                    checkblank = 1;
                }
            }

            var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
            datetime = document.getElementById('date_inputid').value;
            if (datetime == "") {
                checkblank = 1;
            }

            var today = new Date().toISOString().slice(0, 10);

            var g1 = new Date(today);

            var g2 = new Date(datetime);

            if (g1.getTime() >= g2.getTime()) {
                checkblank = 2;
            }

            if (checkblank == 1) {
                alert("Forgot to fill in at least one form");
            } else if (checkblank == 2) {
                alert("Time must be atleast 1 day ahead");
            } else {
                var getcooked = getCookie('csrftoken');
                fetch('/book/' + influencerusername, {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify({
                        typeintro: typeintro,
                        tointro: tointro,
                        fromintro: fromintro,
                        typeoccasion: typeoccasion,
                        firstinputocca: firstinputocca,
                        secondinputocca: secondinputocca,
                        thirdinputocca: thirdinputocca,
                        fourthinputocca: fourthinputocca,
                        datetime: datetime
                    })
                }).then(function (data) {
                    window.location.href = "/";
                });
            }
        }
    }, {
        key: 'changeIntroReserve',
        value: function changeIntroReserve(e) {

            if (e.target.id == "someoneelsehtml") {
                console.log("is it someoneelsehtml");
                this.setState({
                    reserve_into_html: React.createElement(
                        'div',
                        { name: 'introname', id: 'someoneelse_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                null,
                                'Who is this cameo from?'
                            ),
                            React.createElement('input', { id: 'from_intro', placeholder: 'From' })
                        )
                    )
                });
            } else {
                console.log("is it anotherpeoplehtml");
                this.setState({
                    reserve_into_html: React.createElement('div', { name: 'introname', id: 'myself_html_id' })
                });
            }
        }
    }, {
        key: 'changeOccasionReserve',
        value: function changeOccasionReserve(e) {
            console.log("this is e", e);
            if (e.target.id == "birthdaybutton") {
                console.log("birthday");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'birthday_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', { required: true, name: 'occa1', placeholder: 'When is their birthday?' }),
                            React.createElement('br', null),
                            React.createElement('input', { required: true, name: 'occa2', placeholder: 'How old are they turning?' }),
                            React.createElement('br', null),
                            React.createElement('input', { required: true, name: 'occa3', placeholder: 'Instructions for' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa4', placeholder: 'Optional' }),
                            React.createElement('br', null)
                        )
                    )
                });
            } else if (e.target.id == "peptalkbutton") {
                console.log("peptalk");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'peptalk_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', { required: true, name: 'occa1', placeholder: 'What\'s going on with the recipient?' }),
                            React.createElement('br', null),
                            React.createElement('input', { required: true, name: 'occa2', placeholder: 'How can ... help?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa3', placeholder: 'Optional details' }),
                            React.createElement('br', null)
                        )
                    )
                });
            } else if (e.target.id == "roastbutton") {
                console.log("roast");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'roastbutton_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', { required: true, name: 'occa1', placeholder: 'What would you like Kevin McKidd to roast the recipient about?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa2', placeholder: 'Optional' }),
                            React.createElement('br', null)
                        )
                    )
                });
            } else {
                console.log("other lets go");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'other_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', { required: true, name: 'occa1', placeholder: 'What\'s the occasion?' }),
                            React.createElement('br', null),
                            React.createElement('input', { required: true, name: 'occa2', placeholder: 'Instructions for' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa3', placeholder: 'Optional' })
                        )
                    )
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'intro' },
                    React.createElement(
                        'h1',
                        null,
                        'who is this for'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'someoneelsehtml', onClick: this.changeIntroReserve },
                        'Someone Else'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'myselfhtml', onClick: this.changeIntroReserve },
                        'Myself'
                    )
                ),
                React.createElement('input', { required: true, id: 'to_intro', placeholder: 'To' }),
                this.state.reserve_into_html,
                React.createElement(
                    'div',
                    { id: 'occasion' },
                    React.createElement(
                        'h1',
                        null,
                        'whats the occasion'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'birthdaybutton', onClick: this.changeOccasionReserve },
                        'Birthday'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'peptalkbutton', onClick: this.changeOccasionReserve },
                        'Pep Talk'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'roastbutton', onClick: this.changeOccasionReserve },
                        'Roast'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-primary', id: 'otherbutton', onClick: this.changeOccasionReserve },
                        'Other'
                    )
                ),
                React.createElement(
                    'h1',
                    null,
                    'Make your request memorable'
                ),
                this.state.reserve_occasion_html,
                React.createElement(
                    'label',
                    null,
                    'Need by when'
                ),
                React.createElement('br', null),
                React.createElement('input', { required: true, id: 'date_inputid', name: 'date_inputname', type: 'date' }),
                React.createElement(
                    'h6',
                    null,
                    'NOTE* \u0E16\u0E49\u0E32influencer\u0E17\u0E4D\u0E32\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E49\u0E04\u0E38\u0E13\u0E08\u0E30\u0E44\u0E14\u0E49\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19'
                ),
                React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.saveReserve, value: 'Reserve', 'class': 'btn btn-primary' })
            );
        }
    }]);

    return BookPage;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch('/gotobook/' + influencerusername).then(function (response) {
        return response.json();
    }).then(function (data) {
        ReactDOM.render(React.createElement(BookPage, { data: data }), document.querySelector('#wholereservepage'));
    });
});