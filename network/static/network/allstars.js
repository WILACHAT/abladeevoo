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

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.checkSearch = _this.checkSearch.bind(_this);

        return _this;
    }

    _createClass(SearchBar, [{
        key: 'checkSearch',
        value: function checkSearch(e) {
            //if (e.target.value !=  "")
            // {
            //  document.querySelector('#suggestions_por_react_popular').hidden = true;
            //}
            this.props.oncheckSearch(e.target.value);
            console.log("kaidoded", e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { 'class': 'divsearch d-flex justify-content-center' },
                React.createElement('input', {
                    id: 'searchid',
                    type: 'text',
                    'class': 'inputhehosearch form-control d-flex justify-content-center',
                    placeholder: '\u0E04\u0E49\u0E19\u0E2B\u0E32',
                    value: this.props.searchtext,
                    onChange: this.checkSearch
                })
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var AllStarsTable = function (_React$Component2) {
    _inherits(AllStarsTable, _React$Component2);

    function AllStarsTable(props) {
        _classCallCheck(this, AllStarsTable);

        var _this2 = _possibleConstructorReturn(this, (AllStarsTable.__proto__ || Object.getPrototypeOf(AllStarsTable)).call(this, props));

        _this2.mainSearch = _this2.mainSearch.bind(_this2);
        _this2.onSort = _this2.onSort.bind(_this2);

        _this2.state = {
            searchtext: "",
            newdata: _this2.props.data
        };

        return _this2;
    }

    _createClass(AllStarsTable, [{
        key: 'onSort',
        value: function onSort() {
            var _this3 = this;

            var sortingvalue = document.querySelector('#sortingallstars').value;
            var getcooked = getCookie('csrftoken');
            fetch('/allstarsapi', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    type: "sort",

                    sortingvalue: sortingvalue
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("tra1", data);

                _this3.setState({
                    newdata: data
                });
                console.log("tra", _this3.state.newdata);
            });
        }
    }, {
        key: 'mainSearch',
        value: function mainSearch(searchtext) {
            var _this4 = this;

            console.log("searchtext", searchtext);
            this.setState({ searchtext: searchtext });
            var getcooked = getCookie('csrftoken');
            fetch('/allstarsapi', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({

                    //add state of newdata right here
                    type: "search",
                    searchvalue: searchtext
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("checker checky for newdata", _this4.state.newdata);
                console.log("this is dataaaaaa mama mama", data);
                _this4.setState({
                    newdata: data
                });
                console.log("kaidoded2", _this4.state.newdata);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var allstars_row = [];
            for (var i = 0; i < this.state.newdata.length; i++) {
                console.log(i);
                //console.log("lol wtf", this.props.data[i])
                allstars_row.push(React.createElement(AllStarsRow, {
                    id: this.state.newdata[i].id,
                    username: this.state.newdata[i].username,
                    email: this.state.newdata[i].email,
                    influencer_ornot: this.state.newdata[i].influencer_ornot,
                    freeze_account: this.state.newdata[i].freeze_account,
                    fullname: this.state.newdata[i].profile_fullname,
                    profile_picture: this.state.newdata[i].profile_picture,
                    lengthh: this.state.newdata.length
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
                            'select',
                            { onChange: this.onSort, id: 'sortingallstars', 'class': 'inputdara' },
                            React.createElement(
                                'option',
                                { value: 'none' },
                                '\u0E40\u0E23\u0E35\u0E22\u0E07\u0E25\u0E33\u0E14\u0E31\u0E1A(\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)'
                            ),
                            React.createElement(
                                'option',
                                { value: 'pricehighlow' },
                                '\u0E23\u0E32\u0E04\u0E32: \u0E2A\u0E39\u0E07-\u0E15\u0E4D\u0E48\u0E32'
                            ),
                            React.createElement(
                                'option',
                                { value: 'pricelowhigh' },
                                '\u0E23\u0E32\u0E04\u0E32: \u0E15\u0E4D\u0E48\u0E32-\u0E2A\u0E39\u0E07'
                            ),
                            React.createElement(
                                'option',
                                { value: 'followershighlow' },
                                '\u0E1C\u0E39\u0E49\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21: \u0E2A\u0E39\u0E07-\u0E15\u0E4D\u0E48\u0E32'
                            ),
                            React.createElement(
                                'option',
                                { value: 'followerslowhigh' },
                                '\u0E1C\u0E39\u0E49\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21: \u0E15\u0E4D\u0E48\u0E32-\u0E2A\u0E39\u0E07'
                            ),
                            React.createElement(
                                'option',
                                { value: 'numreviews' },
                                '\u0E08\u0E4D\u0E32\u0E19\u0E27\u0E19\u0E23\u0E35\u0E27\u0E34\u0E27'
                            ),
                            React.createElement(
                                'option',
                                { value: 'catinflu' },
                                '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17: \u0E2D\u0E34\u0E19\u0E1F\u0E25\u0E39\u0E40\u0E2D\u0E19\u0E40\u0E0B\u0E2D\u0E23\u0E4C'
                            ),
                            React.createElement(
                                'option',
                                { value: 'catactor' },
                                '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17: \u0E19\u0E31\u0E01\u0E41\u0E2A\u0E14\u0E07'
                            ),
                            React.createElement(
                                'option',
                                { value: 'catathelete' },
                                '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17: \u0E19\u0E31\u0E01\u0E01\u0E35\u0E2C\u0E32'
                            ),
                            React.createElement(
                                'option',
                                { value: 'catstreamer' },
                                '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17: \u0E2A\u0E15\u0E23\u0E35\u0E21\u0E40\u0E21\u0E2D\u0E23\u0E4C/\u0E40\u0E01\u0E21\u0E40\u0E21\u0E2D\u0E23\u0E4C'
                            ),
                            React.createElement(
                                'option',
                                { value: 'catothers' },
                                '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17: \u0E2D\u0E37\u0E48\u0E19\u0E46'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(SearchBar, { searchtext: this.state.searchtext, oncheckSearch: this.mainSearch })
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

var AllStarsRow = function (_React$Component3) {
    _inherits(AllStarsRow, _React$Component3);

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
                        { 'class': 'd-flex justify-content-center mb-3 goodmorningallstars', href: ininfluencer_link },
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