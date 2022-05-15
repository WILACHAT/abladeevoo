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

var PaymentPage = function (_React$Component) {
    _inherits(PaymentPage, _React$Component);

    function PaymentPage(props) {
        _classCallCheck(this, PaymentPage);

        var _this = _possibleConstructorReturn(this, (PaymentPage.__proto__ || Object.getPrototypeOf(PaymentPage)).call(this, props));

        _this.backPage = _this.backPage.bind(_this);
        _this.submitCc = _this.submitCc.bind(_this);

        return _this;
    }

    _createClass(PaymentPage, [{
        key: 'submitCc',
        value: function submitCc(e) {
            Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

            console.log("yo wassup submit CC");
            console.log("yo wassup submit CC");

            document.querySelector('#create_token').disabled = true;

            var card = {
                "name": document.querySelector('[data-omise=holder_name]').value,
                "number": document.querySelector('[data-omise=number]').value,
                "expiration_month": document.querySelector('[data-omise=expiration_month]').value,
                "expiration_year": document.querySelector('[data-omise=expiration_year]').value,
                "security_code": document.querySelector('[data-omise=security_code]').value

            };

            console.log("this is card", card);
            Omise.createToken("card", card, function (statusCode, response) {
                console.log("inside the create token");

                if (response.object == "error" || !response.card.security_code_check) {
                    // Display an error message.
                    var message_text = "SET YOUR SECURITY CODE CHECK FAILED MESSAGE";
                    if (response.object == "error") {
                        message_text = response.message;
                    }
                    $("#token_errors").html(message_text);

                    // Re-enable the submit button.
                    document.querySelector('#create_token').disabled = true;
                } else {
                    // Then fill the omise_token.
                    document.querySelector('[name=omise_token]').value = response.id;

                    // Remove card number from form before submiting to server.
                    document.querySelector('[data-omise=number]').value = "";
                    document.querySelector('[data-omise=security_code]').value = "";
                    console.log("this is the response", response);
                    console.log("this is the response token id", response["id"]);

                    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

                    var getcooked = getCookie('csrftoken');

                    fetch('/paymentapi/' + influencerusername, {
                        method: 'POST',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            token: response["id"]
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        //if data returns successful show beautiful success stuff
                        //if not show failed html
                        console.log(data);
                    });
                };
            });
        }
    }, {
        key: 'backPage',
        value: function backPage(e) {
            document.querySelector('#paymentpage').hidden = true;
            document.querySelector('#wholereservepage').hidden = false;
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'button',
                        { 'class': 'btn btn-primary', onClick: this.backPage },
                        'Back'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'h1',
                        null,
                        'yo wassup this is the payment page'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement('div', { id: 'token_errors' }),
                        React.createElement('input', { type: 'hidden', name: 'omise_token' }),
                        React.createElement(
                            'div',
                            null,
                            'Name',
                            React.createElement('br', null),
                            React.createElement('input', { type: 'text', 'data-omise': 'holder_name' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            'Number',
                            React.createElement('br', null),
                            React.createElement('input', { type: 'text', 'data-omise': 'number' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            'Date',
                            React.createElement('br', null),
                            React.createElement('input', { type: 'text', 'data-omise': 'expiration_month', size: '4' }),
                            React.createElement('input', { type: 'text', 'data-omise': 'expiration_year', size: '8' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            'Security Code',
                            React.createElement('br', null),
                            React.createElement('input', { type: 'text', 'data-omise': 'security_code', size: '8' })
                        ),
                        React.createElement('input', { type: 'submit', onClick: this.submitCc, id: 'create_token' })
                    )
                )
            );
        }
    }]);

    return PaymentPage;
}(React.Component);

var BookPage = function (_React$Component2) {
    _inherits(BookPage, _React$Component2);

    function BookPage(props) {
        _classCallCheck(this, BookPage);

        var _this2 = _possibleConstructorReturn(this, (BookPage.__proto__ || Object.getPrototypeOf(BookPage)).call(this, props));

        _this2.changeIntroReserve = _this2.changeIntroReserve.bind(_this2);
        _this2.changeOccasionReserve = _this2.changeOccasionReserve.bind(_this2);
        _this2.saveReserve = _this2.saveReserve.bind(_this2);
        _this2.nextPage = _this2.nextPage.bind(_this2);
        document.querySelector('#paymentpage').hidden = true;

        //the number of steps can be state as well i believe
        _this2.state = {
            reserve_into_html: React.createElement(
                'div',
                { name: 'introname', id: 'someoneelse_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputheho', required: true, id: 'from_intro', placeholder: '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23' })
                    )
                )
            ),
            reserve_occasion_html: React.createElement(
                'div',
                { name: 'occasionname', id: 'birthday_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48?' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E08\u0E30\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E08\u0E30\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48?' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C:'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { id: 'optional/occa4', 'class': 'inputheho', name: 'occa4', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C' })
                    )
                )
            ),
            colorof1: "someoneelsehtml",
            colorof2: "birthday"
        };

        return _this2;
    }

    _createClass(BookPage, [{
        key: 'nextPage',
        value: function nextPage(e) {
            console.log("this is nextpage");
            document.querySelector('#paymentpage').hidden = false;
            document.querySelector('#wholereservepage').hidden = true;
            ReactDOM.render(React.createElement(PaymentPage, null), document.querySelector('#paymentpage'));
        }
    }, {
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

            var inputcheck = document.querySelector('#inputcheckid').checked;

            var checkerintro = document.getElementsByName("introname")[0].id;
            tointro = document.querySelector('#to_intro').value;

            typeintro = checkerintro;

            if (intro == "") {
                checkblank = 10;
            }

            if (checkerintro == "someoneelse_html_id") {
                fromintro = document.querySelector('#from_intro').value;
                if (fromintro == "") {
                    checkblank = 9;
                }
            }

            var checkeroccasion = document.getElementsByName("occasionname")[0].id;
            typeoccasion = checkeroccasion;

            firstinputocca = document.getElementsByName("occa1")[0].value;
            if (firstinputocca == "") {
                checkblank = 8;
            }

            secondinputocca = document.getElementsByName("occa2")[0].value;
            if (document.getElementsByName("occa2")[0].id == "") {
                if (secondinputocca == "") {
                    checkblank = 7;
                }
            }

            if (document.getElementsByName("occa3").length != 0) {
                if (document.getElementsByName("occa3")[0].id == "") {
                    thirdinputocca = document.getElementsByName("occa3")[0].value;
                    if (thirdinputocca == "") {
                        checkblank = 6;
                    }
                }
            }

            if (document.getElementsByName("occa4").length != 0) {
                if (document.getElementsByName("occa4")[0].id == "") {
                    fourthinputocca = document.getElementsByName("occa4")[0].value;
                    console.log("ok what is going on", document.getElementsByName("occa4")[0].id);
                    if (fourthinputocca == "") {
                        checkblank = 5;
                    }
                }
            }

            var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
            datetime = document.getElementById('date_inputid').value;
            if (datetime == "") {
                checkblank = 4;
            }

            var today = new Date().toISOString().slice(0, 10);

            var g1 = new Date(today);

            var g2 = new Date(datetime);

            if (g1.getTime() >= g2.getTime()) {
                checkblank = 2;
            }

            if (checkblank == 1) {
                alert("Forgot to fill in at least one form");
            } else if (checkblank == 10) {
                alert("luem tueng");
            } else if (checkblank == 9) {
                alert("luem jark");
            } else if (checkblank == 8) {
                alert("luem chong raek");
            } else if (checkblank == 7) {
                alert("luem chong sorng");
            } else if (checkblank == 6) {
                alert("luem chong sarm");
            } else if (checkblank == 5) {
                alert("luem chong seeh");
            } else if (checkblank == 4) {
                alert("luem sai date");
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
                        datetime: datetime,
                        inputcheck: inputcheck
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
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, id: 'from_intro', placeholder: '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23' })
                            )
                        )
                    ),
                    colorof1: "someoneelsehtml"
                });
            } else {
                console.log("is it anotherpeoplehtml");
                this.setState({
                    reserve_into_html: React.createElement('div', { name: 'introname', id: 'myself_html_id' }),
                    colorof1: "myselfhtml"
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
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48?' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E08\u0E30\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E08\u0E30\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48?' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C:'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'optional/occa4', ame: 'occa4', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C' })
                            )
                        )
                    ),
                    colorof2: "birthday"

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
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E17\u0E4D\u0E32\u0E44\u0E21\u0E16\u0E36\u0E07\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E17\u0E4D\u0E32\u0E44\u0E21\u0E16\u0E36\u0E07\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08?' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E0A\u0E48\u0E27\u0E22\u0E2D\u0E30\u0E44\u0E23\u0E44\u0E14\u0E49\u0E1A\u0E49\u0E32\u0E07'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E0A\u0E48\u0E27\u0E22\u0E2D\u0E30\u0E44\u0E23\u0E44\u0E14\u0E49\u0E1A\u0E49\u0E32\u0E07?' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C' }),
                                React.createElement('br', null)
                            )
                        )
                    ),
                    colorof2: "peptalk"

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
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E0F\u0E31\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08\u0E43\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E0F\u0E31\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08\u0E43\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2D\u0E30\u0E44\u0E23' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'optional/occa2', 'class': 'inputheho', name: 'occa2', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C' })
                            )
                        )
                    ),
                    colorof2: "roast"
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
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2D\u0E30\u0E44\u0E23?' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C' })
                            )
                        )
                    ),
                    colorof2: "other"
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("this.state.colorof1", this.state.colorof1);

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'intro', 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'bookdetails' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                'Vid \u0E19\u0E35\u0E49\u0E2D\u0E22\u0E32\u0E01\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49\u0E43\u0E04\u0E23: '
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "someoneelsehtml" ? "btn btn-success mr-3" : "btn btn-primary mr-3", id: 'someoneelsehtml', onClick: this.changeIntroReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'someoneelsehtml', onClick: this.changeIntroReserve, 'class': 'wabuttontext' },
                                    '\u0E04\u0E19\u0E2D\u0E37\u0E48\u0E19'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "myselfhtml" ? "btn btn-success" : "btn btn-primary", id: 'myselfhtml', onClick: this.changeIntroReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'myselfhtml', onClick: this.changeIntroReserve, 'class': 'wabuttontext' },
                                    '\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E16\u0E36\u0E07\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, id: 'to_intro', placeholder: '\u0E16\u0E36\u0E07\u0E43\u0E04\u0E23' })
                            )
                        ),
                        this.state.reserve_into_html
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'occasion', 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'bookdetails mt-5' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2D\u0E30\u0E44\u0E23: '
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "birthday" ? "btn btn-success mr-3" : "btn btn-primary mr-3", id: 'birthdaybutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'birthdaybutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "peptalk" ? "btn btn-success mr-3" : "btn btn-primary mr-3", id: 'peptalkbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'peptalkbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "roast" ? "btn btn-success mr-3" : "btn btn-primary mr-3", id: 'roastbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'roastbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E40\u0E1C\u0E32'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "other" ? "btn btn-success" : "btn btn-primary", id: 'otherbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'otherbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E2D\u0E37\u0E48\u0E19\u0E46'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-4' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49 Vid \u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E19\u0E48\u0E32\u0E08\u0E14\u0E08\u0E4D\u0E32!'
                            )
                        ),
                        this.state.reserve_occasion_html
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2' },
                    React.createElement(
                        'label',
                        { 'class': 'wa' },
                        '\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement('input', { 'class': 'datechecker', equired: true, id: 'date_inputid', name: 'date_inputname', type: 'date' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-1' },
                    React.createElement(
                        'h6',
                        null,
                        'NOTE* \u0E16\u0E49\u0E32\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E4D\u0E32\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E49\u0E04\u0E38\u0E13\u0E08\u0E30\u0E44\u0E14\u0E49\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'label',
                        { 'class': 'wa mr-2' },
                        '\u0E0B\u0E48\u0E2D\u0E19\u0E08\u0E32\u0E01\u0E42\u0E1E\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E02\u0E2D\u0E07\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                    ),
                    React.createElement('input', { id: 'inputcheckid', 'class': 'inputcheckbox', type: 'checkbox' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2 mb-5' },
                    React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.nextPage, value: 'Payment', 'class': 'btn btn-primary' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2 mb-5' },
                    React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.saveReserve, value: 'Reserve', 'class': 'btn btn-primary' })
                )
            );
        }
    }]);

    return BookPage;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#paymentpage').hidden = true;
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch('/gotobook/' + influencerusername).then(function (response) {
        return response.json();
    }).then(function (data) {
        ReactDOM.render(React.createElement(BookPage, { data: data }), document.querySelector('#wholereservepage'));
    });
});