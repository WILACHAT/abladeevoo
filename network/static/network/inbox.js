var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
       completed: false
firstinputoccasion: "birthday"
fourthinputoccasion: "fuck u"
fromintro: "someone else"
id: 3
secondinputoccasion: "old"
thirdinputoccasion: "nothing"
timestamp: "2022-04-07T03:42:42.397Z"
tointro: "Someone"
typeintro: "someoneelse_html_id"
typeoccasion: "birthday_html_i
//things you still need to do
*/
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
function checkforoccasiontype(occasion) {
    console.log("occasion", occasion);
    var checkoccasion = "";
    if (occasion == "birthday_html_id") {
        checkoccasion = "Birthday";
    } else if (occasion == "peptalk_html_id") {
        checkoccasion = "Pep Talk";
    } else if (occasion == "roastbutton_html_id") {
        checkoccasion = "Roast";
        console.log("is the mofo in here");
    } else {
        checkoccasion = "Others";
    }
    return checkoccasion;
}
/*
<h4>{this.props.name}</h4>
<h4>{this.props.giftornot}</h4>
<h4>{this.props.whatoccasion}</h4>
<h4>{this.props.completed}</h4>

HOW DO WE DO THE NEXT STPES GOD KAO PAI BLAH2 c
#TUM REVIEWS/PROFILE/edit in profile
*/

