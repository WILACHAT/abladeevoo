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
        _this.saveUrl = _this.saveUrl.bind(_this);

        console.log("right in the constructor");
        console.log("this.props.data", _this.props.data);

        console.log("bruh", _this.props.data["type"]);

        return _this;
    }

    _createClass(EachReserve, [{
        key: 'saveUrl',
        value: function saveUrl(e) {
            var content = e.target.value;
            if (!navigator.clipboard) {
                return;
            }

            navigator.clipboard.writeText(content).then(function () {
                console.log("Text copied to clipboard...");
            }).catch(function (err) {
                console.log('Something went wrong', err);
            });
        }
    }, {
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
                console.log("yayyyyyyyyyyyyyyy");
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
            var getcooked = getCookie('csrftoken');
            var value = document.querySelector('#typeforreview').value;
            if (value == "") {
                alert("You can't submit Review without writing a review");
            } else {
                var _JSON$stringify;

                var reserveid = this.props.data["data"][0].id;

                console.log("before error", this.props.data["data"][0].username_influencer);

                var influencername = this.props.data["data"][0].username_influencer;

                var selectreview = document.querySelector('#selectforreview').value;

                console.log("value of review", value);

                fetch('/gotoeachreserve', {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify((_JSON$stringify = {
                        value: value,
                        reserveid: reserveid,
                        influencername: influencername }, _defineProperty(_JSON$stringify, 'influencername', influencername), _defineProperty(_JSON$stringify, 'type', "submitreview"), _defineProperty(_JSON$stringify, 'reviewstars', selectreview), _JSON$stringify))
                }).then(function (result) {
                    window.location.href = "/inbox";
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("hahahahahahheheheheheh", document.querySelector('#typeofpage').value);

            var videoandstuff = "";
            link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";

            videoandstuff = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'videowhenget' },
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'video',
                                { id: 'testervideo', 'class': 'videovideowhenget', controls: true },
                                React.createElement('source', { src: link }),
                                'Your browser does not support the video tag.'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'button',
                                { id: 'savethelink', value: link, onClick: this.saveUrl, 'class': 'btn btn-primary' },
                                'Copy Video to Post somewhere!'
                            )
                        )
                    )
                )
            );

            var postoption = "";
            if (document.querySelector('#typeofpage').value == "request") {
                //this is before influencer posted video
                if (this.props.data["data"][0].completed != true) {
                    postoption = React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mb-3' },
                        React.createElement(
                            'div',
                            { 'class': 'postoptionforinfluencer' },
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa', htmlFor: 'edit_post_txt' },
                                        '\u0E04\u0E25\u0E34\u0E4A\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E37\u0E2D\u0E01 Vid \u0E42\u0E1E\u0E2A\u0E15\u0E4C: '
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'custom-file' },
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement('input', { type: 'file', onChange: this.chooseFile, 'class': 'editintrovid', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center mt-5' },
                                    React.createElement(
                                        'video',
                                        { hidden: true, id: 'testervideo', 'class': 'videovideowhenget', controls: true },
                                        React.createElement('source', { src: link }),
                                        'Your browser does not support the video tag.'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-4' },
                                React.createElement(
                                    'h6',
                                    { 'class': 'wa' },
                                    '\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E31\u0E49\u0E19\u0E46\u0E43\u0E2B\u0E49\u0E41\u0E1F\u0E19\u0E04\u0E25\u0E31\u0E1A: '
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'sendingbacktorequest' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-3 mb-5' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn btn-primary', onClick: this.submitSave, id: 'submitrequested' },
                                    'Post'
                                )
                            ),
                            React.createElement('input', { name: '', type: 'hidden', id: 'sendingvideoidback' })
                        )
                    );
                } else {
                    //this is after influencer posted video
                    var _link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";

                    postoption = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { 'class': 'donetitle' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'h1',
                                    { 'class': 'donetext' },
                                    '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27\u0E27\u0E27!'
                                )
                            )
                        ),
                        videoandstuff,
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-3' },
                            React.createElement(
                                'div',
                                { 'class': 'orderdetails' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E40\u0E02\u0E35\u0E22\u0E19\u0E43\u0E2B\u0E49\u0E41\u0E1F\u0E19\u0E04\u0E25\u0E31\u0E1A: '
                                    )
                                ),
                                React.createElement('hr', { 'class': 'hr' }),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h2',
                                        { 'class': 'wa' },
                                        this.props.data["forpostdata"][0]
                                    )
                                )
                            )
                        ),
                        this.props.data["data"][0].reviewcompleted != true ? React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-3 mb-5' },
                            React.createElement(
                                'div',
                                { 'class': 'orderdetails' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        'Customer Review: '
                                    )
                                ),
                                React.createElement('hr', { 'class': 'hr' }),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h2',
                                        { 'class': 'wa' },
                                        '\u0E22\u0E31\u0E27\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E35\u0E27\u0E34\u0E27'
                                    )
                                )
                            )
                        ) : React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-5 mb-5' },
                            React.createElement(
                                'div',
                                { 'class': 'orderdetails' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        'Customer Review: '
                                    )
                                ),
                                React.createElement('hr', { 'class': 'hr' }),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h2',
                                        { 'class': 'wa' },
                                        this.props.data["reviewvalue"]
                                    )
                                )
                            )
                        )
                    );
                }
            } else {
                if (this.props.data["data"][0].completed != true) {
                    postoption = React.createElement(
                        'div',
                        { 'class': 'mb-5' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E14\u0E4D\u0E32\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E4D\u0E32 Vid \u0E17\u0E35\u0E48\u0E19\u0E48\u0E32\u0E08\u0E14\u0E08\u0E4D\u0E32\u0E02\u0E2D\u0E07\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48'
                            )
                        )
                    );
                } else {
                    var _link2 = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";

                    postoption = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { 'class': 'donetitle' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'h1',
                                    { 'class': 'donetext' },
                                    '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27\u0E27\u0E27!'
                                )
                            )
                        ),
                        videoandstuff,
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-3' },
                            React.createElement(
                                'div',
                                { 'class': 'orderdetails' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E02\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E40\u0E25\u0E47\u0E01\u0E46\u0E19\u0E49\u0E2D\u0E22\u0E46\u0E08\u0E32\u0E01\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                    )
                                ),
                                React.createElement('hr', { 'class': 'hr' }),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h2',
                                        { 'class': 'wa' },
                                        this.props.data["forpostdata"][0]
                                    )
                                )
                            )
                        ),
                        this.props.data["data"][0].reviewcompleted != true ? React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-5' },
                                React.createElement(
                                    'h4',
                                    { 'class': 'wa' },
                                    '\u0E40\u0E02\u0E35\u0E22\u0E19\u0E23\u0E35\u0E27\u0E34\u0E27\u0E43\u0E2B\u0E49\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E04\u0E19\u0E42\u0E1B\u0E23\u0E14'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2 mb-3' },
                                React.createElement('input', { id: 'typeforreview' }),
                                React.createElement(
                                    'select',
                                    { id: 'selectforreview' },
                                    React.createElement(
                                        'option',
                                        { value: '5' },
                                        '5'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '4' },
                                        '4'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '3' },
                                        '3'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '2' },
                                        '2'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '1' },
                                        '1'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mb-5' },
                                React.createElement(
                                    'button',
                                    { onClick: this.submitReview, 'class': 'btn btn-primary' },
                                    'Submit'
                                )
                            )
                        ) : React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-5 mb-5' },
                            React.createElement(
                                'div',
                                { 'class': 'orderdetails' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E23\u0E35\u0E27\u0E34\u0E27\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13: '
                                    )
                                ),
                                React.createElement('hr', { 'class': 'hr' }),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h2',
                                        { 'class': 'wa' },
                                        this.props.data["reviewvalue"]
                                    )
                                )
                            )
                        )
                    );
                }
            }
            var occasion = checkforoccasiontype(this.props.data["data"][0].typeoccasion);
            console.log("check for the occasion", occasion);
            if (occasion == "Birthday") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                '\u0E40\u0E09\u0E25\u0E21\u0E40\u0E09\u0E25\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14'
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].firstinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E36\u0E49\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].secondinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14\u0E2D\u0E30\u0E44\u0E23: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].thirdinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].fourthinputoccasion
                            )
                        )
                    )
                );
            } else if (occasion == "Pep Talk") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                '\u0E04\u0E38\u0E22\u0E43\u0E2B\u0E49\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E17\u0E4D\u0E32\u0E44\u0E21\u0E16\u0E36\u0E07\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].firstinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E0A\u0E48\u0E27\u0E22\u0E2D\u0E30\u0E44\u0E23\u0E44\u0E14\u0E49\u0E1A\u0E49\u0E32\u0E07: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].secondinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].thirdinputoccasion
                            )
                        )
                    )
                );
            } else if (occasion == "Roast") {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                '\u0E40\u0E1C\u0E32'
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E40\u0E1C\u0E32\u0E2D\u0E30\u0E44\u0E23: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].firstinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].secondinputoccasion
                            )
                        )
                    )
                );
            } else {
                occasion = React.createElement(
                    'div',
                    null,
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].firstinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-3' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].secondinputoccasion
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'watitle' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C: '
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wainfo' },
                                this.props.data["data"][0].thirdinputoccasion
                            )
                        )
                    )
                );
            }
            console.log("this is the type of intro", this.props.data["data"][0].typeintro);
            console.log("SIDEMEN", this.props.data["propicandusername"]);
            console.log("gu tong check for data eek laew", this.props.data);
            console.log("gu tong check for data eek laew", this.props.data["data"][0].influencer_pic);

            var link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";

            if (document.querySelector('#typeofpage').value == "inbox") {
                if (this.props.data["data"][0].influencer_pic != null || this.props.data["data"][0].influencer_pic != "") {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].influencer_pic + ".jpg";
                }
            } else {
                if (this.props.data["data"][0].influencer_pic != null || this.props.data["data"][0].influencer_pic != "") {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].normal_pic + ".jpg";
                }
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { 'class': 'btn btn-primary ml-5', onClick: this.goBack },
                    'Back'
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mb-5' },
                    React.createElement(
                        'div',
                        { 'class': 'orderorder' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            this.props.data["data"][0].completed == true ? React.createElement(
                                'h4',
                                { 'class': 'watitle', style: { color: "green" } },
                                '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                            ) : React.createElement(
                                'h4',
                                { 'class': 'watitle', style: { color: "red" } },
                                '\u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mb-5' },
                    React.createElement(
                        'div',
                        { 'class': 'orderfrom' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            document.querySelector('#typeofpage').value == "inbox" ? React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E16\u0E36\u0E07'
                            ) : React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E08\u0E32\u0E01'
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            document.querySelector('#typeofpage').value == "inbox" ? React.createElement(
                                'h4',
                                { 'class': 'ml-2 align-middle' },
                                this.props.data["data"][0].username_influencer
                            ) : React.createElement(
                                'h4',
                                { 'class': 'ml-2 align-middle' },
                                this.props.data["data"][0].username
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement('img', { 'class': 'imgnoeditinbox', src: link })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mb-5' },
                    React.createElement(
                        'div',
                        { 'class': 'orderdetails' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            this.props.data["data"][0].typeintro == "someoneelse_html_id" ? React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E02\u0E2D\u0E07\u0E02\u0E27\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E19\u0E2D\u0E37\u0E48\u0E19'
                            ) : React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E02\u0E2D\u0E07\u0E02\u0E27\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E15\u0E19\u0E40\u0E2D\u0E07'
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        this.props.data["data"][0].typeintro == "someoneelse_html_id" ? React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mb-5' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex flex-column mt-3' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E08\u0E32\u0E01: ',
                                        this.props.data["data"][0].tointro
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E16\u0E36\u0E07: ',
                                        this.props.data["data"][0].fromintro
                                    )
                                ),
                                occasion
                            )
                        ) : React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mb-5' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex flex-column mt-3' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E16\u0E36\u0E07: ',
                                        this.props.data["data"][0].tointro
                                    )
                                ),
                                occasion
                            )
                        )
                    )
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
            console.log("this.props.iddddddd", this.props.id);

            console.log("KINGDOM IS ONE OF THE BEST MANGA OF ALL TIME BUT STILL ONE PIECE IS BETTER", document.querySelector('#divtogetid').value);
            document.querySelector('#myrequesthtml').hidden = true;

            console.log("clickedwork");
            var getcooked = getCookie('csrftoken');
            var paginationid = 1;
            fetch('/gotozjguen484s9gj302g/' + paginationid, {
                method: 'PUT',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    reservationid: this.props.id,
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

            var eachcontent = "";
            console.log("this.propsasdfasdfasdf", this.props);
            console.log(this.props.influencer_pic);
            console.log(this.props.normal_pic);
            var today = new Date().toISOString().slice(0, 10);

            var g1 = new Date(today);

            var g2 = new Date(this.props.duedate);

            var checktime = 0;
            if (g1.getTime() < g2.getTime()) {
                checktime = 0;
            } else {
                checktime = 1;
            }
            var link = "";

            if (this.props.type == "request") {
                if (this.props.normal_pic == null) {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";
                } else {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.normal_pic + ".jpg";
                }
            } else {
                if (this.props.influencer_pic == null) {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";
                } else {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.influencer_pic + ".jpg";
                }
            }

            var occasion = checkforoccasiontype(this.props.whatoccasion);

            eachcontent = React.createElement(
                'div',
                { 'class': 'okseecolor' },
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-between' },
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-start' },
                        React.createElement('img', { 'class': 'imgnoeditinbox mr-5', src: link }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column' },
                            React.createElement(
                                'a',
                                { 'class': 'wa' },
                                this.props.name
                            ),
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                this.props.giftornot == "someoneelse_html_id" ? "A gift" : "For you"
                            ),
                            this.props.completed == true ? React.createElement(
                                'h6',
                                { 'class': 'waduedatecomplete' },
                                '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                            ) : checktime == 0 ? React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'h6',
                                    { 'class': 'waduedate' },
                                    ' \u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                                ),
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E2A\u0E48\u0E07\u0E01\u0E48\u0E2D\u0E19'
                                ),
                                React.createElement(
                                    'h4',
                                    { 'class': 'waduedate' },
                                    this.props.duedate
                                )
                            ) : React.createElement(
                                'h4',
                                { 'class': 'waduedateexpire' },
                                '\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                occasion
                            )
                        ),
                        React.createElement(
                            'div',
                            { onClick: this.clickHref, 'class': 'button', id: 'button-7' },
                            React.createElement('input', { type: 'hidden', id: 'divtogetid', value: this.props.id }),
                            React.createElement(
                                'div',
                                { value: this.props.id, 'class': 'dub-arrow' },
                                React.createElement('img', { src: 'https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true', alt: '' })
                            ),
                            React.createElement(
                                'a',
                                { 'class': 'letsgo', href: '#' },
                                'Watch'
                            )
                        )
                    )
                )
            );

            return React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center mb-4' },
                this.props.type == "inbox" ? React.createElement(
                    'div',
                    { 'class': 'ineachrow mt-4' },
                    ' ',
                    eachcontent,
                    ' '
                ) : this.props.completed == true ? React.createElement(
                    'div',
                    { 'class': 'ineachrow mt-4' },
                    ' ',
                    eachcontent,
                    ' '
                ) : checktime == 1 ? null : React.createElement(
                    'div',
                    { 'class': 'ineachrow mt-4' },
                    ' ',
                    eachcontent,
                    ' '
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

        var _this3 = _possibleConstructorReturn(this, (InboxFeedInbox.__proto__ || Object.getPrototypeOf(InboxFeedInbox)).call(this, props));

        _this3.changePage = _this3.changePage.bind(_this3);
        _this3.hideCompleted = _this3.hideCompleted.bind(_this3);

        _this3.state = {
            newdata: _this3.props.data,
            hide: "Hide Completed"

        };
        return _this3;
    }

    _createClass(InboxFeedInbox, [{
        key: 'hideCompleted',
        value: function hideCompleted(e) {
            var _this4 = this;

            var type = "";

            console.log("ngong");
            console.log("ngong sus", this.state.hide);

            var csrftoken = getCookie('csrftoken');
            var paginationid = 1;
            if (e.target.value == "Unhide Completed") {
                type = "myrequesthtml";
            } else {
                console.log("is it in hidecompleted yohohoho");
                type = "hidecompleted";
            }
            console.log("type before in ", type);
            fetch('/gotozjguen484s9gj302g/' + paginationid, {
                method: 'PUT',
                headers: { 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    from: "inbox",
                    type: type
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("mg pen kuay arai", _this4.props.data);

                var hide = "";
                if (data["hide"] == 0) {
                    hide = "Hide Completed";
                } else {
                    hide = "Unhide Completed";
                }

                _this4.setState({
                    newdata: data,
                    hide: hide
                });
            });
        }
    }, {
        key: 'changePage',
        value: function changePage(e) {
            var _this5 = this;

            var pagination = e.target.id;
            var innerhtmlpage = e.target.innerHTML;

            if (innerhtmlpage == "Previous") {
                pagination = parseInt(pagination);
                pagination = pagination - 1;
            } else if (innerhtmlpage == "Next") {
                pagination = parseInt(pagination);
                pagination = pagination + 1;
            } else {
                pagination = parseInt(e.target.innerHTML);
            }
            var checkfornull = window.location.pathname.split('/')[2];
            var clicked = parseInt(window.location.pathname.split('/')[2]);
            if (checkfornull == null) {
                clicked = 0;
            }
            var type = "";
            if (this.props.data["type"] == "request") {
                type = "myrequesthtml";
            }
            var getcooked = getCookie('csrftoken');

            fetch('/gotozjguen484s9gj302g/' + pagination, {
                method: 'PUT',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    from: "inbox",
                    type: type
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this5.setState({
                    newdata: data

                });
                _this5.setState({
                    pagination: _this5.state.newdata["paginationid"]
                });
            });

            window.scrollTo(0, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("CUCKOOOOOOOOOO", this.props.data);
            console.log("CUCKOOOOOOOOOO SECONDO", this.state.pagination);

            var button = [];
            var rows = [];

            var paginationid = this.props.data["paginationid"];
            // {this.state.pagination == thej ? "page-item active":"page-item"}
            //style:{color:"red"}


            for (var j = 0; j < this.props.data["num_pages"]; j++) {
                var thej = j + 1;
                button.push(React.createElement(
                    'a',
                    { onClick: this.changePage, 'class': this.state.pagination == thej ? "paginationcolor btn btn-primary" : "paginationnocolor btn" },
                    thej
                ));
            }
            if (this.state.newdata["data"] == null) {
                console.log("looking to hire");
            } else {
                for (var i = 0; i < this.state.newdata["data"].length; i++) {
                    console.log("we wil lcccc", this.props.data["data"][i]);
                    rows.push(React.createElement(InboxFeedRows, {
                        id: this.state.newdata["data"][i].id,
                        name: this.props.data["type"] == "inbox" ? this.state.newdata["data"][i].username_influencer : this.state.newdata["data"][i].username,
                        giftornot: this.state.newdata["data"][i].typeintro,
                        whatoccasion: this.state.newdata["data"][i].typeoccasion,
                        completed: this.state.newdata["data"][i].completed,
                        duedate: this.state.newdata["data"][i].duedate,
                        type: this.state.newdata["type"],
                        influencer_pic: this.state.newdata["data"][i].influencer_pic,
                        normal_pic: this.state.newdata["data"][i].normal_pic }));
                }
            }

            if (this.state.pagination == null) {
                this.setState({
                    pagination: 1
                });
            }

            console.log("WAKU WAKU", this.state.newdata["data"]);
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mb-5' },
                    this.state.newdata["type"] == "request" ? React.createElement(
                        'button',
                        { id: 'hidecompletedid', value: this.state.hide, 'class': 'btn btn-primary', onClick: this.hideCompleted },
                        this.state.hide
                    ) : null
                ),
                this.state.newdata["data"] != "" ? React.createElement(
                    'div',
                    { 'class': 'inboxtable d-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'columninbox d-flex justify-content-center flex-column' },
                        rows
                    )
                ) : React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h6',
                        null,
                        React.createElement(
                            'h4',
                            null,
                            '\u0E22\u0E31\u0E27\u0E44\u0E21\u0E48\u0E21\u0E35 Request'
                        ),
                        React.createElement(
                            'h4',
                            null,
                            'Share hai khon eunn '
                        )
                    )
                ),
                rows != "" ? React.createElement(
                    'div',
                    { 'class': 'paginationcss' },
                    this.props.data["num_pages"] != 0 ? React.createElement(
                        'ul',
                        { 'class': 'pagination container justify-content-center mt-3' },
                        this.state.pagination != 1 ? React.createElement(
                            'a',
                            { id: this.state.pagination, 'class': 'nextbutton btn', onClick: this.changePage },
                            'Previous'
                        ) : null,
                        button,
                        this.state.pagination != this.props.data["num_pages"] ? React.createElement(
                            'a',
                            { id: this.state.pagination, 'class': 'nextbutton btn', onClick: this.changePage },
                            'Next'
                        ) : null
                    ) : null
                ) : null
            );
        }
    }]);

    return InboxFeedInbox;
}(React.Component);

