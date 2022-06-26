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
        _this.changePage = _this.changePage.bind(_this);
        _this.submitIb = _this.submitIb.bind(_this);
        _this.submitPp = _this.submitPp.bind(_this);
        _this.submitTm = _this.submitTm.bind(_this);

        _this.saveInfo = _this.saveInfo.bind(_this);
        _this.backButton = _this.backButton.bind(_this);

        _this.state = {
            statusib: "ksbtnid",
            divofpaymentpage: React.createElement(
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
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-start' },
                            React.createElement(
                                'label',
                                { 'class': 'labelpayment' },
                                'Name'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', { 'class': 'paymentinput', type: 'text', 'data-omise': 'holder_name' })
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        'Number',
                        React.createElement('br', null),
                        React.createElement('input', { 'class': 'paymentinput', type: 'text', 'data-omise': 'number' })
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
                        React.createElement('input', { 'class': 'paymentinput', type: 'text', 'data-omise': 'security_code', size: '8' })
                    ),
                    React.createElement('input', { id: 'tokenhiddenid', type: 'hidden', 'data-tokenid': '' }),
                    React.createElement('input', { type: 'submit', onClick: _this.submitCc, id: 'create_token' })
                )
            )
        };
        return _this;
    }

    _createClass(PaymentPage, [{
        key: 'backButton',
        value: function backButton(e) {
            document.querySelector('#paymentpage').hidden = true;
            document.querySelector('#wholereservepage').hidden = false;
        }
    }, {
        key: 'submitTm',
        value: function submitTm(e) {
            Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");
            this.saveInfo();
            console.log("lenght", document.querySelector('#phonenumberid').value.length);
            console.log("[0]", document.querySelector('#phonenumberid').value[0]);

            if (document.querySelector('#phonenumberid').value[0] == "0" && document.querySelector('#phonenumberid').value.length == 10) {
                console.log("correct");
                /*
                    Omise.createSource('truemoney', {
                        "amount":parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
                        "currency": "THB",
                        "phone_number": document.querySelector('#phonenumberid').value
                    }, function(statusCode, response) {
                    console.log("ftw", response['id'])
                    console.log("this is the amount i have to fucking pay", document.querySelector('#getinfluencerprice').dataset.price)
                
                    const getcooked = getCookie('csrftoken')
                    let influencerusername = document.getElementById('getinfluencerusername').dataset.username;
                
                    
                    fetch(`/paymentapi/${influencerusername}`, {
                    method: 'POST',
                    headers:{'X-CSRFToken': getcooked},
                    body: JSON.stringify({
                        token: response["id"],
                        type: "truemoneypayment"
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        //if data returns successful show beautiful success stuff
                        window.location.href = data['url']
                        
                        })
                    });
                  */
            } else {
                alert("Invalid Phone Number");
            }
        }
    }, {
        key: 'submitPp',
        value: function submitPp(e) {
            console.log("yay promptpay");
            this.saveInfo();

            Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

            Omise.createSource('promptpay', {
                "amount": parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
                "currency": "THB"
            }, function (statusCode, response) {
                console.log("ftw", response['id']);
                var getcooked = getCookie('csrftoken');
                var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

                fetch('/paymentapi/' + influencerusername, {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify({
                        token: response["id"],
                        type: "promptpaypayment"
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    //if data returns successful show beautiful success stuff
                    window.location.href = data['url'];
                });
            });
        }
    }, {
        key: 'submitIb',
        value: function submitIb(id) {

            this.saveInfo();
            Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

            console.log("what what");
            Omise.createSource(document.querySelector('#selectbankid').value, {
                "amount": parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
                "currency": "THB"
            }, function (statusCode, response) {
                console.log("this is the fucking respones", response["id"]);
                var getcooked = getCookie('csrftoken');
                var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

                fetch('/paymentapi/' + influencerusername, {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify({
                        token: response["id"],
                        type: "internetbankingpayment"
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log("bacl here or nah?");
                    //if data returns successful show beautiful success stuff
                    //if not show failed html
                    window.location.href = data['url'];

                    console.log(data);
                });
            });
        }
    }, {
        key: 'changePage',
        value: function changePage(id) {

            if (id == "creditcardbtnid") {
                this.setState({
                    divofpaymentpage: React.createElement(
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
                            React.createElement('input', { id: 'tokenhiddenid', type: 'hidden', 'data-tokenid': '' }),
                            React.createElement(
                                'div',
                                { 'class': 'field-container' },
                                React.createElement(
                                    'label',
                                    { 'for': 'name' },
                                    'Name'
                                ),
                                React.createElement('input', { id: 'name', maxlength: '20', type: 'text' })
                            ),
                            React.createElement('input', { type: 'submit', onClick: this.submitCc, id: 'create_token' })
                        )
                    )
                });
            } else if (id == "truemoneybtnid") {
                this.setState({
                    divofpaymentpage: React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'True Money'
                        ),
                        React.createElement('input', { id: 'phonenumberid' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { onClick: this.submitTm, 'class': 'btn btn-primary' },
                                'True Money'
                            )
                        )
                    )

                });
            } else if (id == "internetbankingbtnid") {
                console.log("state", this.state.statusib);
                this.setState({
                    divofpaymentpage: React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'internetbanking'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'select',
                                { name: 'selectbank', id: 'selectbankid' },
                                React.createElement('option', { value: 'nothing' }),
                                React.createElement(
                                    'option',
                                    { value: 'internet_banking_bbl' },
                                    'Bangkok Bank'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'internet_banking_bay' },
                                    'Krungsri Bank'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'internet_banking_ktb' },
                                    'Krungthai Bank'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'internet_banking_scb' },
                                    'Siam Commercial Bank'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { onClick: this.submitIb, 'class': 'btn btn-primary' },
                                'Submit'
                            )
                        )
                    )

                });
            } else if (id == "promptpaybtnid") {
                this.setState({
                    divofpaymentpage: React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'PromptPay'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { onClick: this.submitPp, 'class': 'btn btn-primary' },
                                'Promptpay'
                            )
                        )
                    )

                });
            }
        }
    }, {
        key: 'submitCc',
        value: function submitCc(e) {
            this.saveInfo();

            Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

            console.log("what the fuck");

            var card = {
                "name": document.querySelector('[data-omise=holder_name]').value,
                "number": document.querySelector('[data-omise=number]').value,
                "expiration_month": document.querySelector('[data-omise=expiration_month]').value,
                "expiration_year": document.querySelector('[data-omise=expiration_year]').value,
                "security_code": document.querySelector('[data-omise=security_code]').value

            };
            var status = "";

            console.log("this is card", card);
            var tokenn = Omise.createToken("card", card, function (statusCode, response) {
                console.log("inside the create token");
                console.log("inside the create lol");

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

                    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

                    var getcooked = getCookie('csrftoken');

                    fetch('/paymentapi/' + influencerusername, {
                        method: 'POST',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            token: response["id"],
                            type: "creditcardpayment"
                        })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        //if data returns successful show beautiful success stuff
                        //if not show failed html
                        console.log(data["status"]);
                        window.location.href = "http://127.0.0.1:8000/paymentresponse";
                    });
                }
            });
        }
    }, {
        key: 'backPage',
        value: function backPage(e) {
            document.querySelector('#paymentpage').hidden = true;
            document.querySelector('#wholereservepage').hidden = false;
        }
    }, {
        key: 'saveInfo',
        value: function saveInfo(data) {

            var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

            var getcooked = getCookie('csrftoken');
            fetch('/book/' + influencerusername, {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    typeintro: this.props.data["typeintro"],
                    tointro: this.props.data["tointro"],
                    fromintro: this.props.data["fromintro"],
                    typeoccasion: this.props.data["typeoccasion"],
                    firstinputocca: this.props.data["firstinputocca"],
                    secondinputocca: this.props.data["secondinputocca"],
                    thirdinputocca: this.props.data["thirdinputocca"],
                    fourthinputocca: this.props.data["fourthinputocca"],
                    datetime: this.props.data["datetime"],
                    inputcheck: this.props.data["inputcheck"]
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                        'button',
                        { onClick: function onClick() {
                                return _this2.changePage("creditcardbtnid");
                            }, id: 'creditcardbtnid', 'class': 'btn btn-primary' },
                        'Credit Card'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this2.changePage("truemoneybtnid");
                            }, id: 'truemoneybtnid', 'class': 'btn btn-primary' },
                        'True Money'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this2.changePage("internetbankingbtnid");
                            }, id: 'internetbankingbtnid', 'class': 'btn btn-primary' },
                        'Internet Banking'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this2.changePage("promptpaybtnid");
                            }, id: 'promptpaybtnid', 'class': 'btn btn-primary' },
                        'PromptPay'
                    )
                ),
                this.state.divofpaymentpage,
                React.createElement('h1', null)
            );
        }
    }]);

    return PaymentPage;
}(React.Component);

