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

var InfluencerFeedRows = function (_React$Component) {
  _inherits(InfluencerFeedRows, _React$Component);

  function InfluencerFeedRows(props) {
    _classCallCheck(this, InfluencerFeedRows);

    var _this = _possibleConstructorReturn(this, (InfluencerFeedRows.__proto__ || Object.getPrototypeOf(InfluencerFeedRows)).call(this, props));

    _this.hideFunction = _this.hideFunction.bind(_this);
    if (_this.props.hide == true) {
      _this.state = {
        hide: "Unhide"
      };
    } else {
      _this.state = {
        hide: "Hide"
      };
    }

    return _this;
  }

  _createClass(InfluencerFeedRows, [{
    key: 'hideFunction',
    value: function hideFunction(e) {
      var _this2 = this;

      if (e.target.value == "Hide") {
        this.setState({ hide: "Unhide" });
      } else {
        this.setState({ hide: "Hide" });
      }
      var publicid = e.target.id;
      var getcooked = getCookie('csrftoken');
      console.log("what is the value", e.target.value);

      fetch('/hidepost', {
        method: 'POST',
        headers: { 'X-CSRFToken': getcooked },
        body: JSON.stringify({
          publicid: publicid,
          hide: e.target.value
        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(result);
        console.log("result", result["hide"]);

        _this2.setState({ hide: result["hide"] });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("wawa", this.props.data);
      var thewholereturn = "";
      if (this.props.feedtype == "main") {
        var link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4";
        thewholereturn = React.createElement(
          'div',
          { 'class': 'd-flex justify-comlumn' },
          React.createElement(
            'div',
            { 'class': 'videomaincover mt-3 ml-2' },
            React.createElement(
              'div',
              { 'class': 'd-flex justify-content-center' },
              React.createElement(
                'video',
                { 'class': 'videoshow', id: 'testervideo', width: '320', height: '240', controls: true },
                React.createElement('source', { src: link }),
                'Your browser does not support the video tag.'
              )
            ),
            React.createElement(
              'div',
              { 'class': 'd-flex justify-content-center mt-3' },
              this.props.sameperson == 1 ? React.createElement(
                'button',
                { id: this.props.data, value: this.state.hide, 'class': this.state.hide == "Hide" ? "btn-primary hidebutton" : "btn-danger hidebutton", onClick: this.hideFunction },
                this.state.hide
              ) : null
            )
          )
        );
      } else {
        //aab9d9bdb4bdfb65a5a030a5836762e2
        var _link = "";
        if (this.props.data["picture"] == null) {
          _link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg";
        } else {
          _link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["picture"] + ".jpg";
        }
        thewholereturn = React.createElement(
          'div',
          { 'class': 'grid' },
          React.createElement(
            'div',
            { 'class': 'reviewmaincover d-flex justify-content-center' },
            React.createElement(
              'div',
              { 'class': 'd-flex flex-column d-flex justify-content-start mt-3' },
              React.createElement('img', { 'class': 'imgnoedit', src: _link }),
              React.createElement(
                'h4',
                null,
                this.props.data["username"]
              ),
              React.createElement(
                'h6',
                { 'class': 'reviewtext' },
                this.props.data["review"]
              )
            )
          )
        );
      }

      return React.createElement(
        'div',
        null,
        thewholereturn
      );
    }
  }]);

  return InfluencerFeedRows;
}(React.Component);

var InfluencerFeedTable = function (_React$Component2) {
  _inherits(InfluencerFeedTable, _React$Component2);

  function InfluencerFeedTable(props) {
    _classCallCheck(this, InfluencerFeedTable);

    var _this3 = _possibleConstructorReturn(this, (InfluencerFeedTable.__proto__ || Object.getPrototypeOf(InfluencerFeedTable)).call(this, props));

    console.log("accountstatus", _this3.props.data.accountstatus);
    return _this3;
  }

  _createClass(InfluencerFeedTable, [{
    key: 'render',
    value: function render() {
      console.log("datamofo", this.props.data["feedtype"]);
      var rows = [];
      console.log("HAHAHAHAH", this.props.data["alldata"]);

      for (var i = 0; i < this.props.data["alldata"].length; i++) {
        rows.push(React.createElement(InfluencerFeedRows, {
          data: this.props.data["alldata"][i],
          feedtype: this.props.data["feedtype"],
          sameperson: this.props.data["sameperson"],
          hide: this.props.data["hidedata"][i] }));
      }

      return React.createElement(
        'div',
        null,
        this.props.data["feedtype"] == "main" ? React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center' },
            React.createElement(
              'h1',
              { 'class': 'wa mt-3' },
              '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07'
            )
          ),
          this.props.data["alldata"] == "" ? React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-3 mb-5' },
            React.createElement(
              'h6',
              { 'class': 'wanopostyet' },
              '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E42\u0E1E\u0E2A'
            )
          ) : React.createElement(
            'div',
            { 'class': 'grid d-flex justify-content-center' },
            rows
          )
        ) : React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center' },
            React.createElement(
              'h1',
              { 'class': 'wa mt-3' },
              '\u0E23\u0E34\u0E27\u0E34\u0E27'
            )
          ),
          this.props.data["alldata"] == "" ? React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-3 mb-5' },
            React.createElement(
              'h6',
              { 'class': 'wanopostyet' },
              '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E35\u0E27\u0E34\u0E27'
            )
          ) : React.createElement(
            'div',
            { 'class': 'row d-flex justify-content-center' },
            rows
          )
        )
      );
    }
  }]);

  return InfluencerFeedTable;
}(React.Component);

