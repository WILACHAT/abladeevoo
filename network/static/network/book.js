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

var BookPage = function (_React$Component) {
    _inherits(BookPage, _React$Component);

    function BookPage(props) {
        _classCallCheck(this, BookPage);

        var _this = _possibleConstructorReturn(this, (BookPage.__proto__ || Object.getPrototypeOf(BookPage)).call(this, props));

        _this.changeIntroReserve = _this.changeIntroReserve.bind(_this);
        _this.changeOccasionReserve = _this.changeOccasionReserve.bind(_this);
        _this.saveReserve = _this.saveReserve.bind(_this);
        _this.onType = _this.onType.bind(_this);

        document.querySelector('#paymentpage').hidden = true;

        //the number of steps can be state as well i believe
        _this.state = {
            reserve_into_html: React.createElement(
                'div',
                { name: 'introname', id: 'someoneelse_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { maxlength: '60', 'class': 'inputheho', required: true, id: 'from_intro', placeholder: '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23' })
                    )
                )
            ),
            reserve_occasion_html: React.createElement(
                'div',
                { name: 'occasionname', id: 'birthday_html_id' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E27\u0E31\u0E19\u0E2A\u0E4D\u0E32\u0E04\u0E31\u0E0D\u0E2D\u0E30\u0E44\u0E23'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { maxlength: '100', 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14, \u0E27\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E23\u0E2D\u0E1A, \u0E07\u0E32\u0E19\u0E1A\u0E27\u0E0A' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'label',
                            { 'class': 'wa' },
                            '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E27\u0E31\u0E19\u0E2A\u0E4D\u0E32\u0E04\u0E31\u0E0D'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { id: 'inputage1', maxlength: '100', 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 7 \u0E01\u0E23\u0E01\u0E0F\u0E32\u0E04\u0E21 \u0E02\u0E36\u0E49\u0E19 20 \u0E1B\u0E35, \u0E04\u0E23\u0E1A\u0E23\u0E2D\u0E1A\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 7 \u0E01\u0E23\u0E01\u0E0F\u0E32\u0E04\u0E21 \u0E02\u0E36\u0E49\u0E19 20 \u0E1B\u0E35' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column' },
                            React.createElement(
                                'label',
                                { 'class': 'wa' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49'
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'p',
                                    { id: 'daytext1', 'class': 'watsarabun' },
                                    '0'
                                ),
                                React.createElement(
                                    'p',
                                    { 'class': 'watsarabun' },
                                    '/250'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { maxlength: '250', 'data-yea': 'day1', onChange: _this.onType, 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E25\u0E07\u0E2A\u0E38\u0E02\u0E2A\u0E31\u0E19\u0E15\u0E4C\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E04\u0E33\u0E2D\u0E27\u0E22\u0E1E\u0E23' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex flex-column' },
                            React.createElement(
                                'label',
                                { 'class': 'wa' },
                                '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement(
                                    'p',
                                    { id: 'daytext2', 'class': 'watsarabun' },
                                    '0'
                                ),
                                React.createElement(
                                    'p',
                                    { 'class': 'watsarabun' },
                                    '/250'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement('input', { maxlength: '250', 'data-yea': 'day2', onChange: _this.onType, 'class': 'inputheho', id: 'optional/occa4', name: 'occa4', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
                    )
                )
            ),
            colorof1: "someoneelsehtml",
            colorof2: "birthday"
        };

        return _this;
    }

    _createClass(BookPage, [{
        key: 'onType',
        value: function onType(e) {
            console.log("yoyoyo");
            console.log("this is the targets", e);
            console.log("this is the targets", e.target.value);
            console.log("this is the targets", e.target.value.length);
            console.log("this is the targets", e.target.dataset.yea);
            if (e.target.dataset.yea == "gumlungjai1") {
                document.getElementById('gumlungjaitext1').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "gumlungjai2") {
                document.getElementById('gumlungjaitext2').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "pao1") {
                document.getElementById('paotext1').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "pao2") {
                document.getElementById('paotext2').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "other1") {
                document.getElementById('othertext1').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "other2") {
                document.getElementById('othertext2').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "day1") {
                document.getElementById('daytext1').innerHTML = e.target.value.length;
            } else if (e.target.dataset.yea == "day2") {
                document.getElementById('daytext2').innerHTML = e.target.value.length;
            }
        }
    }, {
        key: 'saveReserve',
        value: function saveReserve(e) {
            var typeintro = "";
            var tointro = "";
            var fromintro = "";
            var typeoccasion = "";
            var firstinputocca = "";
            var secondinputocca = "";
            var thirdinputocca = "";
            var fourthinputocca = "";
            var datetime = "";

            var checkblank = 0;

            var inputcheck = document.querySelector('#inputcheckid').checked;

            var checkerintro = document.getElementsByName("introname")[0].id;
            tointro = document.querySelector('#to_intro').value;

            typeintro = checkerintro;

            if (intro == "") {
                checkblank = 10;
            }

            if (checkerintro == "someoneelse_html_id") {
                fromintro = document.querySelector('#from_intro').value;
                if (fromintro == "") {
                    checkblank = 9;
                }
            }

            var checkeroccasion = document.getElementsByName("occasionname")[0].id;
            typeoccasion = checkeroccasion;

            firstinputocca = document.getElementsByName("occa1")[0].value;
            if (firstinputocca == "") {
                checkblank = 8;
            }

            secondinputocca = document.getElementsByName("occa2")[0].value;
            if (document.getElementsByName("occa2")[0].id == "") {
                if (secondinputocca == "") {
                    checkblank = 7;
                }
            }

            if (document.getElementsByName("occa3").length != 0) {
                if (document.getElementsByName("occa3")[0].id == "") {
                    thirdinputocca = document.getElementsByName("occa3")[0].value;
                    if (thirdinputocca == "") {
                        checkblank = 6;
                    }
                } else {
                    thirdinputocca = document.getElementsByName("occa3")[0].value;
                }
            }

            if (document.getElementsByName("occa4").length != 0) {
                console.log("fuck this in 4");
                if (document.getElementsByName("occa4")[0].id == "") {
                    fourthinputocca = document.getElementsByName("occa4")[0].value;
                    console.log("fourstinputocca", fourthinputocca);
                    console.log("ok what is going on", document.getElementsByName("occa4")[0].id);
                    if (fourthinputocca == "") {
                        checkblank = 5;
                    }
                } else {
                    fourthinputocca = document.getElementsByName("occa4")[0].value;
                }
            }

            var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
            datetime = document.getElementById('date_inputid').value;
            if (datetime == "") {
                checkblank = 4;
            }

            var today = new Date().toISOString().slice(0, 10);
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            console.log("this is today", today);
            tomorrow.toISOString().slice(0, 10);
            console.log("first tomorrow", tomorrow);

            var g1 = new Date(tomorrow);
            console.log("get time", g1.getTime());

            var g2 = new Date(datetime);

            if (g1.getTime() >= g2.getTime()) {
                checkblank = 2;
            }

            if (checkblank == 1) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกอย่างน้อย 1 ฟอร์ม'
                });
            } else if (checkblank == 10) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกฟอร์ม ถึงใคร'
                });
            } else if (checkblank == 9) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกฟอร์ม จากใคร'
                });
            } else if (checkblank == 8) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องแรก'
                });
            } else if (checkblank == 7) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสอง'
                });
            } else if (checkblank == 6) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสาม'
                });
            } else if (checkblank == 5) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกเนื่องในโอกาสช่องสี่'
                });
            } else if (checkblank == 4) {
                Swal.fire({
                    icon: 'error',
                    text: 'ลืมกรอกวันที่'
                });
            } else if (checkblank == 2) {
                Swal.fire({
                    icon: 'error',
                    text: 'วันที่ต้องมากกว่าวันที่กรอกฟอร์มอย่างน้อย 2 วัน'
                });
            } else {
                document.querySelector('#paymentpage').hidden = false;
                document.querySelector('#wholereservepage').hidden = true;
                document.querySelector('#realpayment').hidden = false;

                document.querySelector('#storevalueid').value = JSON.stringify({
                    typeintro: typeintro,
                    tointro: tointro,
                    fromintro: fromintro,
                    typeoccasion: typeoccasion,
                    firstinputocca: firstinputocca,
                    secondinputocca: secondinputocca,
                    thirdinputocca: thirdinputocca,
                    fourthinputocca: fourthinputocca,
                    datetime: datetime,
                    inputcheck: inputcheck
                });
                // ReactDOM.render(<PaymentPage data={data}/>, document.querySelector('#paymentpage'));
            }
        }
    }, {
        key: 'changeIntroReserve',
        value: function changeIntroReserve(e) {

            if (e.target.id == "someoneelsehtml") {
                console.log("is it someoneelsehtml");
                this.setState({
                    reserve_into_html: React.createElement(
                        'div',
                        { name: 'introname', id: 'someoneelse_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '60', 'class': 'inputheho', required: true, id: 'from_intro', placeholder: '\u0E08\u0E32\u0E01\u0E43\u0E04\u0E23' })
                            )
                        )
                    ),
                    colorof1: "someoneelsehtml"
                });
            } else {
                console.log("is it anotherpeoplehtml");
                this.setState({
                    reserve_into_html: React.createElement('div', { name: 'introname', id: 'myself_html_id' }),
                    colorof1: "myselfhtml"
                });
            }
        }
    }, {
        key: 'changeOccasionReserve',
        value: function changeOccasionReserve(e) {

            try {
                document.getElementsByName("occa1")[0].value = "";
            } catch (err) {}

            try {
                document.getElementsByName("occa2")[0].value = "";
            } catch (err) {}

            try {
                document.getElementsByName("occa3")[0].value = "";
            } catch (err) {}

            try {
                document.getElementsByName("occa4")[0].value = "";
            } catch (err) {}

            try {
                document.getElementById('gumlungjaitext1').innerHTML = "0";
            } catch (err) {}

            try {
                document.getElementById('gumlungjaitext2').innerHTML = "0";
            } catch (err) {}

            try {
                document.getElementById('paotext1').innerHTML = "0";
            } catch (err) {}

            try {
                document.getElementById('paotext2').innerHTML = "0";
            } catch (err) {}
            try {
                document.getElementById('othertext1').innerHTML = "0";
            } catch (err) {}
            try {
                document.getElementById('othertext2').innerHTML = "0";
            } catch (err) {}
            try {
                document.getElementById('daytext1').innerHTML = "0";
            } catch (err) {}
            try {
                document.getElementById('daytext2').innerHTML = "0";
            } catch (err) {}

            console.log("this is e", e);
            if (e.target.id == "birthdaybutton") {
                console.log("birthday");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'birthday_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E27\u0E31\u0E19\u0E2A\u0E4D\u0E32\u0E04\u0E31\u0E0D\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '100', 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14, \u0E27\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E23\u0E2D\u0E1A, \u0E07\u0E32\u0E19\u0E1A\u0E27\u0E0A' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E27\u0E31\u0E19\u0E2A\u0E4D\u0E32\u0E04\u0E31\u0E0D'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'inputage1', maxlength: '100', 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E40\u0E01\u0E34\u0E14\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 7 \u0E01\u0E23\u0E01\u0E0F\u0E32\u0E04\u0E21 \u0E02\u0E36\u0E49\u0E19 20 \u0E1B\u0E35, \u0E04\u0E23\u0E1A\u0E23\u0E2D\u0E1A\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 7 \u0E01\u0E23\u0E01\u0E0F\u0E32\u0E04\u0E21 \u0E02\u0E36\u0E49\u0E19 20 \u0E1B\u0E35' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'daytext1', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'day1', onChange: this.onType, 'class': 'inputheho', required: true, name: 'occa3', placeholder: '\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E25\u0E07\u0E2A\u0E38\u0E02\u0E2A\u0E31\u0E19\u0E15\u0E4C\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E04\u0E33\u0E2D\u0E27\u0E22\u0E1E\u0E23' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'daytext2', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'day2', onChange: this.onType, 'class': 'inputheho', id: 'optional/occa4', name: 'occa4', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
                            )
                        )
                    ),
                    colorof2: "birthday"

                });
            } else if (e.target.id == "peptalkbutton") {
                console.log("peptalk");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'peptalk_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E17\u0E4D\u0E32\u0E44\u0E21\u0E16\u0E36\u0E07\u0E2D\u0E22\u0E32\u0E01\u0E44\u0E14\u0E49\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '100', 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E43\u0E2B\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E08 \u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E17\u0E33\u0E07\u0E32\u0E19' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23\u0E43\u0E2B\u0E49'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'gumlungjaitext1', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { id: 'inputgumlungjai1', 'data-yea': 'gumlungjai1', onChange: this.onType, maxlength: '250', 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E1E\u0E39\u0E14\u0E43\u0E2B\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E08 \u0E43\u0E2B\u0E49\u0E21\u0E35\u0E44\u0E1F\u0E17\u0E33\u0E07\u0E32\u0E19' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'gumlungjaitext2', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { 'data-yea': 'gumlungjai2', onChange: this.onType, maxlength: '250', id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' }),
                                React.createElement('br', null)
                            )
                        )
                    ),
                    colorof2: "peptalk"

                });
            } else if (e.target.id == "roastbutton") {
                console.log("roast");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'roastbutton_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E25\u0E49\u0E2D\u0E40\u0E25\u0E35\u0E22\u0E19\u0E27\u0E48\u0E32\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23\u0E1A\u0E49\u0E32\u0E07'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'paotext1', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'pao1', onChange: this.onType, 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E25\u0E49\u0E2D\u0E40\u0E25\u0E35\u0E22\u0E19\u0E43\u0E2B\u0E49\u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E15\u0E34\u0E27\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'paotext2', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'pao2', onChange: this.onType, id: 'optional/occa2', 'class': 'inputheho', name: 'occa2', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
                            )
                        )
                    ),
                    colorof2: "roast"
                });
            } else {
                console.log("other lets go");
                this.setState({
                    reserve_occasion_html: React.createElement(
                        'div',
                        { name: 'occasionname', id: 'other_html_id' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2D\u0E30\u0E44\u0E23'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'class': 'inputheho', required: true, name: 'occa1', placeholder: '\u0E40\u0E23\u0E35\u0E22\u0E19\u0E08\u0E1A\u0E1B\u0E23\u0E34\u0E0D\u0E0D\u0E32\u0E15\u0E23\u0E35' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E43\u0E2B\u0E49\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E1E\u0E39\u0E14/\u0E17\u0E4D\u0E32\u0E2D\u0E30\u0E44\u0E23'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'othertext1', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'other1', onChange: this.onType, 'class': 'inputheho', required: true, name: 'occa2', placeholder: '\u0E2D\u0E27\u0E22\u0E1E\u0E23 \u0E41\u0E25\u0E30\u0E1E\u0E39\u0E14\u0E41\u0E2A\u0E14\u0E07\u0E04\u0E27\u0E32\u0E21\u0E22\u0E34\u0E19\u0E14\u0E35' })
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'div',
                                    { 'class': 'd-flex flex-column' },
                                    React.createElement(
                                        'label',
                                        { 'class': 'wa' },
                                        '\u0E2D\u0E22\u0E32\u0E01\u0E1A\u0E2D\u0E01\u0E2D\u0E30\u0E44\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21\u0E01\u0E31\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'd-flex justify-content-center' },
                                        React.createElement(
                                            'p',
                                            { id: 'othertext2', 'class': 'watsarabun' },
                                            '0'
                                        ),
                                        React.createElement(
                                            'p',
                                            { 'class': 'watsarabun' },
                                            '/250'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '250', 'data-yea': 'other2', onChange: this.onType, id: 'optional/occa3', 'class': 'inputheho', name: 'occa3', placeholder: '\u0E23\u0E2D\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E30!' })
                            )
                        )
                    ),
                    colorof2: "other"
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("this.state.colorof1", this.state.colorof1);
            var waan = { name: "val", name2: "val" };
            waan = JSON.stringify(waan);
            console.log(waan);

            //document.getElementById('dicttest').value = "waan"
            //console.log("checkery checkcheck", document.getElementById('dicttest').value)
            //console.log(Object.values(document.getElementById('dicttest').value))
            //console.log(Object.keys(document.getElementById('dicttest').value))


            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'intro', 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'bookdetails' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E32\u0E01\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49\u0E43\u0E04\u0E23: '
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-4 mb-5' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "someoneelsehtml" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'someoneelsehtml', onClick: this.changeIntroReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'someoneelsehtml', onClick: this.changeIntroReserve, 'class': 'wabuttontext' },
                                    '\u0E04\u0E19\u0E2D\u0E37\u0E48\u0E19'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof1 == "myselfhtml" ? "btn successbutton" : "btn failbutton", id: 'myselfhtml', onClick: this.changeIntroReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'myselfhtml', onClick: this.changeIntroReserve, 'class': 'wabuttontext' },
                                    '\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center mt-2' },
                                React.createElement(
                                    'label',
                                    { 'class': 'wa' },
                                    '\u0E16\u0E36\u0E07\u0E43\u0E04\u0E23 (\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19/\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07)'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'd-flex justify-content-center' },
                                React.createElement('input', { maxlength: '60', 'class': 'inputheho', required: true, id: 'to_intro', placeholder: '\u0E16\u0E36\u0E07\u0E43\u0E04\u0E23' })
                            )
                        ),
                        this.state.reserve_into_html
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'occasion', 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { 'class': 'bookdetails mt-5' },
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2D\u0E30\u0E44\u0E23: '
                            )
                        ),
                        React.createElement('hr', { 'class': 'hr' }),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-4 mb-5' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "birthday" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'birthdaybutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'birthdaybutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E27\u0E31\u0E19\u0E2A\u0E4D\u0E32\u0E04\u0E31\u0E0D'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "peptalk" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'peptalkbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'peptalkbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E01\u0E4D\u0E32\u0E25\u0E31\u0E07\u0E43\u0E08'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "roast" ? "btn successbutton mr-3" : "btn failbutton mr-3", id: 'roastbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'roastbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E40\u0E1C\u0E32'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': this.state.colorof2 == "other" ? "btn successbutton" : "btn failbutton", id: 'otherbutton', onClick: this.changeOccasionReserve },
                                React.createElement(
                                    'h6',
                                    { id: 'otherbutton', onClick: this.changeOccasionReserve, 'class': 'wabuttontext' },
                                    '\u0E2D\u0E37\u0E48\u0E19\u0E46'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-4' },
                            React.createElement(
                                'h4',
                                { 'class': 'wa' },
                                '\u0E17\u0E4D\u0E32\u0E43\u0E2B\u0E49\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E19\u0E48\u0E32\u0E08\u0E14\u0E08\u0E4D\u0E32!'
                            )
                        ),
                        this.state.reserve_occasion_html
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2' },
                    React.createElement(
                        'label',
                        { 'class': 'wa' },
                        '\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement('input', { 'class': 'datechecker', required: true, id: 'date_inputid', name: 'date_inputname', type: 'date' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-1' },
                    React.createElement(
                        'h6',
                        null,
                        '*\u0E16\u0E49\u0E32\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E4D\u0E32\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E49\u0E04\u0E38\u0E13\u0E08\u0E30\u0E44\u0E14\u0E49\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19*'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                        'label',
                        { 'class': 'wa mr-2' },
                        '\u0E0B\u0E48\u0E2D\u0E19\u0E08\u0E32\u0E01\u0E42\u0E1E\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E02\u0E2D\u0E07\u0E2A\u0E15\u0E32\u0E23\u0E4C'
                    ),
                    React.createElement('input', { id: 'inputcheckid', 'class': 'inputcheckbox', type: 'checkbox' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center mt-2 mb-5' },
                    React.createElement('input', { required: true, id: 'submitreservation', type: 'submit', onClick: this.saveReserve, value: '\u0E2B\u0E19\u0E49\u0E32\u0E0A\u0E4D\u0E32\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19', 'class': 'btn' })
                )
            );
        }
    }]);

    return BookPage;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#paymentpage').hidden = true;
    document.querySelector('#realpayment').hidden = true;

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch('/gotobook/' + influencerusername).then(function (response) {
        return response.json();
    }).then(function (data) {
        // ReactDOM.render(<PaymentPage/>, document.querySelector('#paymentpage'));

        ReactDOM.render(React.createElement(BookPage, { data: data }), document.querySelector('#wholereservepage'));
    });
});