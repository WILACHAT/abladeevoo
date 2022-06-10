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

var AllStarsTable = function (_React$Component) {
    _inherits(AllStarsTable, _React$Component);

    function AllStarsTable(props) {
        _classCallCheck(this, AllStarsTable);

        return _possibleConstructorReturn(this, (AllStarsTable.__proto__ || Object.getPrototypeOf(AllStarsTable)).call(this, props));
    }

    _createClass(AllStarsTable, [{
        key: 'render',
        value: function render() {
            var allstars_row = [];
            for (var i = 0; i < this.props.data.length; i++) {
                console.log(i);
                //console.log("lol wtf", this.props.data[i])
                allstars_row.push(React.createElement(AllStarsRow, {
                    id: this.props.data[i].id,
                    username: this.props.data[i].influencer,
                    email: this.props.data[i].email,
                    influencer_ornot: this.props.data[i].influencer_ornot,
                    freeze_account: this.props.data[i].freeze_account,
                    fullname: this.props.data[i].profile_fullname,
                    profile_picture: this.props.data[i].profile_picture,
                    lengthh: this.props.data.length
                }));
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column' },
                        React.createElement(
                            'h1',
                            null,
                            'yo wassup'
                        ),
                        React.createElement(
                            'h1',
                            null,
                            'arrigato'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center twooneallstar' },
                    allstars_row
                )
            );
        }
    }]);

    return AllStarsTable;
}(React.Component);

var AllStarsRow = function (_React$Component2) {
    _inherits(AllStarsRow, _React$Component2);

    function AllStarsRow(props) {
        _classCallCheck(this, AllStarsRow);

        return _possibleConstructorReturn(this, (AllStarsRow.__proto__ || Object.getPrototypeOf(AllStarsRow)).call(this, props));
    }

    _createClass(AllStarsRow, [{
        key: 'render',
        value: function render() {
            var link = void 0;
            if (this.props.profile_picture != null) {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profile_picture + ".jpg";
            } else {
                link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
            }
            var ininfluencer_link = "/ininfluencer/" + this.props.username;

            console.log("fullname", this.props.fullname);
            console.log("username", this.props.username);

            return React.createElement(
                'div',
                { 'class': 'sizeofcolumnallstars' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'a',
                        { name: 'goodmorning', 'class': 'goodmorning mb-3', href: ininfluencer_link },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column' },
                            React.createElement('img', { 'class': 'imgindex', width: '240', height: '300', src: link }),
                            React.createElement(
                                'h5',
                                { name: 'posterr', 'class': 'indexusername' },
                                this.props.username
                            ),
                            React.createElement(
                                'h5',
                                { 'class': 'indexfullname' },
                                this.props.fullname
                            )
                        )
                    ),
                    React.createElement('hr', { 'class': 'hrindex' })
                )
            );
        }
    }]);

    return AllStarsRow;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    fetch('/allstarsapi').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("this is data", data);

        ReactDOM.render(React.createElement(AllStarsTable, { data: data }), document.querySelector('#allstarscover'));
    });
});