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

var SuggestionTable = function (_React$Component) {
    _inherits(SuggestionTable, _React$Component);

    function SuggestionTable(props) {
        _classCallCheck(this, SuggestionTable);

        return _possibleConstructorReturn(this, (SuggestionTable.__proto__ || Object.getPrototypeOf(SuggestionTable)).call(this, props));
    }

    _createClass(SuggestionTable, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'check' },
                React.createElement(
                    'h1',
                    null,
                    'LETS FUCKING GO'
                )
            );
        }
    }]);

    return SuggestionTable;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    console.log("walouchy check");
    //let userid_clicked = document.getElementById("hiddenportalid").value
    //const pagination = document.querySelector('#hidden_pagination').value
    // console.log("userid_clicked", userid_clicked)
    // userid_clicked = parseInt(userid_clicked)
    fetch('/allportal').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("data", data);

        ReactDOM.render(React.createElement(SuggestionTable, { data: data }), document.querySelector('#suggestions_por_react'));
    });
});