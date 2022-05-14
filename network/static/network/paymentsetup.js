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
        return _this;
    }

    _createClass(PaymentSetup, [{
        key: 'onSubmit',
        value: function onSubmit(e) {
            console.log(document.querySelector('#selectbankid').value);
            document.querySelector('#fullnamebankid').value;
            document.querySelector('#accountnumberid').value;
            document.querySelector('#emailid').value;

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
                    email: document.querySelector('#emailid').value
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                //if data returns successful show beautiful success stuff
                //if not show failed html
                console.log(data);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    { 'class': 'godown' },
                    'Payment'
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'label',
                        null,
                        'Select Bank'
                    )
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
                            { value: 'scv' },
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
                        'Full Name'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement('input', { id: 'fullnamebankid' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2' },
                    React.createElement(
                        'label',
                        null,
                        'Account Number'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement('input', { id: 'accountnumberid' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2' },
                    React.createElement(
                        'label',
                        null,
                        'Email'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement('input', { id: 'emailid' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2' },
                    React.createElement(
                        'button',
                        { 'class': 'btn btn-primary', onClick: this.onSubmit },
                        'Submit'
                    )
                )
            );
        }
    }]);

    return PaymentSetup;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    fetch('/paymentsetupapi').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("data", data);

        ReactDOM.render(React.createElement(PaymentSetup, null), document.querySelector('#paymentpay'));
    });
});