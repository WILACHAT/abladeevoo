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

var PaymentSetup = function (_React$Component) {
    _inherits(PaymentSetup, _React$Component);

    function PaymentSetup(props) {
        _classCallCheck(this, PaymentSetup);

        var _this = _possibleConstructorReturn(this, (PaymentSetup.__proto__ || Object.getPrototypeOf(PaymentSetup)).call(this, props));

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.changePayment = _this.changePayment.bind(_this);
        _this.changePrice = _this.changePrice.bind(_this);

        _this.cancelChange = _this.cancelChange.bind(_this);
        _this.cancelPriceChange = _this.cancelPriceChange.bind(_this);

        _this.setPrice = _this.setPrice.bind(_this);
        console.log("printplease", _this.props.data);

        if (document.querySelector('#checkexistid').value != "exist") {
            _this.state = {
                innerpricediv: React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'label',
                            null,
                            '\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D (THB)'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { type: 'number', 'class': 'inputhehore', id: 'setpriceid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 500' })
                    )
                ),

                innerpaymentdiv: React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'label',
                            null,
                            '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'select',
                            { 'class': 'inputhehore', name: 'selectbank', id: 'selectbankid' },
                            React.createElement('option', { value: 'nothing' }),
                            React.createElement(
                                'option',
                                { value: 'bbl' },
                                'Bangkok Bank'
                            ),
                            React.createElement(
                                'option',
                                { value: 'bay' },
                                'Krungsri Bank'
                            ),
                            React.createElement(
                                'option',
                                { value: 'kbank' },
                                'Kasikorn Bank'
                            ),
                            React.createElement(
                                'option',
                                { value: 'ktb' },
                                'Krungthai Bank'
                            ),
                            React.createElement(
                                'option',
                                { value: 'scb' },
                                'Siam Commercial Bank'
                            ),
                            React.createElement(
                                'option',
                                { value: 'ttb' },
                                'Thanachart Bank'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            null,
                            '\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 (\u0E44\u0E17\u0E22 \u0E2B\u0E23\u0E37\u0E2D \u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29)'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputhehore', id: 'fullnamebankid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: \u0E27\u0E34\u0E23\u0E0A\u0E31\u0E0A \u0E27\u0E35\u0E2A\u0E01\u0E38\u0E25' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            null,
                            '\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputhehore', id: 'accountnumberid', type: 'number', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 0384683978' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            null,
                            '\u0E2D\u0E35\u0E40\u0E21\u0E27'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { 'class': 'inputhehore', id: 'emailid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: araisukyarng@gmail.com' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-3' },
                        React.createElement(
                            'p',
                            null,
                            '*\u0E43\u0E19\u0E02\u0E13\u0E30\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E44\u0E14\u0E49\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E2D\u0E31\u0E19  \u0E41\u0E15\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E17\u0E48\u0E32\u0E19\u0E44\u0E14\u0E49*'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'label',
                            { 'class': 'wa d-flex justify-content-center mt-2' },
                            '*\u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07*'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'button',
                            { 'class': 'btn registerbtn', onClick: function onClick() {
                                    return _this.onSubmit("new");
                                } },
                            '\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19'
                        )
                    )
                )
            };
        } else {
            _this.state = {
                price: _this.props.data["price"],
                innerpricediv: React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'coversprice' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D (THB)'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                { 'class': 'registertitleprice' },
                                _this.props.data["price"],
                                ' \u0E3F'
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { 'class': 'btn registerbtn', onClick: _this.changePrice },
                                '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E32\u0E04\u0E32'
                            )
                        )
                    )
                ),

                brand: _this.props.data["brand"],
                name: _this.props.data["name"],
                number: _this.props.data["number"],
                email: _this.props.data["email"],

                innerpaymentdiv: React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-5' },
                    React.createElement(
                        'div',
                        { 'class': 'coversbank' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E2D\u0E22\u0E39\u0E48'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                _this.props.data["brand"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07\u0E41\u0E25\u0E30\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                _this.props.data["name"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22 4\u0E15\u0E31\u0E27'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                '******',
                                _this.props.data["number"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E2D\u0E35\u0E40\u0E21\u0E25'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                _this.props.data["email"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { 'class': 'btn registerbtn', onClick: _this.changePayment },
                                '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23'
                            )
                        )
                    )
                )
            };
        }
        return _this;
    }

    _createClass(PaymentSetup, [{
        key: 'setPrice',
        value: function setPrice(e) {
            var _this2 = this;

            var price = document.querySelector('#setpriceid').value;
            var type = "paymentchange";
            price = document.querySelector('#setpriceid').value;
            var getcooked = getCookie('csrftoken');

            fetch('/paymentsetupapi', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    price: price,
                    type: type
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'สําเร็จ!'
                });
                _this2.setState({
                    price: data["price"],
                    innerpricediv: React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'div',
                            { 'class': 'coversprice' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'label',
                                    null,
                                    '\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D (THB)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'h5',
                                    { 'class': 'registertitleprice' },
                                    data["price"],
                                    ' \u0E3F'
                                )
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn registerbtn', onClick: _this2.changePrice },
                                    '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E32\u0E04\u0E32'
                                )
                            )
                        )
                    ) });

                //if data returns successful show beautiful success stuff
                //if not show failed html
                console.log(data);
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(status) {
            var _this3 = this;

            console.log("this is status", status);
            var type = "";
            var price = "";
            console.log("what is the status");
            if (status == "change") {
                type = "existpostupdate";
            } else {
                type = "notexistpost";
                price = document.querySelector('#setpriceid').value;
                if (price == "") {
                    price = 1;
                }
            }

            var checker = 0;
            console.log("bank value", document.querySelector('#selectbankid').value);
            if (document.querySelector('#selectbankid').value == "nothing") {
                checker = 1;
            } else if (document.querySelector('#accountnumberid').value == "") {
                checker = 1;
            } else if (document.querySelector('#fullnamebankid').value == "") {
                checker = 1;
            } else if (document.querySelector('#emailid').value == "") {
                checker = 1;
            }

            if (checker == 0) {
                console.log("yoooo");
                //send the info here to python
                var getcooked = getCookie('csrftoken');
                fetch('/paymentsetupapi', {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify({
                        bank: document.querySelector('#selectbankid').value,
                        fullname: document.querySelector('#fullnamebankid').value,
                        accountnumber: document.querySelector('#accountnumberid').value,
                        email: document.querySelector('#emailid').value,
                        price: price,
                        type: type

                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'สําเร็จ!'
                    });
                    console.log("suk mah dik", data);
                    console.log("suk mah dik", data["brand"]);
                    console.log("suk mah dik", data["number"]);
                    console.log("suk mah dik", data["email"]);
                    console.log("suk mah dik", data["number"]);
                    console.log("pricey", data["price"]);
                    document.querySelector('#checkexistid').value = "exist";

                    //if data returns successful show beautiful success stuff
                    //if not show failed html
                    console.log();

                    if (data["lol"] == "dumb" || data["lol"] != null) {
                        console.log("is this in here wtf pls dont be in here");
                        _this3.setState({
                            price: data["price"],
                            innerpricediv: React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'div',
                                    { 'class': 'coversprice' },
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'label',
                                            null,
                                            '\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D (THB)'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'h5',
                                            { 'class': 'registertitleprice' },
                                            price,
                                            ' \u0E3F'
                                        )
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'button',
                                            { 'class': 'btn registerbtn', onClick: _this3.changePrice },
                                            '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E32\u0E04\u0E32'
                                        )
                                    )
                                )
                            )
                        });
                    }
                    _this3.setState({

                        brand: data["brand"],
                        name: data["name"],
                        number: data["number"],
                        email: data["email"],

                        innerpaymentdiv: React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-5' },
                            React.createElement(
                                'div',
                                { 'class': 'coversbank' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E2D\u0E22\u0E39\u0E48'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h5',
                                        null,
                                        data["brand"]
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center mt-2' },
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07\u0E41\u0E25\u0E30\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h5',
                                        null,
                                        data["name"]
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center mt-2' },
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22 4\u0E15\u0E31\u0E27'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h5',
                                        null,
                                        '******',
                                        data["number"]
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center mt-2' },
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u0E2D\u0E35\u0E40\u0E21\u0E25'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h5',
                                        null,
                                        data["email"]
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'button',
                                        { 'class': 'btn registerbtn', onClick: _this3.changePayment },
                                        '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23'
                                    )
                                )
                            )
                        )

                    });
                });
            } else {
                alert("ฟอร์มถูกกรอกไม่ครบ");
            }
        }
    }, {
        key: 'cancelPriceChange',
        value: function cancelPriceChange(e) {
            this.setState({
                innerpricediv: React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'coversprice' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D (THB)'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                { 'class': 'registertitleprice' },
                                this.props.data["price"],
                                ' \u0E3F'
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { 'class': 'btn registerbtn', onClick: this.changePrice },
                                '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E32\u0E04\u0E32'
                            )
                        )
                    )
                )
            });
        }
    }, {
        key: 'cancelChange',
        value: function cancelChange(e) {

            this.setState({

                innerpaymentdiv: React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-5' },
                    React.createElement(
                        'div',
                        { 'class': 'coversbank' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E2D\u0E22\u0E39\u0E48'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                this.props.data["brand"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07\u0E41\u0E25\u0E30\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                this.props.data["name"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22 4\u0E15\u0E31\u0E27'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                '******',
                                this.props.data["number"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'label',
                                null,
                                '\u0E2D\u0E35\u0E40\u0E21\u0E25'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h5',
                                null,
                                this.props.data["email"]
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'button',
                                { 'class': 'btn registerbtn', onClick: this.changePayment },
                                '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23'
                            )
                        )
                    )
                )
            });
        }
    }, {
        key: 'changePrice',
        value: function changePrice(e) {
            console.log("this is in changeprice");
            if (document.querySelector('#checkexistid').value == "exist") {
                this.setState({
                    innerpricediv: React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'div',
                                { 'class': 'coversprice' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'label',
                                        null,
                                        '\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E44\u0E2D (THB)'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement('input', { 'class': 'inputheho', id: 'setpriceid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 500' })
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'button',
                                        { 'class': 'btn registerbtnlog', onClick: this.setPrice },
                                        '\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center mt-2' },
                                    React.createElement(
                                        'button',
                                        { 'class': 'btn registerbtnloglog', onClick: this.cancelPriceChange },
                                        '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
                                    )
                                )
                            )
                        )
                    )

                });
            }
        }
    }, {
        key: 'changePayment',
        value: function changePayment(e) {
            var _this4 = this;

            console.log("this is in changepayment");

            if (document.querySelector('#checkexistid').value == "exist") {
                this.setState({

                    innerpaymentdiv: React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-5' },
                        React.createElement(
                            'div',
                            { 'class': 'coversbank' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'label',
                                    null,
                                    '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'select',
                                    { 'class': 'inputheho', name: 'selectbank', id: 'selectbankid' },
                                    React.createElement('option', { value: 'nothing' }),
                                    React.createElement(
                                        'option',
                                        { value: 'bbl' },
                                        'Bangkok Bank'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'bay' },
                                        'Krungsri Bank'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'kbank' },
                                        'Kasikorn Bank'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'ktb' },
                                        'Krungthai Bank'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'scb' },
                                        'Siam Commercial Bank'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'ttb' },
                                        'Thanachart Bank'
                                    )
                                )
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    '\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25  (\u0E44\u0E17\u0E22 \u0E2B\u0E23\u0E37\u0E2D \u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', id: 'fullnamebankid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: \u0E27\u0E34\u0E23\u0E0A\u0E31\u0E0A \u0E27\u0E35\u0E2A\u0E01\u0E38\u0E25' })
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    '\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E43\u0E2B\u0E21\u0E48'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', id: 'accountnumberid', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: 0384683978' })
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    '\u0E2D\u0E35\u0E40\u0E21\u0E25'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'class': 'inputheho', placeholder: '\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07: araisukyarng@gmail.com', id: 'emailid' })
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'label',
                                { 'class': 'wa d-flex justify-content-center mt-2' },
                                '*\u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07*'
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn registerbtn', onClick: function onClick() {
                                            return _this4.onSubmit("change");
                                        } },
                                    '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn registerbtnloglog', onClick: this.cancelChange },
                                    '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
                                )
                            )
                        )
                    )

                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("what the fuck is this", this.props.data);
            console.log("what the fuck is this", this.props.data["brand"]);
            console.log("what the fuck is this", this.props.data["name"]);
            console.log("what the fuck is this", this.props.data["number"]);
            console.log("what the fuck is this", this.props.data["price"]);
            console.log("exists?", document.querySelector('#checkexistid').value);
            /* <div class="d-flex justify-content-center">
                              <label>Set Price (THB)</label>
                          </div>
                          <div class="d-flex justify-content-center">
                              <input id="setpriceid"></input>
                          </div>
                          <div class="d-flex justify-content-center mt-1">
                              <button class="btn btn-primary" onClick={this.setPrice}>Change Price</button>
                          </div>
              */

            return React.createElement(
                'div',
                null,
                React.createElement('div', { 'class': 'godown' }),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mb-4' },
                    React.createElement(
                        'h2',
                        { 'class': 'registertitle' },
                        '\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19'
                    )
                ),
                this.state.innerpricediv,
                this.state.innerpaymentdiv
            );
        }
    }]);

    return PaymentSetup;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {

    var type = "notexist";
    if (document.querySelector('#checkexistid').value == "exist") {
        type = "exist";
    } else {
        type = "notexistnotpost";
    }

    console.log("this is type", type);
    var getcooked = getCookie('csrftoken');
    fetch('/paymentsetupapi', {
        method: 'POST',
        headers: { 'X-CSRFToken': getcooked },
        body: JSON.stringify({
            type: type

        })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("sscary", data);

        //if data returns successful show beautiful success stuff
        //if not show failed html
        ReactDOM.render(React.createElement(PaymentSetup, { data: data }), document.querySelector('#paymentpay'));
    });
});