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

var SearchOverlay = function (_React$Component) {
    _inherits(SearchOverlay, _React$Component);

    function SearchOverlay(props) {
        _classCallCheck(this, SearchOverlay);

        var _this = _possibleConstructorReturn(this, (SearchOverlay.__proto__ || Object.getPrototypeOf(SearchOverlay)).call(this, props));

        _this.forFetching = _this.forFetching.bind(_this);
        console.log("haha", _this.props.data);
        console.log("ha name", _this.props.portalname);

        return _this;
    }

    _createClass(SearchOverlay, [{
        key: 'forFetching',
        value: function forFetching() {
            var csrftoken = getCookie('csrftoken');
            var portalid = 1;
            var pagination = 1;
            var postvalue = document.querySelector('#textareapostid').value;
            console.log("forFetching", postvalue);

            fetch('/gotoportal/' + portalid + '/' + pagination, {
                method: 'PUT',
                headers: { 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    portalname: this.props.portalname,
                    posttype: this.props.data,
                    postvalue: postvalue

                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("waan check ");
                ReactDOM.render(React.createElement(PortalFeedTable, { data: data }), document.querySelector('#publicfeedid'));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'overlayrc' },
                React.createElement(
                    'h1',
                    null,
                    'what is this'
                ),
                React.createElement('textarea', { id: 'textareapostid' }),
                React.createElement('button', { type: 'button', 'class': 'btn btn-primary', id: 'postinfeedid', onClick: this.forFetching })
            );
        }
    }]);

    return SearchOverlay;
}(React.Component);

var PortalFeedRows = function (_React$Component2) {
    _inherits(PortalFeedRows, _React$Component2);

    function PortalFeedRows(props) {
        _classCallCheck(this, PortalFeedRows);

        return _possibleConstructorReturn(this, (PortalFeedRows.__proto__ || Object.getPrototypeOf(PortalFeedRows)).call(this, props));
    }

    _createClass(PortalFeedRows, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'table',
                    { className: 'table table-hover table-sm' },
                    React.createElement(
                        'tbody',
                        null,
                        ' ',
                        rows,
                        ' '
                    )
                )
            );
        }
    }]);

    return PortalFeedRows;
}(React.Component);

var PortalFeedTable = function (_React$Component3) {
    _inherits(PortalFeedTable, _React$Component3);

    function PortalFeedTable(props) {
        _classCallCheck(this, PortalFeedTable);

        var _this3 = _possibleConstructorReturn(this, (PortalFeedTable.__proto__ || Object.getPrototypeOf(PortalFeedTable)).call(this, props));

        _this3.postButton = _this3.postButton.bind(_this3);
        console.log("datadatadata", _this3.props.data);
        //  console.log("posts", this.props.portal_name)
        // console.log("posts1", this.props.data["data"][0].portal_id)
        //console.log("posts2", this.props.data["data"][0].post_info)
        //console.log("posts3", this.props.data["data"][0].type_posts)

        return _this3;
    }

    _createClass(PortalFeedTable, [{
        key: 'postButton',
        value: function postButton() {
            ReactDOM.render(React.createElement(SearchOverlay, { data: 'publicfeedid', portalname: this.props.data }), document.querySelector('#publicfeedid'));
        }
    }, {
        key: 'render',
        value: function render() {
            //  const rows = [];
            //  for (let i = 0; i < this.props.data["data"].length; i++)
            //  {
            //   rows.push(
            //     <PortalFeedRows
            //      />
            //  );

            //  }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'this is public feed'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'storefeedid', onClick: this.postButton },
                    'Post'
                )
            );
        }
    }]);

    return PortalFeedTable;
}(React.Component);

var PortalFeedTitle = function (_React$Component4) {
    _inherits(PortalFeedTitle, _React$Component4);

    function PortalFeedTitle(props) {
        _classCallCheck(this, PortalFeedTitle);

        var _this4 = _possibleConstructorReturn(this, (PortalFeedTitle.__proto__ || Object.getPrototypeOf(PortalFeedTitle)).call(this, props));

        _this4.changeFeedPortal = _this4.changeFeedPortal.bind(_this4);
        document.querySelector('#publicfeedid').hidden = false;
        document.querySelector('#memberfeedid').hidden = true;
        document.querySelector('#communitypageid').hidden = true;
        document.querySelector('#storepageid').hidden = true;
        return _this4;
    }

    _createClass(PortalFeedTitle, [{
        key: 'changeFeedPortal',
        value: function changeFeedPortal(e) {
            if (e.target.id == "publicfeedbutid") {
                document.querySelector('#publicfeedid').hidden = false;
                document.querySelector('#memberfeedid').hidden = true;
                document.querySelector('#communitypageid').hidden = true;
                document.querySelector('#storepageid').hidden = true;
                ReactDOM.render(React.createElement(PortalFeedTable, { data: this.props.data.portalname["portal_name"] }), document.querySelector('#publicfeedid'));
            } else if (e.target.id == "memberfeedbutid") {
                document.querySelector('#publicfeedid').hidden = true;
                document.querySelector('#memberfeedid').hidden = false;
                document.querySelector('#communitypageid').hidden = true;
                document.querySelector('#storepageid').hidden = true;
            } else if (e.target.id == "communityfeedbutid") {
                document.querySelector('#publicfeedid').hidden = true;
                document.querySelector('#memberfeedid').hidden = true;
                document.querySelector('#communitypageid').hidden = false;
                document.querySelector('#storepageid').hidden = true;
            } else if (e.target.id == "storefeedid") {
                document.querySelector('#publicfeedid').hidden = true;
                document.querySelector('#memberfeedid').hidden = true;
                document.querySelector('#communitypageid').hidden = true;
                document.querySelector('#storepageid').hidden = false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var suggestion_rows = [];
            /* for (let i = 0; i < this.props.data.length; i++)
             {
               suggestion_rows.push(
                 <PortalFeedRow
                     id={this.props.data[i].id}
                     portalname={this.props.data[i].portalname}
                     websiteurl={this.props.data[i].websiteurl}
                     portaldes={this.props.data[i].portaldes}
                     currenttime={this.props.data[i].currenttime}/>
                       <table>
                   <tbody> {suggestion_rows} </tbody>
                   </table>
               );
             }
             */
            return React.createElement(
                'div',
                { id: 'control-suggestions' },
                React.createElement(
                    'h4',
                    null,
                    this.props.data.portalname["portal_name"]
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'publicfeedbutid', onClick: this.changeFeedPortal },
                    'Public Feed'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'memberfeedbutid', onClick: this.changeFeedPortal },
                    'Member Feed'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'communityfeedbutid', onClick: this.changeFeedPortal },
                    'Community'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'storefeedid', onClick: this.changeFeedPortal },
                    'Store'
                ),
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'postinfeedid' },
                    'Post'
                )
            );
        }
    }]);

    return PortalFeedTitle;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    console.log("waan");
    var portalid = document.getElementById('getportalid_id').dataset.portalId;
    var pagination = 1;
    fetch('/gotoportal/' + portalid + '/' + pagination).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("newdata ugggg", data);
        ReactDOM.render(React.createElement(PortalFeedTitle, { data: data }), document.querySelector('#firstfeedid'));
    });
});