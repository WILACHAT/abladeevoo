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
    var checkoccasion = "";
    if (occasion == "birthday_html_id") {
        checkoccasion = "วันเกิด";
    } else if (occasion == "peptalk_html_id") {
        checkoccasion = "กําลังใจ";
    } else if (occasion == "roastbutton_html_id") {
        checkoccasion = "เผา";
    } else {
        checkoccasion = "อื่นๆ";
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
        _this.reportButton = _this.reportButton.bind(_this);
        _this.deleteRequest = _this.deleteRequest.bind(_this);

        _this.overlayCancel = _this.overlayCancel.bind(_this);
        _this.submitReport = _this.submitReport.bind(_this);
        _this.checkStar = _this.checkStar.bind(_this);

        return _this;
    }

    _createClass(EachReserve, [{
        key: 'deleteRequest',
        value: function deleteRequest(id) {
            var _this2 = this;

            Swal.fire({
                title: '<strong>คุณกําลังจะกดไม่ทําการสั่งซื้อนี้ของแฟนคลับ</strong>',
                icon: 'info',
                html: 'คุณมั่นใจว่าจะ <b>ไม่ทํา</b> รีเควสของแฟนคนนี้ <br><br>(แฟนคลับจะได้รับเงินคืน)',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'มั่นใจ',
                cancelButtonText: 'ยกเลิก'
            }).then(function (result) {
                var getcooked = getCookie('csrftoken');
                var type = "";
                if (result["isConfirmed"] == true) {

                    fetch('/gotoeachreserve', {
                        method: 'PUT',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            type: "deleterequest",
                            reservationid: _this2.props.data["data"][0].id,
                            requester: _this2.props.data["data"][0].username,
                            influencer: _this2.props.data["data"][0].username_influencer
                        })
                    }).then(function (result) {
                        document.querySelector('#myinboxhtml').hidden = true;
                        document.querySelector('#myrequesthtml').hidden = false;
                        document.querySelector('#mycompletehtml').hidden = true;
                        document.querySelector('#eachreserve').hidden = true;
                        document.querySelector('#inboxmainid').hidden = false;

                        for (var i = 0; i < document.getElementById('inboxtableid').children.length; i++) {
                            if (document.getElementById('inboxtableid').children[i].id == id) {
                                document.getElementById('inboxtableid').children[i].remove();
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: 'checkStar',
        value: function checkStar(e) {
            var rest = 0;
            var myarray = e.target.id.split("", 5);

            var stars = parseInt(myarray[4]);

            for (var i = 1; i < stars + 1; i++) {
                document.querySelector('#star' + i).className = "fa fa-star checked";
                rest = i;
            }

            rest = rest + 1;
            for (var j = rest; j < 6; j++) {
                document.querySelector('#star' + j).className = "fa fa-star unchecked";
            }
        }
    }, {
        key: 'submitReport',
        value: function submitReport(id) {
            var _this3 = this;

            Swal.fire({
                title: '<strong>คุณกําลังจะกดรีพอร์ตคําสั่งซื้อนี้</strong>',
                icon: 'info',
                html: 'คุณมั่นใจว่าจะ <b>รีพอร์ต</b> รีเควสนี้ <br><br>(คนที่รีเควสจะไม่ได้รับเงินคืน)',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'มั่นใจ',
                cancelButtonText: 'ยกเลิก'
            }).then(function (result) {
                var type = "";
                if (result["isConfirmed"] == true) {

                    var getcooked = getCookie('csrftoken');

                    fetch('/gotoeachreserve', {
                        method: 'PUT',
                        headers: { 'X-CSRFToken': getcooked },
                        body: JSON.stringify({
                            value: document.querySelector('#reportinputid').value,
                            type: "report",
                            reservationid: _this3.props.data["data"][0].id,
                            requester: _this3.props.data["data"][0].username,
                            influencer: _this3.props.data["data"][0].username_influencer
                        })
                    }).then(function (result) {
                        document.querySelector('#reportinputid').value = "";

                        document.querySelector('#overlayreportid').hidden = true;
                        document.querySelector('#myinboxhtml').hidden = true;
                        document.querySelector('#myrequesthtml').hidden = false;
                        document.querySelector('#mycompletehtml').hidden = true;
                        document.querySelector('#eachreserve').hidden = true;
                        document.querySelector('#inboxmainid').hidden = false;

                        for (var i = 0; i < document.getElementById('inboxtableid').children.length; i++) {
                            if (document.getElementById('inboxtableid').children[i].id == id) {
                                document.getElementById('inboxtableid').children[i].remove();
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: 'overlayCancel',
        value: function overlayCancel(e) {
            document.querySelector('#reportinputid').value = "";
            document.querySelector('#overlayreportid').hidden = true;
        }
    }, {
        key: 'reportButton',
        value: function reportButton(e) {
            document.querySelector('#overlayreportid').hidden = false;
        }
    }, {
        key: 'saveUrl',
        value: function saveUrl(e) {
            var content = e.target.value;
            if (!navigator.clipboard) {
                return;
            }

            navigator.clipboard.writeText(content).then(function () {
                Swal.fire({
                    title: 'คัดลอกวีดีโอเรียบร้อย!',
                    showConfirmButton: false,

                    timer: 500

                });
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

            if (checker != 'video') {
                Swal.fire({
                    icon: 'error',
                    text: 'ต้องเป็นวีดีโอแต่ดันอัพโหลดรูป'
                });
            } else {
                var formData = new FormData();
                formData.append("media", fileinput);
                Swal.fire({
                    icon: 'info',
                    title: 'กําลังเซฟวีดีโอ',
                    text: 'กรุณาอย่ากดออกหรือรีเฟรชจากหน้านี้จนกว่าจะมีข้อความสําเร็จ อาจจะใช้เวลานาน'
                });

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
                    Swal.fire({
                        icon: 'success',
                        title: 'สําเร็จ!',
                        text: '*คุณต้องกดอัพโหลดถึงจะส่งวีดีโอไปให้แฟนคลับ*'
                    });
                });
            }
        }
    }, {
        key: 'goBack',
        value: function goBack(e) {

            document.querySelector('#eachreserve').hidden = true;
            document.querySelector('#inboxmainid').hidden = false;

            if (document.querySelector('#typeofpage').value == "request") {

                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;
                document.querySelector('#mycompletehtml').hidden = true;
            } else if (document.querySelector('#typeofpage').value == "inbox") {
                document.querySelector('#myinboxhtml').hidden = false;
                document.querySelector('#myrequesthtml').hidden = true;
                document.querySelector('#mycompletehtml').hidden = true;
            } else {
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = true;
                document.querySelector('#mycompletehtml').hidden = false;
            }
        }
    }, {
        key: 'submitSave',
        value: function submitSave(e) {
            //sending vdo and stuff gor ja yhu trong nee (this is just the message)
            var value = document.querySelector('#sendingbacktorequest').value;
            var reserveid = this.props.data["data"][0].id;
            var videoid = document.querySelector('#sendingvideoidback').name;
            if (videoid != "") {
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
                    Swal.fire({
                        title: 'สําเร็จ!',
                        showCancelButton: false,
                        showConfirmButton: false

                    });
                    setTimeout(function () {
                        window.location.href = "/inbox";
                    }, 800);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'คุณยังไม่ได้อัพโหลดวีดีโอ'

                });
            }
        }
    }, {
        key: 'submitReview',
        value: function submitReview(e) {

            var getcooked = getCookie('csrftoken');
            var value = document.querySelector('#typeforreview').value;
            if (value == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'คุณยังไม่ได้เขียนรีวิว'
                });
            } else {
                var _JSON$stringify;

                var reserveid = this.props.data["data"][0].id;

                var influencername = this.props.data["data"][0].username_influencer;

                var selectreview = 5;
                var count = 0;
                for (var i = 0; i < document.querySelector('#starboss').children.length; i++) {
                    var checker = document.querySelector('#starboss').children[i].className.split(" ")[2];
                    if (checker == "checked") {
                        count += 1;
                    }
                }
                selectreview = count;

                fetch('/gotoeachreserve', {
                    method: 'POST',
                    headers: { 'X-CSRFToken': getcooked },
                    body: JSON.stringify((_JSON$stringify = {
                        value: value,
                        reserveid: reserveid,
                        influencername: influencername }, _defineProperty(_JSON$stringify, 'influencername', influencername), _defineProperty(_JSON$stringify, 'type', "submitreview"), _defineProperty(_JSON$stringify, 'reviewstars', selectreview), _JSON$stringify))
                }).then(function (result) {
                    Swal.fire({
                        title: 'สําเร็จ!',
                        showCancelButton: false

                    });
                    setTimeout(function () {
                        window.location.href = "/inbox";
                    }, 800);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var videoandstuff = "";
            link = "https://res.cloudinary.com/ablaze-project/video/upload/l_9687f7ee-e194-11ec-a149-3af9d3ce8c1e1.png,w_160,h_60,g_south_west/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";
            // https://res.cloudinary.com/demo/video/upload/l_cloudinary_icon,w_70,h_70,g_north_west/abbey_road.mp4
            videoandstuff = React.createElement(
                'div',
                { id: 'videowhengetid' },
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
                                { autoplay: 'true', muted: 'true', id: 'testervideo', 'class': 'videovideowhenget', controls: true },
                                React.createElement('source', { type: 'video/mp4', src: link }),
                                'Your browser does not support the video tag.'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'beforesavethelink d-flex justify-content-center mt-2' },
                            React.createElement(
                                'button',
                                { id: 'savethelink', value: link, onClick: this.saveUrl, 'class': 'btn registerbtnsavelink' },
                                '\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D'
                            )
                        )
                    )
                )
            );

            //FOUND IT THIS IF IS MEGA WRONG
            var postoption = "";
            if (document.querySelector('#typeofpage').value == "request" || document.querySelector('#typeofpage').value == "completed") {
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
                                    { 'class': 'custom-file' },
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center mt-3' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'chooseprofile4label', 'for': 'inputGroupFile01' },
                                            '\u0E01\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E17\u0E35\u0E48\u0E08\u0E30\u0E2A\u0E48\u0E07\u0E43\u0E2B\u0E49\u0E41\u0E1F\u0E19\u0E04\u0E25\u0E31\u0E1A',
                                            React.createElement('input', { type: 'file', onChange: this.chooseFile, 'class': 'chooseprofile1', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' })
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'video',
                                        { autoplay: 'true', muted: 'true', hidden: true, id: 'testervideo', 'class': 'videovideowhenget', controls: true },
                                        React.createElement('source', { type: 'video/mp4', src: link }),
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
                                React.createElement('input', { 'class': 'inputheho', id: 'sendingbacktorequest' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-3 mb-5' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn registerbtnforupload', onClick: this.submitSave, id: 'submitrequested' },
                                    '\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14'
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
                            { 'class': 'beforedonetitle' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex flex-column' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h1',
                                        { 'class': 'biggersarabun' },
                                        '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19!'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'a',
                                        { href: '#videowhengetid', 'class': 'sarabun' },
                                        '\u0E01\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E1B\u0E14\u0E39\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { 'class': 'donetitle' }),
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
                        { 'class': 'mb-5 d-flex justify-content-center' },
                        React.createElement(
                            'div',
                            { 'class': 'waitingforstar' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E14\u0E4D\u0E32\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E4D\u0E32\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E17\u0E35\u0E48\u0E19\u0E48\u0E32\u0E08\u0E14\u0E08\u0E4D\u0E32\u0E02\u0E2D\u0E07\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48'
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
                            { 'class': 'beforedonetitle' },
                            React.createElement(
                                'div',
                                { 'class': 'd-flex flex-column' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h1',
                                        { 'class': 'biggersarabun' },
                                        '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19!'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'a',
                                        { href: '#videowhengetid', 'class': 'sarabun' },
                                        '\u0E01\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E1B\u0E14\u0E39\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { 'class': 'donetitle' }),
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
                                    '\u0E40\u0E02\u0E35\u0E22\u0E19\u0E23\u0E35\u0E27\u0E34\u0E27\u0E41\u0E25\u0E30\u0E43\u0E2B\u0E49\u0E14\u0E32\u0E27\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E04\u0E19\u0E42\u0E1B\u0E23\u0E14\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13'
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'starboss', 'class': 'd-flex justify-content-center mt-3' },
                                React.createElement('span', { id: 'star1', onClick: this.checkStar, 'class': 'fa fa-star checked' }),
                                React.createElement('span', { id: 'star2', onClick: this.checkStar, 'class': 'fa fa-star checked' }),
                                React.createElement('span', { id: 'star3', onClick: this.checkStar, 'class': 'fa fa-star checked' }),
                                React.createElement('span', { id: 'star4', onClick: this.checkStar, 'class': 'fa fa-star checked' }),
                                React.createElement('span', { id: 'star5', onClick: this.checkStar, 'class': 'fa fa-star checked' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2 mb-3' },
                                React.createElement('input', { maxlength: '250', 'class': 'inputhehorere', id: 'typeforreview', placeholder: '\u0E23\u0E35\u0E27\u0E34\u0E27' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mb-5' },
                                React.createElement(
                                    'button',
                                    { onClick: this.submitReview, 'class': 'btn btn-primary' },
                                    '\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01'
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
            if (occasion == "วันเกิด") {
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
                                { 'class': 'wainfosaywhat' },
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
            } else if (occasion == "กําลังใจ") {
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
            } else if (occasion == "เผา") {
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

            var link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";

            if (document.querySelector('#typeofpage').value == "inbox") {
                if (this.props.data["data"][0].influencer_pic != null) {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].influencer_pic + ".jpg";
                } else {
                    link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
                }
            } else {
                if (this.props.data["data"][0].normal_pic != null) {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].normal_pic + ".jpg";
                } else {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";
                }
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { hidden: true, id: 'overlayreportid', 'class': 'overlayreport' },
                    React.createElement(
                        'div',
                        { 'class': 'd-flex flex-column' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'label',
                                null,
                                'Report'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement('input', { 'class': 'inputhehore', id: 'reportinputid', placeholder: '\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2D\u0E30\u0E44\u0E23' })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2' },
                            React.createElement(
                                'button',
                                { onClick: function onClick() {
                                        return _this4.submitReport(_this4.props.id);
                                    }, 'class': 'btn btn-primary mr-2' },
                                '\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19'
                            ),
                            React.createElement(
                                'button',
                                { onClick: this.overlayCancel, 'class': 'btn btn-danger' },
                                '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'button',
                        { 'class': 'backbutton btn btn-primary mb-3', onClick: this.goBack },
                        '\u0E01\u0E25\u0E31\u0E1A'
                    ),
                    this.props.data["type"] == "request" ? React.createElement(
                        'button',
                        { 'class': 'backbutton btn btn-danger mb-3 ml-3', onClick: this.reportButton },
                        '\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19'
                    ) : null,
                    this.props.data["type"] == "request" ? React.createElement(
                        'button',
                        { 'class': 'backbutton btn btn-danger mb-3 ml-3', onClick: function onClick() {
                                return _this4.deleteRequest(_this4.props.id);
                            } },
                        '\u0E44\u0E21\u0E48\u0E17\u0E4D\u0E32'
                    ) : null
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
                                        '\u0E16\u0E36\u0E07: '
                                    ),
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wainfo' },
                                        this.props.data["data"][0].tointro
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wa' },
                                        '\u0E08\u0E32\u0E01: '
                                    ),
                                    React.createElement(
                                        'h4',
                                        { 'class': 'wainfo' },
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

        var _this5 = _possibleConstructorReturn(this, (InboxFeedRows.__proto__ || Object.getPrototypeOf(InboxFeedRows)).call(this, props));

        _this5.clickHref = _this5.clickHref.bind(_this5);

        return _this5;
    }

    _createClass(InboxFeedRows, [{
        key: 'clickHref',
        value: function clickHref(id) {

            document.querySelector('#eachreserve').hidden = false;
            document.querySelector('#inboxmainid').hidden = true;
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#mycompletehtml').hidden = true;

            document.querySelector('#myrequesthtml').hidden = true;

            var getcooked = getCookie('csrftoken');
            var paginationid = 1;
            fetch('/gotozjguen484s9gj302g/' + paginationid, {
                method: 'PUT',
                headers: { 'X-CSRFToken': getcooked },
                body: JSON.stringify({
                    reservationid: this.props.id,
                    from: "eachreserve",
                    type: this.props.type
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                ReactDOM.render(React.createElement(EachReserve, { data: data, id: id }), document.querySelector('#eachreserve'));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var eachcontent = "";

            var today = new Date().toISOString().slice(0, 10);

            var checktime = 0;
            if (this.props.duedate != null || this.props.dudedate != "") {
                if (today > this.props.duedate) {
                    checktime = 1;
                }
            }

            var link = "";

            //this will 
            if (this.props.type == "request" || this.props.type == "complete") {
                if (this.props.normal_pic == null) {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";
                } else {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.normal_pic + ".jpg";
                }
            } else {
                if (this.props.influencer_pic == null) {
                    link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
                } else {
                    link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.influencer_pic + ".jpg";
                }
            }

            var occasion = checkforoccasiontype(this.props.whatoccasion);
            var id = this.props.id + "eachrow";

            eachcontent = React.createElement(
                'div',
                { 'class': 'okseecolor' },
                React.createElement(
                    'div',
                    { 'class': 'randomdesign d-flex justify-content-between' },
                    React.createElement(
                        'div',
                        { 'class': 'fakimgnoeditinbox d-flex justify-content-start ml-3' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('img', { 'class': 'imgnoeditinbox', src: link })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column yeathename mt-2' },
                            React.createElement(
                                'a',
                                { 'class': 'nameininbox' },
                                this.props.name
                            ),
                            React.createElement(
                                'h4',
                                { 'class': 'wanameinbox mt-2' },
                                this.props.giftornot == "someoneelse_html_id" ? "ของขวัญ" : "ตัวเอง"
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
                                { 'class': 'waoccasion' },
                                occasion
                            )
                        ),
                        React.createElement(
                            'div',
                            { onClick: function onClick() {
                                    return _this6.clickHref(id);
                                }, 'class': 'button', id: 'button-7' },
                            React.createElement('input', { type: 'hidden', id: 'divtogetid', value: this.props.id }),
                            React.createElement(
                                'div',
                                { value: this.props.id, 'class': 'dub-arrow' },
                                React.createElement('img', { src: 'https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true', alt: '' })
                            ),
                            React.createElement(
                                'a',
                                { 'class': 'letsgo', href: '#' },
                                '\u0E40\u0E02\u0E49\u0E32\u0E0A\u0E21'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-1' },
                    this.props.completed == true ? React.createElement(
                        'h6',
                        { 'class': 'waduedatecomplete mt-3' },
                        '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                    ) : checktime == 0 ? React.createElement(
                        'div',
                        { 'class': 'inboxtroublesome mt-1 ml-2' },
                        React.createElement(
                            'h6',
                            { 'class': 'waduedate' },
                            ' \u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mb-5' },
                            React.createElement(
                                'h6',
                                { 'class': 'waduedate' },
                                '\u0E2A\u0E48\u0E07\u0E01\u0E48\u0E2D\u0E19:'
                            ),
                            React.createElement(
                                'h6',
                                { 'class': 'waduedate' },
                                this.props.duedate
                            )
                        )
                    ) : React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                            'h4',
                            { 'class': 'waduedateexpire' },
                            '\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38'
                        )
                    )
                )
            );

            return React.createElement(
                'div',
                { id: id, 'class': 'd-flex justify-content-center' },
                React.createElement(
                    'div',
                    { 'class': 'ineachrow mt-4 mb-4' },
                    this.props.type == "inbox" ? eachcontent : this.props.completed == true ? eachcontent : checktime == 1 ? null : eachcontent
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

        var _this7 = _possibleConstructorReturn(this, (InboxFeedInbox.__proto__ || Object.getPrototypeOf(InboxFeedInbox)).call(this, props));

        _this7.changePage = _this7.changePage.bind(_this7);
        _this7.hideCompleted = _this7.hideCompleted.bind(_this7);
        _this7.sortTime = _this7.sortTime.bind(_this7);

        _this7.state = {
            newdata: _this7.props.data,
            hide: "ซ่อนเสร็จสิ้น",
            sort: "เรียงตามวันครบกําหนด",
            rowsstate: []

        };
        return _this7;
    }

    _createClass(InboxFeedInbox, [{
        key: 'sortTime',
        value: function sortTime(e) {
            var _this8 = this;

            var type = "mysorttime";
            var csrftoken = getCookie('csrftoken');

            if (e.target.value == "เรียงตามวันครบกําหนด") {
                type = "mysorttime";
            } else {
                type = "myrequesthtml";
            }

            fetch('/gotozjguen484s9gj302g/' + this.state.newdata["paginationid"], {
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
                var sort = "";

                if (data["sort"] == 0) {
                    sort = "เรียงตามวันครบกําหนด";
                } else {
                    sort = "เลิกเรียงลัาดับ";
                }

                _this8.setState({
                    newdata: data,
                    sort: sort
                });
            });
        }
    }, {
        key: 'hideCompleted',
        value: function hideCompleted(e) {
            var _this9 = this;

            var type = "";

            var csrftoken = getCookie('csrftoken');

            if (e.target.value == "เลิกซ่อน") {
                type = "myinboxhtml";
            } else {
                type = "hidecompleted";
            }

            //might have to be an if here
            fetch('/gotozjguen484s9gj302g/' + 1, {
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

                var hide = "";
                if (data["hide"] == 0) {
                    hide = "ซ่อนเสร็จสิ้น";
                } else {
                    hide = "เลิกซ่อน";
                }

                _this9.setState({
                    newdata: data,
                    hide: hide,
                    pagination: data["paginationid"]

                });
            });
        }
    }, {
        key: 'changePage',
        value: function changePage(e) {
            var _this10 = this;

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
                if (this.state.sort == "เรียงตามวันครบกําหนด") {
                    type = "myrequesthtml";
                } else {
                    type = "mysorttime";
                }
            } else if (this.props.data["type"] == "complete") {
                type = "mycompletehtml";
            } else {
                if (this.state.hide == "ซ่อนเสร็จสิ้น") {
                    type = "myinboxhtml";
                } else {
                    type = "hidecompleted";
                }
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
                _this10.setState({
                    newdata: data

                });

                _this10.setState({
                    pagination: _this10.state.newdata["paginationid"]
                });
            });

            window.scrollTo(0, 0);
        }
    }, {
        key: 'render',
        value: function render() {

            var button = [];
            var rows = [];

            var paginationid = this.props.data["paginationid"];

            for (var j = 0; j < this.state.newdata["num_pages"]; j++) {
                var thej = j + 1;
                button.push(React.createElement(
                    'a',
                    { onClick: this.changePage, 'class': this.state.pagination == thej ? "paginationcolor btn" : "paginationnocolor btn" },
                    thej
                ));
            }
            if (this.state.newdata["data"] == null) {
                console.log("looking to hire");
            } else {

                for (var i = 0; i < this.state.newdata["data"].length; i++) {
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

            var gotoindex = "/";
            var gotoaboutus = "/aboutus";

            return React.createElement(
                'div',
                { 'class': 'coversalldiv' },
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    this.state.newdata["type"] == "inbox" ? React.createElement(
                        'button',
                        { id: 'hidecompletedid', value: this.state.hide, 'class': 'sortbutton btn', onClick: this.hideCompleted },
                        this.state.hide
                    ) : null,
                    this.state.newdata["type"] == "request" ? React.createElement(
                        'button',
                        { 'class': 'sortbutton btn', value: this.state.sort, onClick: this.sortTime },
                        this.state.sort
                    ) : null
                ),
                this.state.newdata["data"] != "" ? React.createElement(
                    'div',
                    { 'class': 'inboxtable d-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { id: 'inboxtableid', 'class': 'columninbox d-flex justify-content-center flex-column' },
                        rows
                    )
                ) : React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'norequestdiv' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            this.state.newdata["type"] == "inbox" ? React.createElement(
                                'div',
                                { 'class': 'noorderyet' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center' },
                                            React.createElement(
                                                'h1',
                                                { 'class': 'waheading' },
                                                '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E43\u0E19\u0E2D\u0E34\u0E19\u0E1A\u0E47\u0E2D\u0E01\u0E0B\u0E4C'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center mt-4' },
                                            React.createElement(
                                                'h4',
                                                { 'class': 'waa mr-3' },
                                                '\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E15\u0E32\u0E23\u0E4C: '
                                            ),
                                            React.createElement(
                                                'a',
                                                { href: gotoindex, 'class': 'wae' },
                                                '\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01'
                                            ),
                                            '                                        '
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center' },
                                            React.createElement(
                                                'h4',
                                                { 'class': 'waa mt-3' },
                                                '\u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21: vidma@vidma.tv'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center mt-4' },
                                            React.createElement(
                                                'h4',
                                                { 'class': 'waa mr-3' },
                                                '\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21: '
                                            ),
                                            React.createElement(
                                                'a',
                                                { href: gotoaboutus, 'class': 'wae' },
                                                '\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E40\u0E23\u0E32'
                                            )
                                        )
                                    )
                                )
                            ) : React.createElement(
                                'div',
                                { 'class': 'noorderyet' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex justify-content-center' },
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center' },
                                            React.createElement(
                                                'h1',
                                                { 'class': 'waheading' },
                                                '\u0E04\u0E38\u0E13\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E43\u0E19\u0E23\u0E35\u0E40\u0E04\u0E27\u0E2A\u0E17\u0E4C'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center mt-4' },
                                            React.createElement(
                                                'h2',
                                                { 'class': 'waa mt-2' },
                                                '\u0E40\u0E0A\u0E34\u0E0D\u0E0A\u0E27\u0E19\u0E41\u0E1F\u0E19\u0E04\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E40\u0E25\u0E22!'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center' },
                                            React.createElement(
                                                'h4',
                                                { 'class': 'waa mt-3' },
                                                '\u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21: vidma@vidma.tv'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'd-flex justify-content-center mt-4' },
                                            React.createElement(
                                                'h4',
                                                { 'class': 'waa mt-3 mr-3' },
                                                '\u0E2D\u0E48\u0E32\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E01\u0E0F\u0E2B\u0E21\u0E32\u0E22:'
                                            ),
                                            React.createElement(
                                                'a',
                                                { href: '/legal', 'class': 'wae mt-3' },
                                                '\u0E01\u0E0F\u0E2B\u0E21\u0E32\u0E22'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                rows != "" ? React.createElement(
                    'div',
                    { 'class': 'paginationcss' },
                    this.state.newdata["num_pages"] != 0 ? React.createElement(
                        'ul',
                        { 'class': 'pagination justify-content-center mt-3' },
                        this.state.pagination > 1 ? React.createElement(
                            'a',
                            { id: this.state.pagination, 'class': 'nextbutton btn', onClick: this.changePage },
                            'Previous'
                        ) : null,
                        button,
                        this.state.pagination != this.state.newdata["num_pages"] ? React.createElement(
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

        var _this11 = _possibleConstructorReturn(this, (InboxFeedTitle.__proto__ || Object.getPrototypeOf(InboxFeedTitle)).call(this, props));

        _this11.changeFeedInbox = _this11.changeFeedInbox.bind(_this11);
        _this11.state = {
            currentpage: "myinbox"

            //document.querySelector('#maininfluencer').hidden = false;
            //document.querySelector('#reviewsmainfluencer').hidden = true;

        };return _this11;
    }

    _createClass(InboxFeedTitle, [{
        key: 'changeFeedInbox',
        value: function changeFeedInbox(e) {
            var type = "";
            var csrftoken = getCookie('csrftoken');
            if (e.target.id == "myinboxid") {
                try {
                    document.getElementById('requesttableid').id = "inboxtableid";
                } catch (err) {}

                document.querySelector('#typeofpage').value = "inbox";
                document.querySelector('#myrequesthtml').hidden = true;
                document.querySelector('#mycompletehtml').hidden = true;

                document.querySelector('#myinboxhtml').hidden = false;

                type = "myinboxhtml";
                this.setState({
                    currentpage: "myinbox"
                });
            } else if (e.target.id == "myrequestid") {
                try {
                    document.getElementById('inboxtableid').id = "requesttableid";
                } catch (err) {}
                document.querySelector('#typeofpage').value = "request";
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = false;
                document.querySelector('#mycompletehtml').hidden = true;

                type = "myrequesthtml";
                this.setState({
                    currentpage: "myrequest"
                });
            } else if (e.target.id == "mycompleteid") {
                try {
                    document.getElementById('requesttableid').id = "inboxtableid";
                } catch (err) {}
                document.querySelector('#typeofpage').value = "completed";
                document.querySelector('#mycompletehtml').hidden = false;
                document.querySelector('#myinboxhtml').hidden = true;
                document.querySelector('#myrequesthtml').hidden = true;

                type = "mycompletehtml";
                this.setState({
                    currentpage: "mycomplete"
                });
            } else {
                document.querySelector('#typeofpage').value = "request";
                document.querySelector('#myinboxhtml').hidden = false;
                document.querySelector('#myrequesthtml').hidden = true;
                document.querySelector('#mycompletehtml').hidden = true;

                type = "myinboxhtml";
                this.setState({
                    currentpage: "myinbox"
                });
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

            //you already create and if for the thing so no need yea just decide what kind of 
            //button you want to have
            return React.createElement(
                'div',
                { 'class': 'buttonchoicesinbox mb-2' },
                React.createElement(
                    'div',
                    { 'class': 'wangong' },
                    React.createElement(
                        'button',
                        { id: 'myinboxid', onClick: this.changeFeedInbox, 'class': this.state.currentpage == "myinbox" ? "myinboxclicked" : "myinboxcss" },
                        '\u0E2D\u0E34\u0E19\u0E1A\u0E47\u0E2D\u0E01\u0E0B\u0E4C'
                    )
                ),
                this.props.data["checkifinfluencer"] == true ? React.createElement(
                    'div',
                    { 'class': 'wangong' },
                    ' ',
                    React.createElement(
                        'button',
                        { id: 'myrequestid', onClick: this.changeFeedInbox, 'class': this.state.currentpage == "myrequest" ? "requestcssclicked" : "requestcss" },
                        '\u0E23\u0E35\u0E40\u0E04\u0E27\u0E2A'
                    )
                ) : null,
                this.props.data["checkifinfluencer"] == true ? React.createElement(
                    'div',
                    { 'class': 'wangong' },
                    React.createElement(
                        'button',
                        { id: 'mycompleteid', onClick: this.changeFeedInbox, 'class': this.state.currentpage == "mycomplete" ? "completecssclicked" : "completecss" },
                        '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19'
                    )
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
        ReactDOM.render(React.createElement(InboxFeedTitle, { data: data }), document.querySelector('#inboxmainid'));
        ReactDOM.render(React.createElement(InboxFeedInbox, { data: data }), document.querySelector('#myinboxhtml'));
    });
});