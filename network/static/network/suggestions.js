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

var SuggestionTable = function (_React$Component2) {
  _inherits(SuggestionTable, _React$Component2);

  function SuggestionTable(props) {
    _classCallCheck(this, SuggestionTable);

    var _this2 = _possibleConstructorReturn(this, (SuggestionTable.__proto__ || Object.getPrototypeOf(SuggestionTable)).call(this, props));

    _this2.mainSearch = _this2.mainSearch.bind(_this2);

    _this2.state = {
      searchtext: "",
      newdata: _this2.props.data
    };

    return _this2;
  }

  _createClass(SuggestionTable, [{
    key: 'mainSearch',
    value: function mainSearch(searchtext) {
      var _this3 = this;

      console.log("searchtext", searchtext);
      this.setState({ searchtext: searchtext });
      var getcooked = getCookie('csrftoken');
      fetch('/inzwerg4jgnsd9aadif67', {
        method: 'POST',
        headers: { 'X-CSRFToken': getcooked },
        body: JSON.stringify({

          //add state of newdata right here
          searchvalue: searchtext
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log("checker checky for newdata", _this3.state.newdata);
        console.log("this is dataaaaaa mama mama", data);
        _this3.setState({
          newdata: data["newdata"]
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var suggestion_rows = [];
      console.log("this.state.new", this.state.newdata);
      /*
      <div id="control-suggestions">
      <div class="d-flex justify-content-start">
       <SearchBar searchtext={this.state.searchtext} oncheckSearch={this.mainSearch}/>
      </div>
      </div>
      */

      if (this.state.newdata.length != 0) {
        for (var i = 0; i < this.state.newdata.length; i++) {
          console.log("bakano");
          //console.log("lol wtf", this.props.data[i])
          suggestion_rows.push(React.createElement(SuggestionsRow, {
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
      } else {
        suggestion_rows.push(React.createElement(SuggestionsRow, {

          lengthh: this.state.newdata.length
        }));
      }

      console.log(this.props.type);
      return React.createElement(
        'div',
        { id: 'control-suggestions', 'class': 'control-suggestions' },
        this.props.type == "main" ? React.createElement(
          'div',
          { 'class': 'd-flex justify-content-center' },
          React.createElement(SearchBar, { searchtext: this.state.searchtext, oncheckSearch: this.mainSearch })
        ) : React.createElement('null', null),
        React.createElement(
          'div',
          { 'class': 'divofstartitle' },
          React.createElement(
            'h3',
            { 'class': 'startitleindex mt-3' },
            this.props.type == "main" ? "สตาร์" : "ที่นิยม"
          )
        ),
        React.createElement(
          'div',
          { 'class': 'content mt-3 mb-5' },
          React.createElement(
            'div',
            { 'class': 'box' },
            suggestion_rows
          )
        )
      );
    }
  }]);

  return SuggestionTable;
}(React.Component);

var SuggestionsRow = function (_React$Component3) {
  _inherits(SuggestionsRow, _React$Component3);

  function SuggestionsRow(props) {
    _classCallCheck(this, SuggestionsRow);

    var _this4 = _possibleConstructorReturn(this, (SuggestionsRow.__proto__ || Object.getPrototypeOf(SuggestionsRow)).call(this, props));

    _this4.clickHref = _this4.clickHref.bind(_this4);

    return _this4;
  }

  _createClass(SuggestionsRow, [{
    key: 'clickHref',
    value: function clickHref(e) {
      console.log("yo wassup");
    }
  }, {
    key: 'render',
    value: function render() {
      var link = void 0;
      if (this.props.profile_picture != null) {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profile_picture + ".jpg";
      } else {
        link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
      }

      // might be of use so yea
      var ininfluencer_link = "/ininfluencer/" + this.props.username;
      //<a name="posterr" href={portalname} class="h4 colorstyle">{this.props.portalname}</a> 

      //not sure wa mee tummai but geb whai gorn
      //<h5>{this.props.influencer_ornot}</h5>
      //<h5>{this.props.freeze_account}</h5>
      console.log("bakayarou", this.props.lengthh);

      return React.createElement(
        'div',
        null,
        this.props.lengthh != 0 ? React.createElement(
          'div',
          { 'class': 'perbox' },
          React.createElement(
            'a',
            { name: 'goodmorning', 'class': 'goodmorning d-flex justify-content-center mb-3', href: ininfluencer_link },
            React.createElement(
              'div',
              { 'class': 'undergoodmorning d-flex flex-column' },
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
        ) : React.createElement(
          'h3',
          { 'class': 'wanoresult' },
          '\u0E44\u0E21\u0E48\u0E04\u0E49\u0E19\u0E1E\u0E1A\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E04\u0E49\u0E19\u0E2B\u0E32'
        ),
        ' '
      );
    }
  }]);

  return SuggestionsRow;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  fetch('/inzwerg4jgnsd9aadif67').then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log("this is newdata", data["newdata"]);
    console.log("this is populardata", data["populardata"]);

    ReactDOM.render(React.createElement(SuggestionTable, { data: data["newdata"], type: 'main' }), document.querySelector('#suggestions_por_react'));
    ReactDOM.render(React.createElement(SuggestionTable, { data: data["populardata"], type: 'popular' }), document.querySelector('#suggestions_por_react_popular'));
  });
});