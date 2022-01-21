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
var e = React.createElement;

var TwoButtons = function (_React$Component) {
  _inherits(TwoButtons, _React$Component);

  function TwoButtons(props) {
    _classCallCheck(this, TwoButtons);

    return _possibleConstructorReturn(this, (TwoButtons.__proto__ || Object.getPrototypeOf(TwoButtons)).call(this, props));
  }

  _createClass(TwoButtons, [{
    key: 'render',
    value: function render() {

      return e(React.createElement(
        'h1',
        null,
        'New Portal'
      ));
    }
  }]);

  return TwoButtons;
}(React.Component);

var domContainer = document.querySelector('#new_portal');
console.log("domContainer", domContainer);
ReactDOM.render(e(TwoButtons), domContainer);
ReactDOM.render(React.createElement(EditPage, {
  id: this.props.id,
  postinfo: this.props.post_info,
  curuser: this.props.curuser,
  timestamp: this.props.time_stamp }), document.querySelector('#posting_view'));