var EachReserve = function (_React$Component) {
    _inherits(EachReserve, _React$Component);

    function EachReserve(props) {
        _classCallCheck(this, EachReserve);

        var _this = _possibleConstructorReturn(this, (EachReserve.__proto__ || Object.getPrototypeOf(EachReserve)).call(this, props));

        _this.goBack = _this.goBack.bind(_this);
        _this.submitSave = _this.submitSave.bind(_this);
        _this.submitReview = _this.submitReview.bind(_this);
        _this.chooseFile = _this.chooseFile.bind(_this);

        console.log("right in the constructor");
        console.log("this.props.data", _this.props.data);

        console.log("bruh", _this.props.data["type"]);

        return _this;
    }

    _createClass(EachReserve, [{
        key: 'chooseFile',
        value: function chooseFile(e) {
            var fileinput = document.querySelector('#inputGroupFile01').files[0];
            var checker = fileinput['type'];

            checker = checker.split('/')[0];

            var type = "";
            if (checker == "video") {
                type = "video";
            } else {
                type = "image";
            }

            var formData = new FormData();
            formData.append("media", fileinput);

            var getcooked = getCookie('csrftoken');
            fetch('/forupload/' + type, {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: formData

            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                //right now its either you create a new video or unhide the one that you already have
                document.querySelector('#testervideo').hidden = false;
                document.querySelector('#sendingvideoidback').name = data['url'];
                document.querySelector('#testervideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + data['url'] + ".mp4";
            });
        }
    }, {
        key: 'goBack',
        value: function goBack(e) {
            console.log("this one is important", document.querySelector('#typeofpage').value);

            document.querySelector('#eachreserve').hidden = true;
            document.querySelector('#inboxmainid').hidden = false;
            if (document.querySelector('#typeofpage').value == "request") {

                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;
            } else {
                document.querySelector('#myinboxhtml').hidden = false;
                document.querySelector('#myrequesthtml').hidden = true;
            }
        }
    }, {
        key: 'submitSave',
        value: function submitSave(e) {
            //sending vdo and stuff gor ja yhu trong nee (this is just the message)
            var value = document.querySelector('#sendingbacktorequest').value;
            var reserveid = this.props.data["data"][0].id;
            var videoid = document.querySelector('#sendingvideoidback').name;

            var getcooked = getCookie('csrftoken');

            fetch('/gotoeachreserve', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    value: value,
                    reserveid: reserveid,
                    type: "submitvdo",
                    videoid: videoid
                })
            }).then(function (result) {
                window.location.href = "/inbox";
            });
        }
    }, {
        key: 'submitReview',
        value: function submitReview(e) {
            var _JSON$stringify;

            var getcooked = getCookie('csrftoken');
            var value = document.querySelector('#typeforreview').value;
            var reserveid = this.props.data["data"][0].id;
            var influencername = this.props.data["fornamedata"][0];

            console.log("value of review", value);
            fetch('/gotoeachreserve', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify((_JSON$stringify = {
                    value: value,
                    reserveid: reserveid,
                    influencername: influencername }, _defineProperty(_JSON$stringify, 'influencername', influencername), _defineProperty(_JSON$stringify, 'type', "submitreview"), _JSON$stringify))
            }).then(function (result) {
                window.location.href = "/inbox";
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var postoption = "";
            if (document.querySelector('#typeofpage').value == "request") {
                //this is before influencer posted video
                if (this.props.data["data"][0].completed != true) {
                    postoption = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { 'class': 'input-group' },
                            React.createElement(
                                'div',
                                { 'class': 'input-group-prepend' },
                                React.createElement(
                                    'span',
                                    { 'class': 'input-group-text', id: 'inputGroupFileAddon01' },
                                    'Upload'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'custom-file' },
                                React.createElement('input', { type: 'file', onChange: this.chooseFile, 'class': 'custom-file-input', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' }),
                                React.createElement(
                                    'label',
                                    { 'class': 'custom-file-label', 'for': 'inputGroupFile01' },
                                    'Choose file'
                                )
                            )
                        ),
                        React.createElement(
                            'video',
                            { hidden: true, id: 'testervideo', width: '320', height: '240', controls: true },
                            React.createElement('source', { src: '' }),
                            'Your browser does not support the video tag.'
                        ),
                        React.createElement('input', { name: '', type: 'hidden', id: 'sendingvideoidback' }),
                        React.createElement('input', { id: 'sendingbacktorequest' }),
                        React.createElement(
                            'button',
                            { 'class': 'btn btn-primary', onClick: this.submitSave, id: 'submitrequested' },
                            'Post'
                        )
                    );
                } else {
                    //this is after influencer posted video
                    var link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";
                    if (this.props.data["data"][0].reviewcompleted != true) {
                        postoption = React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                null,
                                'DONE'
                            ),
                            React.createElement(
                                'video',
                                { id: 'testervideo', width: '320', height: '240', controls: true },
                                React.createElement('source', { src: link }),
                                'Your browser does not support the video tag.'
                            ),
                            React.createElement(
                                'h1',
                                null,
                                'What you wrote: ',
                                this.props.data["forpostdata"][0]
                            ),
                            React.createElement(
                                'h3',
                                null,
                                'No reviews from customer yet'
                            )
                        );
                    } else {
                        // <img id="testerimage" alt="ye" width="800" height="500"></img>

                        postoption = React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                null,
                                'DONE'
                            ),
                            React.createElement(
                                'video',
                                { id: 'testervideo', width: '320', height: '240', controls: true },
                                React.createElement('source', { src: link }),
                                'Your browser does not support the video tag.'
                            ),
                            React.createElement(
                                'h1',
                                null,
                                'What you wrote: ',
                                this.props.data["forpostdata"][0]
                            ),
                            React.createElement(
                                'h3',
                                null,
                                'Customer Review: ',
                                this.props.data["reviewvalue"]
                            )
                        );
                    }
                }
            } else {
                if (this.props.data["data"][0].completed != true) {
                    postoption = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'Waiting for influencer'
                        )
                    );
                } else {
                    var _link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";

                    if (this.props.data["data"][0].reviewcompleted != true) {
                        postoption = React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                null,
                                'Done'
                            ),
                            React.createElement(
                                'video',
                                { id: 'testervideo', width: '320', height: '240', controls: true },
                                React.createElement('source', { src: _link }),
                                'Your browser does not support the video tag.'
                            ),
                            React.createElement(
                                'h2',
                                null,
                                'Message from influencer: ',
                                this.props.data["forpostdata"][0]
                            ),
                            React.createElement('input', { id: 'typeforreview' }),
                            React.createElement(
                                'button',
                                { onClick: this.submitReview, 'class': 'btn btn-primary' },
                                'Submit'
                            )
                        );
                    } else {
                        postoption = React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                null,
                                'Done'
                            ),
                            React.createElement(
                                'video',
                                { id: 'testervideo', width: '320', height: '240', controls: true },
                                React.createElement('source', { src: _link }),
                                'Your browser does not support the video tag.'
                            ),
                            React.createElement(
                                'h2',
                                null,
                                'Message from influencer: ',
                                this.props.data["forpostdata"][0]
                            ),
                            React.createElement(
                                'h1',
                                null,
                                'Ur Review'
                            ),
                            React.createElement(
                                'h3',
                                null,
                                this.props.data["reviewvalue"]
                            )
                        );
                    }
                }
            }
            var occasion = checkforoccasiontype(this.props.data["data"][0].typeoccasion);
            console.log("check for the occasion", occasion);
            if (occasion == "Birthday") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'Birthday'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'When is the birthday: ',
                        this.props.data["data"][0].firstinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'How old are they turning: ',
                        this.props.data["data"][0].secondinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Instructions: ',
                        this.props.data["data"][0].thirdinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Optional: ',
                        this.props.data["data"][0].fourthinputoccasion
                    )
                );
            } else if (occasion == "Pep Talk") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'Pep Talk'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'What\'s going on?: ',
                        this.props.data["data"][0].firstinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'How can help?: ',
                        this.props.data["data"][0].secondinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Optional: ',
                        this.props.data["data"][0].thirdinputoccasion
                    )
                );
            } else if (occasion == "Roast") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'Pep Talk'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'What to Roast?: ',
                        this.props.data["data"][0].firstinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Optional: ',
                        this.props.data["data"][0].secondinputoccasion
                    )
                );
            } else {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'Others'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'What\'s the occasion?: ',
                        this.props.data["data"][0].firstinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Instructions: ',
                        this.props.data["data"][0].secondinputoccasion
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'Optional: ',
                        this.props.data["data"][0].thirdinputoccasion
                    )
                );
            }
            console.log("this is the type of intro", this.props.data["data"][0].typeintro);

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { 'class': 'btn btn-primary', onClick: this.goBack },
                    'Back'
                ),
                React.createElement(
                    'h4',
                    null,
                    'Order Details'
                ),
                this.props.data["data"][0].typeintro == "someoneelse_html_id" ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'A Gift For Someone Else'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'From: ',
                        this.props.data["data"][0].tointro
                    ),
                    React.createElement(
                        'h4',
                        null,
                        'To: ',
                        this.props.data["data"][0].fromintro
                    )
                ) : React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        'For Buyer'
                    ),
                    React.createElement(
                        'h4',
                        null,
                        this.props.toinro
                    )
                ),
                occasion,
                this.props.data["data"][0].completed == true ? React.createElement(
                    'h4',
                    null,
                    'Completed'
                ) : React.createElement(
                    'h4',
                    null,
                    'Not Complete'
                ),
                postoption
            );
        }
    }]);

    return EachReserve;
}(React.Component);