var BookPage = function (_React$Component2) {
    _inherits(BookPage, _React$Component2);

    function BookPage(props) {
        _classCallCheck(this, BookPage);

        var _this3 = _possibleConstructorReturn(this, (BookPage.__proto__ || Object.getPrototypeOf(BookPage)).call(this, props));

        _this3.changeIntroReserve = _this3.changeIntroReserve.bind(_this3);
        _this3.changeOccasionReserve = _this3.changeOccasionReserve.bind(_this3);
        _this3.saveReserve = _this3.saveReserve.bind(_this3);
        document.querySelector('#paymentpage').hidden = true;

        //the number of steps can be state as well i believe
        _this3.state = {
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
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 20 \u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21, 20/7' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E2D\u0E32\u0E22\u0E38 20 \u0E1B\u0E35\u0E19\u0E35\u0E49' })
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
                        React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E25\u0E07\u0E2A\u0E38\u0E02\u0E2A\u0E31\u0E19\u0E15\u0E4C\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E04\u0E33\u0E2D\u0E27\u0E22\u0E1E\u0E23' })
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
                        React.createElement('input', { id: 'optional/occa4', 'class': 'inputheho', name: 'occa4', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
                    )
                )
            ),
            colorof1: "someoneelsehtml",
            colorof2: "birthday"
        };

        return _this3;
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
                } else {
                    thirdinputocca = document.getElementsByName("occa3")[0].value;
                }
            }

            if (document.getElementsByName("occa4").length != 0) {
                console.log("fuck this in 4");
                if (document.getElementsByName("occa4")[0].id == "") {
                    fourthinputocca = document.getElementsByName("occa4")[0].value;
                    console.log("fourstinputocca", fourthinputocca);
                    console.log("ok what is going on", document.getElementsByName("occa4")[0].id);
                    if (fourthinputocca == "") {
                        checkblank = 5;
                    }
                } else {
                    fourthinputocca = document.getElementsByName("occa4")[0].value;
                }
            }

            var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
            datetime = document.getElementById('date_inputid').value;
            if (datetime == "") {
                checkblank = 4;
            }

            var today = new Date().toISOString().slice(0, 10);
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            console.log("this is today", today);
            tomorrow.toISOString().slice(0, 10);
            console.log("first tomorrow", tomorrow);

            var g1 = new Date(tomorrow);
            console.log("get time", g1.getTime());

            var g2 = new Date(datetime);

            if (g1.getTime() >= g2.getTime()) {
                checkblank = 2;
            }

            if (checkblank == 1) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกอย่างน้อย 1 ฟอร์ม'
                });
            } else if (checkblank == 10) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกฟอร์ม ถึงใคร'
                });
            } else if (checkblank == 9) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกฟอร์ม จากใคร'
                });
            } else if (checkblank == 8) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องแรก'
                });
            } else if (checkblank == 7) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสอง'
                });
            } else if (checkblank == 6) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสาม'
                });
            } else if (checkblank == 5) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสี่'
                });
            } else if (checkblank == 4) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกวันที่'
                });
            } else if (checkblank == 2) {
                Swal.fire({
                    icon: 'error',
                    text: 'วันที่ต้องมากกว่าวันที่กรอกฟอร์มอย่างน้อย 2 วัน'
                });
            } else {
                document.querySelector('#paymentpage').hidden = false;
                document.querySelector('#wholereservepage').hidden = true;
                document.querySelector('#realpayment').hidden = false;

                document.querySelector('#storevalueid').value = JSON.stringify({
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
                });
                // ReactDOM.render(<PaymentPage data={data}/>, document.querySelector('#paymentpage'));
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
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 20 \u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21, 20/7' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E2D\u0E32\u0E22\u0E38 20 \u0E1B\u0E35\u0E19\u0E35\u0E49' })
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
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E25\u0E07\u0E2A\u0E38\u0E02\u0E2A\u0E31\u0E19\u0E15\u0E4C\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E04\u0E33\u0E2D\u0E27\u0E22\u0E1E\u0E23' })
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
                                React.createElement('input', { 'class': 'inputheho', id: 'optional/occa4', name: 'occa4', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
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
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E43\u0E2B\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E08 \u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E17\u0E33\u0E07\u0E32\u0E19' }),
                                React.createElement('br', null)
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
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E1E\u0E39\u0E14\u0E43\u0E2B\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E08 \u0E43\u0E2B\u0E49\u0E21\u0E35\u0E44\u0E1F\u0E17\u0E33\u0E07\u0E32\u0E19' }),
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
                                React.createElement('input', { id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' }),
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
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E25\u0E49\u0E2D\u0E40\u0E25\u0E35\u0E22\u0E19\u0E27\u0E48\u0E32\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23\u0E1A\u0E49\u0E32\u0E07'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E25\u0E49\u0E2D\u0E40\u0E25\u0E35\u0E22\u0E19 \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E15\u0E34\u0E27\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D' })
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
                                React.createElement('input', { id: 'optional/occa2', 'class': 'inputheho', name: 'occa2', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
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
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E40\u0E23\u0E35\u0E22\u0E19\u0E08\u0E1A\u0E1B\u0E23\u0E34\u0E0D\u0E0D\u0E32\u0E15\u0E23\u0E35' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E2D\u0E27\u0E22\u0E1E\u0E23 \u0E41\u0E25\u0E30\u0E1E\u0E39\u0E14\u0E41\u0E2A\u0E14\u0E07\u0E04\u0E27\u0E32\u0E21\u0E22\u0E34\u0E19\u0E14\u0E35' })
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
                                React.createElement('input', { id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
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
            var waan = { name: "val", name2: "val" };
            waan = JSON.stringify(waan);
            console.log(waan);

            //document.getElementById('dicttest').value = "waan"
            //console.log("checkery checkcheck", document.getElementById('dicttest').value)
            //console.log(Object.values(document.getElementById('dicttest').value))
            //console.log(Object.keys(document.getElementById('dicttest').value))


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
                                '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E32\u0E01\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49\u0E43\u0E04\u0E23: '
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-4 mb-5' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "someoneelsehtml" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'someoneelsehtml', onClick: this.changeIntroReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'someoneelsehtml', onClick: this.changeIntroReserve, 'class': 'wabuttontext' },
                                    '\u0E04\u0E19\u0E2D\u0E37\u0E48\u0E19'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "myselfhtml" ? "btn successbutton" : "btn failbutton", id: 'myselfhtml', onClick: this.changeIntroReserve },
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
                            { 'class': 'd-flex justify-content-center mt-4 mb-5' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "birthday" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'birthdaybutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'birthdaybutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "peptalk" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'peptalkbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'peptalkbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "roast" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'roastbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'roastbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E40\u0E1C\u0E32'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "other" ? "btn successbutton" : "btn failbutton", id: 'otherbutton', onClick: this.changeOccasionReserve },
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
                                '\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E19\u0E48\u0E32\u0E08\u0E14\u0E08\u0E4D\u0E32!'
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
                        '*\u0E16\u0E49\u0E32\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E4D\u0E32\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E49\u0E04\u0E38\u0E13\u0E08\u0E30\u0E44\u0E14\u0E49\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19*'
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
                    React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.saveReserve, value: '\u0E2B\u0E19\u0E49\u0E32\u0E0A\u0E4D\u0E32\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19', 'class': 'btn' })
                )
            );
        }
    }]);

    return BookPage;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#paymentpage').hidden = true;
    document.querySelector('#realpayment').hidden = true;

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch('/gotobook/' + influencerusername).then(function (response) {
        return response.json();
    }).then(function (data) {

        ReactDOM.render(React.createElement(BookPage, { data: data }), document.querySelector('#wholereservepage'));
    });
});