var EditPost = function (_React$Component3) {
  _inherits(EditPost, _React$Component3);

  function EditPost(props) {
    _classCallCheck(this, EditPost);

    var _this4 = _possibleConstructorReturn(this, (EditPost.__proto__ || Object.getPrototypeOf(EditPost)).call(this, props));

    _this4.editPost = _this4.editPost.bind(_this4);
    _this4.editCancel = _this4.editCancel.bind(_this4);
    _this4.checkTxtArea = _this4.checkTxtArea.bind(_this4);
    console.log("this.props.fillname", _this4.props.fullname);

    _this4.state = {
      fullname: _this4.props.fullname,
      description: _this4.props.description,
      first_url: _this4.props.first_url,
      second_url: _this4.props.second_url,
      third_url: _this4.props.third_url

    };
    return _this4;
  }

  _createClass(EditPost, [{
    key: 'editCancel',
    value: function editCancel(e) {
      this.props.cancel();
    }
  }, {
    key: 'editPost',
    value: function editPost(e) {
      this.props.savePostHandler("confused");
    }
  }, {
    key: 'checkTxtArea',
    value: function checkTxtArea(e) {
      if (e.target.id == "idfullname") {
        if (e.target.value.length > 0) {
          this.setState({ fullname: e.target.value });
        } else {
          this.setState({ fullname: "" });
        }
      }
      if (e.target.id == "iddescription") {
        if (e.target.value.length > 0) {
          console.log(e.target.value);
          this.setState({ description: e.target.value });
        } else {
          this.setState({ description: "" });
        }
      }
      if (e.target.id == "idurl1") {
        if (e.target.value.length > 0) {
          console.log(e.target.value);
          this.setState({ first_url: e.target.value });
        } else {
          this.setState({ first_url: "" });
        }
      }
      if (e.target.id == "idurl2") {
        if (e.target.value.length > 0) {
          console.log(e.target.value);
          this.setState({ second_url: e.target.value });
        } else {
          this.setState({ second_url: "" });
        }
      }
      if (e.target.id == "idurl3") {
        if (e.target.value.length > 0) {
          console.log(e.target.value);
          this.setState({ third_url: e.target.value });
        } else {
          this.setState({ third_url: "" });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'form-floating' },
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'button',
              { type: 'button', className: 'loll btn btn-outline-danger btn-sm', name: 'cancel_button', onClick: this.editCancel },
              'Cancel'
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              '\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07: '
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement('textarea', { id: 'idfullname', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.fullname })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              '\u0E44\u0E1A\u0E42\u0E2D: '
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement('textarea', { id: 'iddescription', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.description })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C 1: '
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement('textarea', { id: 'idurl1', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.first_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C  2: '
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement('textarea', { id: 'idurl2', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.second_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C  3: '
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement('textarea', { id: 'idurl3', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.third_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'button',
              { type: 'button', name: 'edit_post_button', className: 'loll btn btn-outline-success btn-sm mr-2', onClick: this.editPost },
              'Save'
            )
          )
        )
      );
    }
  }]);

  return EditPost;
}(React.Component);

var InfluencerFeedTitle = function (_React$Component4) {
  _inherits(InfluencerFeedTitle, _React$Component4);

  function InfluencerFeedTitle(props) {
    _classCallCheck(this, InfluencerFeedTitle);

    var _this5 = _possibleConstructorReturn(this, (InfluencerFeedTitle.__proto__ || Object.getPrototypeOf(InfluencerFeedTitle)).call(this, props));

    _this5.changeFeedPortal = _this5.changeFeedPortal.bind(_this5);
    _this5.editProfile = _this5.editProfile.bind(_this5);
    _this5.cancel = _this5.cancel.bind(_this5);
    //  this.showImg = this.showImg.bind(this);
    _this5.sendEditPost = _this5.sendEditPost.bind(_this5);
    _this5.chooseFile = _this5.chooseFile.bind(_this5);
    _this5.chooseFileVideo = _this5.chooseFileVideo.bind(_this5);

    document.querySelector('#maininfluencer').hidden = false;
    document.querySelector('#reviewsmainfluencer').hidden = true;
    console.log("waearth", _this5.props.data);

    var fullname = "";
    var description = "";
    var profilepic = "";
    var profilevideo = "";
    var first_url = "";
    var second_url = "";
    var third_url = "";

    if (_this5.props.data["userinfodata"][0] != null) {
      if (_this5.props.data["userinfodata"][0].profile_fullname != null) {
        fullname = _this5.props.data["userinfodata"][0].profile_fullname;
      }
      if (_this5.props.data["userinfodata"][0].profile_description != null) {
        description = _this5.props.data["userinfodata"][0].profile_description;
      }
      if (_this5.props.data["userinfodata"][0].first_url != null) {
        first_url = _this5.props.data["userinfodata"][0].first_url;
      }
      if (_this5.props.data["userinfodata"][0].second_url != null) {
        second_url = _this5.props.data["userinfodata"][0].second_url;
      }
      if (_this5.props.data["userinfodata"][0].third_url != null) {
        third_url = _this5.props.data["userinfodata"][0].third_url;
      }
      if (_this5.props.data["userinfodata"][0].profile_picture != null) {
        profilepic = _this5.props.data["userinfodata"][0].profile_picture;
      }
      if (_this5.props.data["userinfodata"][0].profile_video != null) {
        profilevideo = _this5.props.data["userinfodata"][0].profile_video;
      }
    }

    _this5.state = {
      fullname: fullname,
      description: description,
      first_url: first_url,
      second_url: second_url,
      third_url: third_url,
      profilepic: profilepic,
      profilevideo: profilevideo,

      edit: React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          { 'class': 'wa' },
          '\u0E0A\u0E37\u0E48\u0E2D'
        ),
        React.createElement(
          'h5',
          null,
          fullname
        ),
        React.createElement('hr', null),
        React.createElement(
          'label',
          { 'class': 'wa' },
          '\u0E44\u0E1A\u0E42\u0E2D'
        ),
        React.createElement(
          'h6',
          null,
          description
        ),
        React.createElement('hr', null),
        React.createElement(
          'label',
          { 'class': 'wa' },
          '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C'
        ),
        React.createElement(
          'h6',
          null,
          first_url
        ),
        React.createElement(
          'h6',
          null,
          second_url
        ),
        React.createElement(
          'h6',
          null,
          third_url
        ),
        React.createElement('hr', null)
      )

    };
    return _this5;
  }

  _createClass(InfluencerFeedTitle, [{
    key: 'chooseFile',
    value: function chooseFile(e) {
      var _this6 = this;

      //  return file && file['type'].split('/')[0] === 'image';


      var getcooked = getCookie('csrftoken');
      var fileInput = document.querySelector('#choosefile').files[0];
      if (fileInput["type"].split('/')[0] != 'image') {
        alert("ไม่ใช่รูป");
      } else {

        console.log("this is fileinput", fileInput);
        console.log("this is in choose file");

        var formData = new FormData();
        formData.append("media", fileInput);
        var type = "imageinprofile";
        console.log("formdata", formData);
        fetch('/forupload/' + type, {
          method: 'POST',
          headers: { 'X-CSRFToken': getcooked
          },
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          console.log("result", result);
          console.log(result['url']);
          _this6.setState({
            profilepic: result['url']
          });
        });
      }
    }
  }, {
    key: 'chooseFileVideo',
    value: function chooseFileVideo(e) {

      var fileInput = document.querySelector('#inputGroupFile01').files[0];

      if (fileInput["type"].split('/')[0] != 'video') {
        alert("ไม่ใช่วีดีโอ");
      } else {

        console.log("CHOOSEFILEVIDEOOOOOO");
        var getcooked = getCookie('csrftoken');
        console.log("this is fileinput", fileInput);

        console.log("this is in choose file");

        var formData = new FormData();
        formData.append("media", fileInput);
        var type = "videoinprofile";
        console.log("what the fuck is thye type", type);
        console.log("formdata", formData);
        fetch('/forupload/' + type, {
          method: 'POST',
          headers: { 'X-CSRFToken': getcooked
          },
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          console.log("result", result);
          console.log("waan weesakul", result['url']);
          document.querySelector('#introvideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + result['url'] + ".mp4";
        });
      }
    }
  }, {
    key: 'sendEditPost',
    value: function sendEditPost() {
      var _this7 = this;

      var idfullname = document.getElementById("idfullname").value;
      var iddescription = document.getElementById("iddescription").value;
      var idurl1 = document.getElementById("idurl1").value;
      var idurl2 = document.getElementById("idurl2").value;
      var idurl3 = document.getElementById("idurl3").value;

      var csrftoken = getCookie('csrftoken');
      var type = "normal";
      console.log("what is going on");
      fetch('/editprofile', {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          idfullname: idfullname,
          iddescription: iddescription,
          idurl1: idurl1,
          idurl2: idurl2,
          idurl3: idurl3
        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log("this is result", idfullname);
        console.log("this is result", iddescription);
        console.log("this is result", idurl1);

        _this7.setState({
          fullname: idfullname,
          description: iddescription,
          first_url: idurl1,
          second_url: idurl2,
          third_url: idurl3,

          edit: React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { 'class': 'wa' },
              '\u0E0A\u0E37\u0E48\u0E2D'
            ),
            React.createElement(
              'h5',
              null,
              idfullname
            ),
            React.createElement('hr', null),
            React.createElement(
              'label',
              { 'class': 'wa' },
              '\u0E44\u0E1A\u0E42\u0E2D'
            ),
            React.createElement(
              'h6',
              null,
              iddescription
            ),
            React.createElement('hr', null),
            React.createElement(
              'label',
              { 'class': 'wa' },
              '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C'
            ),
            React.createElement(
              'h6',
              null,
              idurl1
            ),
            React.createElement(
              'h6',
              null,
              idurl2
            ),
            React.createElement(
              'h6',
              null,
              idurl3
            ),
            React.createElement('hr', null)
          )

        });
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.setState({

        edit: React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            { 'class': 'wa' },
            '\u0E0A\u0E37\u0E48\u0E2D'
          ),
          React.createElement(
            'h5',
            null,
            this.state.fullname
          ),
          React.createElement('hr', null),
          React.createElement(
            'label',
            { 'class': 'wa' },
            '\u0E44\u0E1A\u0E42\u0E2D'
          ),
          React.createElement(
            'h6',
            null,
            this.state.description
          ),
          React.createElement('hr', null),
          React.createElement(
            'label',
            { 'class': 'wa' },
            '\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C'
          ),
          React.createElement(
            'h6',
            null,
            this.state.first_url
          ),
          React.createElement(
            'h6',
            null,
            this.state.second_url
          ),
          React.createElement(
            'h6',
            null,
            this.state.third_url
          ),
          React.createElement('hr', null)
        )
      });
    }
  }, {
    key: 'editProfile',
    value: function editProfile(e) {
      console.log("edot");
      //go to edit thingy ok??
      //the jon of this state is to essentially send the value to EditPost


      console.log("inside editprofile button/ function");
      console.log("profilepci in editprofile", this.state.fullname);

      this.setState({
        fullname: this.state.fullname,
        description: this.state.description,
        first_url: this.state.first_url,
        second_url: this.state.second_url,
        third_url: this.state.third_url,

        edit: React.createElement(EditPost, { savePostHandler: this.sendEditPost, cancel: this.cancel,
          fullname: this.state.fullname, description: this.state.description, first_url: this.state.first_url,
          second_url: this.state.second_url, third_url: this.state.third_url })

      });
    }
  }, {
    key: 'changeFeedPortal',
    value: function changeFeedPortal(e) {
      var getcooked = getCookie('csrftoken');
      if (e.target.id == "publicfeedbutid") {
        console.log("this", this.props.data);
        document.querySelector('#maininfluencer').hidden = false;
        document.querySelector('#reviewsmainfluencer').hidden = true;
        var feedtype = "main";
        fetch('/gotoinfluencer/' + this.props.data["username"] + '/' + feedtype).then(function (response) {
          return response.json();
        }).then(function (data) {

          console.log("gimme data", data);
          ReactDOM.render(React.createElement(InfluencerFeedTable, { data: data }), document.querySelector('#maininfluencer'));
        });
      } else if (e.target.id == "reviewfeedbutid") {
        document.querySelector('#maininfluencer').hidden = true;
        document.querySelector('#reviewsmainfluencer').hidden = false;
        var feedtype = "review";
        console.log("this.props", this.props.data);
        fetch('/gotoinfluencer/' + this.props.data["username"] + '/' + feedtype).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log("gimme data", data);

          ReactDOM.render(React.createElement(InfluencerFeedTable, { data: data }), document.querySelector('#reviewsmainfluencer'));
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var link = "";
      var videolink = "";
      //THIS IS A NEW PROBLEM TO FIX
      //the user info data is fucked or essentially its blank and query anything
      var bookhtmllink = "/book/" + this.props.data["username"];

      if (this.state.profilepic != "") {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.state.profilepic + ".jpg";
        console.log("this is the new type of if in image");
      }
      if (this.state.profilevideo != "") {
        videolink = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.state.profilevideo + ".mp4";
        console.log("this is the new type of if in video");
      }

      if (this.props.data["userinfodata"] != "") {

        if (this.props.data["userinfodata"] == "") {
          console.log("userinfodata is blank fak u");
        } else {
          console.log("userinfodat is not blank fak u bak");
        }
        console.log("sameperson", this.props.data["sameperson"]);

        if (this.props.data["sameperson"] == 1) {
          console.log("ok we start doing the edit from here");
        }
      }
      var averagestars = Math.round(10 * this.props.data["averagestars"]) / 10;

      var categoryname = "";

      console.log("first");
      console.log(this.props.data);
      console.log(this.props.data["userinfodata"].length);

      if (this.props.data["userinfodata"].length == 0) {

        console.log("catching err");
      } else {
        if (this.props.data["userinfodata"][0].category == "athelete") {
          categoryname = "นักกีฬา";
        } else if (this.props.data["userinfodata"][0].category == "gamer") {
          categoryname = "เกมเมอร์";
        } else if (this.props.data["userinfodata"][0].category == "actor") {
          categoryname = "นักแสดง";
        } else if (this.props.data["userinfodata"][0].category == "influencer") {
          categoryname = "อินฟลูเอนเซอร์";
        } else if (this.props.data["userinfodata"][0].category == "comedian") {
          categoryname = "นักแสดงตลก";
        } else if (this.props.data["userinfodata"][0].category == "singer") {
          categoryname = "นักร้อง";
        }
      }

      console.log("earthwa", this.props.data["userinfodata"][0]["price"]);

      console.log("daijoubu dayou", this.props.data);
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { 'class': 'controlininfluencer d-flex justify-content-between' },
            React.createElement(
              'div',
              { 'class': 'beforehihi' },
              React.createElement(
                'div',
                { 'class': 'hihi d-flex flex-column' },
                React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-center' },
                  React.createElement('img', { 'class': 'imgnoedit', src: link })
                ),
                this.props.data["sameperson"] == 1 ? React.createElement(
                  'div',
                  { 'class': 'd-flex flex-column mt-3' },
                  React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                      'label',
                      { htmlFor: 'edit_post_txt' },
                      'Click to change profile picture: '
                    )
                  ),
                  React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-end' },
                    React.createElement('input', { id: 'choosefile', 'class': 'choosefile', onChange: this.chooseFile, type: 'file' })
                  )
                ) : null,
                React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-between mt-3' },
                  React.createElement(
                    'h1',
                    null,
                    this.props.data['username']
                  ),
                  this.props.data["sameperson"] == 1 ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'button',
                      { type: 'button', 'class': 'btn editbutton', onClick: this.editProfile },
                      'Edit'
                    )
                  ) : null,
                  React.createElement(
                    'h4',
                    { 'class': 'wa' },
                    this.props.data["userinfodata"][0]["price"],
                    '\u0E3F'
                  )
                ),
                React.createElement(
                  'div',
                  { 'class': 'forfont d-flex justify-content-center' },
                  React.createElement(
                    'div',
                    { 'class': 'mr-3' },
                    React.createElement(
                      'h5',
                      { 'class': 'forfont ml-3' },
                      this.props.data["reviewnum"],
                      ' \u0E23\u0E35\u0E27\u0E34\u0E27'
                    )
                  ),
                  React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'h5',
                      null,
                      averagestars,
                      ' \u0E14\u0E32\u0E27\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22'
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-center mt-1' },
                  this.props.data["userinfodata"] != "" ? React.createElement(
                    'h5',
                    null,
                    categoryname
                  ) : null
                ),
                this.state.edit
              )
            ),
            React.createElement(
              'div',
              { 'class': 'coversvdointro d-flex justify-content-center' },
              React.createElement(
                'div',
                { 'class': 'd-flex flex-column ' },
                React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-center' },
                  videolink == "" ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'h6',
                      { 'class': 'wanopostyet' },
                      '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E41\u0E19\u0E30\u0E19\u0E4D\u0E32\u0E15\u0E31\u0E27'
                    )
                  ) : React.createElement(
                    'video',
                    { 'class': 'almostvideovideowhenget', id: 'introvideo', controls: true },
                    React.createElement('source', { src: videolink }),
                    'Your browser does not support the video tag.'
                  )
                ),
                this.props.data["sameperson"] == 1 ? React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center' },
                    React.createElement(
                      'label',
                      { htmlFor: 'edit_post_txt' },
                      'Click to change introduction video: '
                    )
                  ),
                  React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'div',
                      { 'class': 'custom-file' },
                      React.createElement(
                        'div',
                        { 'class': 'videouploadininfluencer' },
                        React.createElement('input', { type: 'file', onChange: this.chooseFileVideo, 'class': 'editintrovid', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' })
                      )
                    )
                  )
                ) : React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-center mt-3' },
                  this.props.data.accountstatus == 1 ? this.props.data["sameperson"] != 1 ? React.createElement(
                    'a',
                    { name: 'posterr', 'class': 'btn reservebutton', href: bookhtmllink },
                    '\u0E08\u0E2D\u0E07\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49'
                  ) : React.createElement('div', null) : React.createElement(
                    'div',
                    null,
                    '\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2B\u0E22\u0E38\u0E14\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27'
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { 'class': 'enough d-flex justify-content-center mb-3' },
          React.createElement(
            'button',
            { type: 'button', 'class': 'publicbutton mr-5 btn ', id: 'publicfeedbutid', onClick: this.changeFeedPortal },
            '\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07'
          ),
          React.createElement(
            'button',
            { type: 'button', 'class': 'btn publicbutton', id: 'reviewfeedbutid', onClick: this.changeFeedPortal },
            '\u0E23\u0E35\u0E27\u0E34\u0E27'
          )
        ),
        this.props.data["sameperson"] == 1 ? React.createElement(
          'div',
          { 'class': 'd-flex justify-content-center' },
          React.createElement(
            'h6',
            null,
            '*note \u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16 Show \u0E44\u0E14\u0E49\u0E41\u0E04\u0E48 9 Posts'
          )
        ) : null
      );
    }
  }]);

  return InfluencerFeedTitle;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  console.log("walachat");
  var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
  var feedtype = "main";
  console.log("influencer username", influencerusername);

  fetch('/gotoinfluencer/' + influencerusername + '/' + feedtype).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log("gimme data", data);

    ReactDOM.render(React.createElement(InfluencerFeedTitle, { data: data }), document.querySelector('#toppart'));
    ReactDOM.render(React.createElement(InfluencerFeedTable, { data: data }), document.querySelector('#maininfluencer'));

    //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));

  });
});