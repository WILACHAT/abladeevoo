var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.addEventListener('DOMContentLoaded', function () {

    //might be dealing with money stuff here
    var idk = document.querySelector('#wholereservepage');

    document.querySelector('#compose-form').onsubmit = save_post;
});
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
function save_post() {
    var typeintro = "";
    var tointro = "";
    var fromintro = "";
    var typeoccasion = "";
    var firstinputocca = "";
    var secondinputocca = "";
    var thirdinputocca = "";
    var fourthinputocca = "";

    var getcooked = getCookie('csrftoken');
    var checkerintro = document.getElementsByName("introname")[0].id;
    tointro = document.querySelector('#to_intro').value;
    typeintro = checkerintro;

    if (checkerintro == "someoneelse_html_id") {
        fromintro = document.querySelector('#from_intro').value;
    }

    var checkeroccasion = document.getElementsByName("occasionname")[0].id;
    typeoccasion = checkeroccasion;

    firstinputocca = document.getElementsByName("occa1")[0].value;
    secondinputocca = document.getElementsByName("occa2")[0].value;

    if (document.getElementsByName("occa3").length != 0) {
        thirdinputocca = document.getElementsByName("occa3")[0].value;
    }

    if (document.getElementsByName("occa4").length != 0) {
        fourthinputocca = document.getElementsByName("occa4")[0].value;
    }

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

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
            fourthinputocca: fourthinputocca

        })
    }).then(function (result) {
        window.location.href = "/";
    });

    return false;
}

var BookPage = function (_React$Component) {
    _inherits(BookPage, _React$Component);

    function BookPage(props) {
        _classCallCheck(this, BookPage);

        var _this = _possibleConstructorReturn(this, (BookPage.__proto__ || Object.getPrototypeOf(BookPage)).call(this, props));

        _this.changeIntroReserve = _this.changeIntroReserve.bind(_this);
        _this.changeOccasionReserve = _this.changeOccasionReserve.bind(_this);

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
                    React.createElement('input', { id: 'from_intro', placeholder: 'From' })
                )
            ),
            reserve_occasion_html: React.createElement(
                'div',
                { name: 'occasionname', id: 'birthday_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement('input', { name: 'occa1', placeholder: 'When is their birthday?' }),
                    React.createElement('br', null),
                    React.createElement('input', { name: 'occa2', placeholder: 'How old are they turning?' }),
                    React.createElement('br', null),
                    React.createElement('input', { name: 'occa3', placeholder: 'Instructions for' }),
                    React.createElement('br', null),
                    React.createElement('input', { name: 'occa4', placeholder: 'Optional' })
                )
            )
        };

        return _this;
    }

    _createClass(BookPage, [{
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
                            React.createElement('input', { name: 'occa1', placeholder: 'When is their birthday?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa2', placeholder: 'How old are they turning?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa3', placeholder: 'Instructions for' }),
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
                            React.createElement('input', { name: 'occa1', placeholder: 'What\'s going on with the recipient?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa2', placeholder: 'How can ... help?' }),
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
                            React.createElement('input', { name: 'occa1', placeholder: 'What would you like Kevin McKidd to roast the recipient about?' }),
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
                            React.createElement('input', { name: 'occa1', placeholder: 'What\'s the occasion?' }),
                            React.createElement('br', null),
                            React.createElement('input', { name: 'occa2', placeholder: 'Instructions for' }),
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
                React.createElement('input', { id: 'to_intro', placeholder: 'To' }),
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
                this.state.reserve_occasion_html
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