var InboxFeedTitle = function (_React$Component4) {
    _inherits(InboxFeedTitle, _React$Component4);

    function InboxFeedTitle(props) {
        _classCallCheck(this, InboxFeedTitle);

        var _this6 = _possibleConstructorReturn(this, (InboxFeedTitle.__proto__ || Object.getPrototypeOf(InboxFeedTitle)).call(this, props));

        _this6.changeFeedInbox = _this6.changeFeedInbox.bind(_this6);

        //document.querySelector('#maininfluencer').hidden = false;
        //document.querySelector('#reviewsmainfluencer').hidden = true;

        return _this6;
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
            } else if (e.target.id == "myrequestid") {
                document.querySelector('#typeofpage').value = "request";
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;

                type = "myrequesthtml";
            } else {
                document.querySelector('#typeofpage').value = "request";
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;
                document.querySelector('#hiderequesthtml').hidden = false;

                type = "myrequesthtml";
            }
            var paginationid = 1;
            fetch('/gotozjguen484s9gj302g/' + paginationid, {
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
                ReactDOM.render(React.createElement(InboxFeedInbox, { data: data }), document.querySelector('#' + type));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            //<select>
            // <option value="1">Newest</option>
            // <option value="2">Oldest</option>      
            //</select>

            return React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center mb-2' },
                React.createElement(
                    'span',
                    null,
                    React.createElement('a', { id: 'myinboxid', onClick: this.changeFeedInbox, 'class': 'myinboxcss' })
                ),
                this.props.data["checkifinfluencer"] == true ? React.createElement(
                    'span',
                    null,
                    React.createElement('a', { id: 'myrequestid', onClick: this.changeFeedInbox, 'class': 'requestcss' })
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
    var paginationid = 1;

    fetch('/gotozjguen484s9gj302g/' + paginationid).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("gimme data", data);
        ReactDOM.render(React.createElement(InboxFeedTitle, { data: data }), document.querySelector('#inboxmainid'));
        ReactDOM.render(React.createElement(InboxFeedInbox, { data: data }), document.querySelector('#myinboxhtml'));
    });
});