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
      var suggestion_rows = [];
      for (var i = 0; i < this.props.data.length; i++) {
        console.log("lol wtf", this.props.data[i]);
        suggestion_rows.push(React.createElement(SuggestionsRow, {
          id: this.props.data[i].id,
          username: this.props.data[i].username,
          email: this.props.data[i].email,
          influencer_ornot: this.props.data[i].influencer_ornot,
          freeze_account: this.props.data[i].freeze_account }));
      }
      return React.createElement(
        'div',
        { id: 'control-suggestions' },
        React.createElement(
          'h1',
          null,
          'LETS GO?'
        ),
        React.createElement(
          'table',
          null,
          React.createElement(
            'tbody',
            null,
            ' ',
            suggestion_rows,
            ' '
          )
        )
      );
    }
  }]);

  return SuggestionTable;
}(React.Component);

var SuggestionsRow = function (_React$Component2) {
  _inherits(SuggestionsRow, _React$Component2);

  function SuggestionsRow(props) {
    _classCallCheck(this, SuggestionsRow);

    var _this2 = _possibleConstructorReturn(this, (SuggestionsRow.__proto__ || Object.getPrototypeOf(SuggestionsRow)).call(this, props));

    _this2.clickHref = _this2.clickHref.bind(_this2);

    return _this2;
  }

  _createClass(SuggestionsRow, [{
    key: 'clickHref',
    value: function clickHref(e) {
      console.log("yo wassup");
    }
  }, {
    key: 'render',
    value: function render() {
      // might be of use so yea
      var ininfluencer_link = "/ininfluencer/" + this.props.username;
      //<a name="posterr" href={portalname} class="h4 colorstyle">{this.props.portalname}</a> 

      return React.createElement(
        'div',
        { id: 'suggestion_row_id' },
        React.createElement(
          'a',
          { name: 'posterr', href: ininfluencer_link, 'class': 'h4 colorstyle' },
          this.props.username
        ),
        React.createElement(
          'h5',
          null,
          this.props.influencer_ornot
        ),
        React.createElement(
          'h5',
          null,
          this.props.freeze_account
        )
      );
    }
  }]);

  return SuggestionsRow;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  fetch('/inzwerg4jgnsd9aadif67').then(function (response) {
    return response.json();
  }).then(function (data) {
    ReactDOM.render(React.createElement(SuggestionTable, { data: data }), document.querySelector('#suggestions_por_react'));
  });
});