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

var InfluencerFeedTitle = function (_React$Component) {
    _inherits(InfluencerFeedTitle, _React$Component);

    function InfluencerFeedTitle(props) {
        _classCallCheck(this, InfluencerFeedTitle);

        var _this = _possibleConstructorReturn(this, (InfluencerFeedTitle.__proto__ || Object.getPrototypeOf(InfluencerFeedTitle)).call(this, props));

        _this.changeFeedPortal = _this.changeFeedPortal.bind(_this);

        document.querySelector('#maininfluencer').hidden = false;
        document.querySelector('#reviewsmainfluencer').hidden = true;

        return _this;
    }

    _createClass(InfluencerFeedTitle, [{
        key: 'changeFeedPortal',
        value: function changeFeedPortal(e) {
            if (e.target.id == "publicfeedbutid") {
                document.querySelector('#maininfluencer').hidden = false;
                document.querySelector('#reviewsmainfluencer').hidden = true;
                var feedtype = "main";
                fetch('/gotoinfluencer/' + this.props.data + '/' + feedtype).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    //when the data is returned use reactdom render new table 
                    ReactDOM.render(React.createElement(PortalFeedTable, { data: data }), document.querySelector('#publicfeedid'));
                });
            } else if (e.target.id == "reviewfeedbutid") {
                document.querySelector('#maininfluencer').hidden = true;
                document.querySelector('#reviewsmainfluencer').hidden = false;
                var feedtype = "review";
                fetch('/gotoinfluencer/' + this.props.data + '/' + feedtype).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    //when the data is returned use reactdom render new table 

                    ReactDOM.render(React.createElement(PortalFeedTable, { data: data }), document.querySelector('#publicfeedid'));
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log("please print this out first", username)

            //  console.log("please print this out", this.props.username)
            var bookhtmllink = "/book/" + this.props.data["username"];
            console.log("sameperson", this.props.data["sameperson"]);

            //<button onClick={this.subscribeButton}>{this.state.subscribecheck == "true" ? "Subscribed":"Subscribe"}</button>


            // console.log("arai gor mai roo but yea", username)
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    this.props.data['username']
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'publicfeedbutid', onClick: this.changeFeedPortal },
                    'Public Feed'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'reviewfeedbutid', onClick: this.changeFeedPortal },
                    'Reviews'
                ),
                this.props.data["sameperson"] != 1 ? React.createElement(
                    'a',
                    { name: 'posterr', 'class': 'btn btn-primary', href: bookhtmllink },
                    'Reserve'
                ) : null
            );
        }
    }]);

    return InfluencerFeedTitle;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    console.log("walachat");
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main";
    console.log("influencer username", influencerusername);

    fetch('/gotoinfluencer/' + influencerusername + '/' + feedtype).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("gimme data", data);
        ReactDOM.render(React.createElement(InfluencerFeedTitle, { data: data }), document.querySelector('#toppart'));
        //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));

    });
});