var InboxFeedRows = function (_React$Component2) {
    _inherits(InboxFeedRows, _React$Component2);

    function InboxFeedRows(props) {
        _classCallCheck(this, InboxFeedRows);

        var _this2 = _possibleConstructorReturn(this, (InboxFeedRows.__proto__ || Object.getPrototypeOf(InboxFeedRows)).call(this, props));

        _this2.clickHref = _this2.clickHref.bind(_this2);

        return _this2;
    }

    _createClass(InboxFeedRows, [{
        key: 'clickHref',
        value: function clickHref(e) {

            document.querySelector('#eachreserve').hidden = false;
            document.querySelector('#inboxmainid').hidden = true;
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = true;

            console.log("clickedwork");
            var getcooked = getCookie('csrftoken');
            fetch('/gotozjguen484s9gj302g', {
                method: 'PUT',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    reservationid: e.target.name,
                    from: "eachreserve"
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("data", data);
                ReactDOM.render(React.createElement(EachReserve, { data: data }), document.querySelector('#eachreserve'));
            });
        }
    }, {
        key: 'render',
        value: function render() {

            console.log("check for", this.props.completed);

            var occasion = checkforoccasiontype(this.props.whatoccasion);

            var eachreserve = "/eachreserve";
            console.log("this is the id", this.props.id);

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { name: this.props.id, onClick: this.clickHref, 'class': 'h4 colorstyle' },
                    this.props.name
                ),
                React.createElement(
                    'h4',
                    null,
                    this.props.giftornot == "someoneelse_html_id" ? "A gift" : "For you"
                ),
                React.createElement(
                    'h4',
                    null,
                    occasion
                ),
                React.createElement(
                    'h4',
                    null,
                    this.props.completed == true ? "Completed" : "Not Complete"
                )
            );
        }
    }]);

    return InboxFeedRows;
}(React.Component);

