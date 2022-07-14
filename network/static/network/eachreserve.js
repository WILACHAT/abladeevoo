var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InboxFeedRows = function (_React$Component) {
    _inherits(InboxFeedRows, _React$Component);

    function InboxFeedRows(props) {
        _classCallCheck(this, InboxFeedRows);

        return _possibleConstructorReturn(this, (InboxFeedRows.__proto__ || Object.getPrototypeOf(InboxFeedRows)).call(this, props));
    }

    _createClass(InboxFeedRows, [{
        key: "render",
        value: function render() {

            var occasion = "";
            if (this.props.whatoccasion == "birthday_html_id") {
                occasion = "Birthday";
            } else if (this.props.whatoccasion == "peptalk_html_id") {
                occasion = "Pep Talk";
            } else if (this.props.whatoccasion == "roastbutton_html_id") {
                occasion = "Roast";
            } else {
                occasion = "Others";
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    this.props.name
                ),
                React.createElement(
                    "h4",
                    null,
                    this.props.giftornot == "someoneelse_html_id" ? "A gift" : "For you"
                ),
                React.createElement(
                    "h4",
                    null,
                    occasion
                ),
                React.createElement(
                    "h4",
                    null,
                    this.props.completed == true ? "Completed" : "Not Complete"
                )
            );
        }
    }]);

    return InboxFeedRows;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    splittedwindow = window.location.href.split(" ");
    reservationid = splittedwindow[2];
    fetch("/gotoeachreserve/" + reservationid).then(function (response) {
        return response.json();
    }).then(function (data) {
        print("data");
        // ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
    });
});