var InboxFeedInbox = function (_React$Component3) {
    _inherits(InboxFeedInbox, _React$Component3);

    function InboxFeedInbox(props) {
        _classCallCheck(this, InboxFeedInbox);

        return _possibleConstructorReturn(this, (InboxFeedInbox.__proto__ || Object.getPrototypeOf(InboxFeedInbox)).call(this, props));
    }

    _createClass(InboxFeedInbox, [{
        key: 'render',
        value: function render() {
            var rows = [];

            console.log(this.props.data);
            for (var i = 0; i < this.props.data["data"].length; i++) {
                console.log("we wil lcccc", this.props.data["data"][i]);
                console.log("we wil lcccc22", this.props.data["fornamedata"][i]);
                rows.push(React.createElement(InboxFeedRows, {
                    id: this.props.data["data"][i].id,
                    name: this.props.data["fornamedata"][i],
                    giftornot: this.props.data["data"][i].typeintro,
                    whatoccasion: this.props.data["data"][i].typeoccasion,
                    completed: this.props.data["data"][i].completed }));
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'table',
                    { className: 'table table-hover table-sm' },
                    React.createElement(
                        'tbody',
                        null,
                        rows
                    )
                )
            );
        }
    }]);

    return InboxFeedInbox;
}(React.Component);

var InboxFeedTitle = function (_React$Component4) {
    _inherits(InboxFeedTitle, _React$Component4);

    function InboxFeedTitle(props) {
        _classCallCheck(this, InboxFeedTitle);

        var _this4 = _possibleConstructorReturn(this, (InboxFeedTitle.__proto__ || Object.getPrototypeOf(InboxFeedTitle)).call(this, props));

        _this4.changeFeedInbox = _this4.changeFeedInbox.bind(_this4);
        console.log("checklolol", _this4.props.data["checkifinfluencer"]);

        //document.querySelector('#maininfluencer').hidden = false;
        //document.querySelector('#reviewsmainfluencer').hidden = true;

        return _this4;
    }

    _createClass(InboxFeedTitle, [{
        key: 'changeFeedInbox',
        value: function changeFeedInbox(e) {
            var type = "";
            var csrftoken = getCookie('csrftoken');
            if (e.target.id == "myinboxid") {
                document.querySelector('#typeofpage').value = "inbox";
                document.querySelector('#myrequesthtml').hidden = true;
                document.querySelector('#myinboxhtml').hidden = false;

                type = "myinboxhtml";
            } else {
                document.querySelector('#typeofpage').value = "request";
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;

                type = "myrequesthtml";
            }
            fetch('/gotozjguen484s9gj302g', {
                method: 'PUT',
                headers: { 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    type: type,
                    from: "inbox"
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("this is the data that was sent back we will see", data);
                ReactDOM.render(React.createElement(InboxFeedInbox, { data: data }), document.querySelector('#' + type));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log("please print this out first", username)

            //  console.log("please print this out", this.props.username)
            // const bookhtmllink = "/book/"+this.props.data["username"]
            // console.log("sameperson", this.props.data["sameperson"])

            //<button onClick={this.subscribeButton}>{this.state.subscribecheck == "true" ? "Subscribed":"Subscribe"}</button>
            // console.log("arai gor mai roo but yea", username)
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'myinboxid', onClick: this.changeFeedInbox },
                    'My Inbox'
                ),
                this.props.data["checkifinfluencer"] == true ? React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-primary', id: 'myrequestid', onClick: this.changeFeedInbox },
                    'My Requests'
                ) : null
            );
        }
    }]);

    return InboxFeedTitle;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    // var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main";
    //console.log("influencer username", influencerusername)

    fetch('/gotozjguen484s9gj302g').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("gimme data", data);
        ReactDOM.render(React.createElement(InboxFeedTitle, { data: data }), document.querySelector('#inboxmainid'));
        ReactDOM.render(React.createElement(InboxFeedInbox, { data: data }), document.querySelector('#myinboxhtml'));
    });
});