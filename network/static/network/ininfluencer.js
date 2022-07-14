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
    _this.testerfunction = _this.testerfunction.bind(_this);

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
    key: 'testerfunction',
    value: function testerfunction(e) {
      console.log("this is to test");
    }
  }, {
    key: 'hideFunction',
    value: function hideFunction(dataid) {
      var _this2 = this;

      var findid = dataid + "ininfluencer";

      if (document.getElementById(dataid).value == "Hide") {
        this.setState({ hide: "Unhide" });
      } else {
        this.setState({ hide: "Hide" });
      }
      var publicid = dataid;
      var getcooked = getCookie('csrftoken');

      fetch('/hidepost', {
        method: 'POST',
        headers: { 'X-CSRFToken': getcooked },
        body: JSON.stringify({
          publicid: publicid,
          hide: document.getElementById(dataid).value

        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {

        _this2.setState({ hide: result["hide"] });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var waid = this.props.data + "ininfluencer";
      var thewholereturn = "";
      if (this.props.feedtype == "main") {

        var link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4";
        thewholereturn = React.createElement(
          'div',
          { 'class': 'ngongcover' },
          React.createElement(
            'div',
            { id: waid, 'class': this.props.sameperson == 1 ? this.state.hide == "Hide" ? "backgroundhide mt-5 ml-2 mr-2" : "backgroundhidewrong mt-5 ml-2 mr-2" : null },
            React.createElement(
              'div',
              { 'class': 'beforevideomaincover' },
              React.createElement(
                'div',
                { 'class': 'videomaincover' },
                React.createElement(
                  'div',
                  { 'class': 'd-flex justify-content-center' },
                  React.createElement(
                    'video',
                    { 'class': 'videoshow', muted: 'true', id: 'testervideo', controls: true },
                    React.createElement('source', { src: link, type: 'video/mp4' }),
                    'Your browser does not support the video tag.'
                  )
                )
              )
            )
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-3' },
            this.props.sameperson == 1 ? React.createElement(
              'button',
              { id: this.props.data, value: this.state.hide, 'class': this.state.hide == "Hide" ? "btn hidebutton" : "btn hidebuttonwrong", onClick: function onClick() {
                  return _this3.hideFunction(_this3.props.data);
                } },
              this.state.hide == "Hide" ? "ซ้อน" : "เลิกซ่อน"
            ) : null
          )
        );
      } else {
        //aab9d9bdb4bdfb65a5a030a5836762e2
        var _link = "";
        if (this.props.data["picture"] == null) {
          _link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
        } else {
          _link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["picture"] + ".jpg";
        }
        thewholereturn = React.createElement(
          'div',
          { 'class': 'd-flex justify-content-start' },
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-start reviewbigdiv' },
            React.createElement(
              'div',
              { 'class': 'd-flex justify-content-center' },
              React.createElement('img', { 'class': 'imgnoeditreview', src: _link })
            ),
            React.createElement(
              'div',
              { 'class': 'd-flex flex-column' },
              React.createElement(
                'div',
                { 'class': 'ml-2' },
                React.createElement(
                  'h3',
                  { 'class': 'usernamereviewtext' },
                  this.props.data["username"]
                )
              ),
              React.createElement(
                'div',
                { 'class': 'ml-2' },
                React.createElement(
                  'p',
                  { 'class': 'actualreview' },
                  this.props.data["review"]
                )
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

    return _possibleConstructorReturn(this, (InfluencerFeedTable.__proto__ || Object.getPrototypeOf(InfluencerFeedTable)).call(this, props));
  }

  _createClass(InfluencerFeedTable, [{
    key: 'render',
    value: function render() {
      var rows = [];

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
              { 'class': 'wanopostyetyet' },
              '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E42\u0E1E\u0E2A'
            )
          ) : React.createElement(
            'div',
            { 'class': 'grid d-flex justify-content-center mb-5' },
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
              { 'class': 'wanopostyetyet' },
              '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E35\u0E27\u0E34\u0E27'
            )
          ) : React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center' },
            React.createElement(
              'div',
              { 'class': 'biggestdivreview mb-5' },
              React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center' },
                React.createElement(
                  'div',
                  { 'class': 'vidmareviewverybigdiv' },
                  React.createElement('div', { 'class': 'd-flex justify-content-center' }),
                  rows
                )
              )
            )
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

    var _this5 = _possibleConstructorReturn(this, (EditPost.__proto__ || Object.getPrototypeOf(EditPost)).call(this, props));

    _this5.editPost = _this5.editPost.bind(_this5);
    _this5.editCancel = _this5.editCancel.bind(_this5);
    _this5.checkTxtArea = _this5.checkTxtArea.bind(_this5);

    _this5.state = {
      fullname: _this5.props.fullname,
      description: _this5.props.description,
      first_url: _this5.props.first_url,
      second_url: _this5.props.second_url,
      third_url: _this5.props.third_url

    };
    return _this5;
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
          this.setState({ description: e.target.value });
        } else {
          this.setState({ description: "" });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profilepic + ".jpg";

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
              '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
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
            React.createElement('textarea', { id: 'idfullname', 'class': 'd-flex justify-content-center', name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.fullname })
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
              'button',
              { type: 'button', name: 'edit_post_button', className: 'loll btn btn-outline-success btn-sm mr-2', onClick: this.editPost },
              '\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01'
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

    var _this6 = _possibleConstructorReturn(this, (InfluencerFeedTitle.__proto__ || Object.getPrototypeOf(InfluencerFeedTitle)).call(this, props));

    _this6.changeFeedPortal = _this6.changeFeedPortal.bind(_this6);
    _this6.editProfile = _this6.editProfile.bind(_this6);
    _this6.editDes = _this6.editDes.bind(_this6);

    _this6.cancel = _this6.cancel.bind(_this6);
    _this6.cancelDes = _this6.cancelDes.bind(_this6);

    //  this.showImg = this.showImg.bind(this);
    _this6.sendEditPost = _this6.sendEditPost.bind(_this6);
    _this6.sendEditDes = _this6.sendEditDes.bind(_this6);

    _this6.chooseFile = _this6.chooseFile.bind(_this6);
    _this6.chooseFileVideo = _this6.chooseFileVideo.bind(_this6);
    _this6.checkTxtArea = _this6.checkTxtArea.bind(_this6);

    document.querySelector('#maininfluencer').hidden = false;
    document.querySelector('#reviewsmainfluencer').hidden = true;

    var fullname = "";
    var description = "";
    var profilepic = "";
    var profilevideo = "";
    var first_url = "";
    var second_url = "";
    var third_url = "";
    var trackername = 0;
    var trackerdes = 0;

    if (_this6.props.data["userinfodata"][0] != null) {
      if (_this6.props.data["userinfodata"][0].profile_fullname != null) {
        fullname = _this6.props.data["userinfodata"][0].profile_fullname;
      }
      if (_this6.props.data["userinfodata"][0].profile_description != null) {
        description = _this6.props.data["userinfodata"][0].profile_description;
      }
      if (_this6.props.data["userinfodata"][0].first_url != null) {
        first_url = _this6.props.data["userinfodata"][0].first_url;
      }
      if (_this6.props.data["userinfodata"][0].second_url != null) {
        second_url = _this6.props.data["userinfodata"][0].second_url;
      }
      if (_this6.props.data["userinfodata"][0].third_url != null) {
        third_url = _this6.props.data["userinfodata"][0].third_url;
      }
      if (_this6.props.data["userinfodata"][0].profile_picture != null) {
        profilepic = _this6.props.data["userinfodata"][0].profile_picture;
      }
      if (_this6.props.data["userinfodata"][0].profile_video != null) {
        profilevideo = _this6.props.data["userinfodata"][0].profile_video;
      }
    }

    _this6.state = {
      fullname: fullname,
      description: description,
      first_url: first_url,
      second_url: second_url,
      third_url: third_url,
      profilepic: profilepic,
      profilevideo: profilevideo,
      trackername: 0,
      trackerdes: 0,

      edit: React.createElement('div', { 'class': 'biggestdivchecker' })

    };
    return _this6;
  }

  _createClass(InfluencerFeedTitle, [{
    key: 'checkTxtArea',
    value: function checkTxtArea(e) {

      document.querySelector('#thefullnameidprofile').hidden = true;
      document.querySelector('#thefullnameidedit').hidden = false;

      if (e.target.id == "idfullname") {
        if (e.target.value.length > 0) {
          this.setState({ fullname: e.target.value });
        } else {
          this.setState({ fullname: "" });
        }
      }

      if (e.target.id == "iddescription") {
        if (e.target.value.length > 0) {
          this.setState({ description: e.target.value });
        } else {
          this.setState({ description: "" });
        }
      }
    }
  }, {
    key: 'chooseFile',
    value: function chooseFile(e) {
      var _this7 = this;

      //function above
      /*
        <label class="wa">ไบโอ</label>
            <h6>{description}</h6>
            <hr></hr>
       <label class="wa">ชื่อ</label>
      <h5>{fullname}</h5>
      <hr></hr>
      */
      //      <label class="wa">ลิ้งค์</label>
      // <h6>{first_url}</h6>
      //<h6>{second_url}</h6>
      // <h6>{third_url}</h6>
      //  <hr></hr>
      //  return file && file['type'].split('/')[0] === 'image';


      var getcooked = getCookie('csrftoken');
      var fileInput = document.querySelector('#choosefile').files[0];
      if (fileInput["type"].split('/')[0] != 'image') {
        Swal.fire({
          icon: 'error',
          text: 'ต้องเป็นรูปแต่ดันอัพโหลดวีดีโอ!'
        });
      } else {

        var formData = new FormData();
        formData.append("media", fileInput);
        var type = "imageinprofile";
        fetch('/forupload/' + type, {
          method: 'POST',
          headers: { 'X-CSRFToken': getcooked
          },
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          Swal.fire({
            icon: 'success',
            text: 'เปลี่ยนรูปสําเร็จ'
          });
          _this7.setState({
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
        Swal.fire({
          icon: 'error',
          text: 'ต้องเป็นวีดีโอแต่ดันอัพโหลดรูป'
        });
      } else {

        var getcooked = getCookie('csrftoken');

        var formData = new FormData();
        formData.append("media", fileInput);
        var type = "videoinprofile";

        Swal.fire({
          icon: 'info',
          title: 'กําลังเซฟวีดีโอ',
          text: 'กรุณาอย่ากดออกหรือรีเฟรชจากหน้านี้จนกว่าจะมีข้อความสําเร็จ อาจจะใช้เวลานาน'
        });
        fetch('/forupload/' + type, {
          method: 'POST',
          headers: { 'X-CSRFToken': getcooked
          },
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (result) {

          document.querySelector('#introvideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + result['url'] + ".mp4";
          Swal.fire({
            icon: 'success',
            title: 'สําเร็จ!'
          });
        });
      }
    }
  }, {
    key: 'sendEditDes',
    value: function sendEditDes() {
      var _this8 = this;

      var iddescription = document.getElementById("iddescription").value;
      var csrftoken = getCookie('csrftoken');
      fetch('/editprofile', {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          iddescription: iddescription,
          type: "description"

        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {

        _this8.setState({
          description: iddescription,
          trackerdes: 1

        });
        document.querySelector('#descriptionidprofile').hidden = false;
        document.querySelector('#descriptionidedit').hidden = true;
      });
    }
  }, {
    key: 'sendEditPost',
    value: function sendEditPost() {
      var _this9 = this;

      var idfullname = document.getElementById("idfullname").value;

      var csrftoken = getCookie('csrftoken');
      var type = "normal";
      fetch('/editprofile', {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
          idfullname: idfullname,
          type: "fullname"

        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {

        _this9.setState({
          fullname: idfullname,
          trackername: 1

        });
        document.querySelector('#thefullnameidprofile').hidden = false;
        document.querySelector('#thefullnameidedit').hidden = true;
      });
    }
  }, {
    key: 'cancelDes',
    value: function cancelDes() {
      if (this.state.trackerdes == 1) {
        this.setState({
          description: this.state.description
        });
      } else {
        this.setState({
          description: this.props.data["userinfodata"][0].profile_description
        });
      }

      document.querySelector('#descriptionidprofile').hidden = false;
      document.querySelector('#descriptionidedit').hidden = true;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.state.trackername == 1) {
        this.setState({
          fullname: this.state.fullname
        });
      } else {
        this.setState({
          fullname: this.props.data["userinfodata"][0].profile_fullname
        });
      }

      document.querySelector('#thefullnameidprofile').hidden = false;
      document.querySelector('#thefullnameidedit').hidden = true;
    }
  }, {
    key: 'editDes',
    value: function editDes(e) {
      document.querySelector('#descriptionidprofile').hidden = true;
      document.querySelector('#descriptionidedit').hidden = false;
    }
  }, {
    key: 'editProfile',
    value: function editProfile(e) {
      //function above
      /*
      <label class="wa">ลิ้งค์</label>
      <h6>{this.state.first_url}</h6>
      <h6>{this.state.second_url}</h6>
      <h6>{this.state.third_url}</h6>
      <hr></hr>
      */

      document.querySelector('#thefullnameidprofile').hidden = true;
      document.querySelector('#thefullnameidedit').hidden = false;
    }
  }, {
    key: 'changeFeedPortal',
    value: function changeFeedPortal(e) {
      var getcooked = getCookie('csrftoken');
      if (e.target.id == "publicfeedbutid") {
        document.querySelector('#maininfluencer').hidden = false;
        document.querySelector('#reviewsmainfluencer').hidden = true;
        var feedtype = "main";
        fetch('/gotoinfluencer/' + this.props.data["username"] + '/' + feedtype).then(function (response) {
          return response.json();
        }).then(function (data) {

          ReactDOM.render(React.createElement(InfluencerFeedTable, { data: data }), document.querySelector('#maininfluencer'));
        });
      } else if (e.target.id == "reviewfeedbutid") {
        document.querySelector('#maininfluencer').hidden = true;
        document.querySelector('#reviewsmainfluencer').hidden = false;
        var feedtype = "review";
        fetch('/gotoinfluencer/' + this.props.data["username"] + '/' + feedtype).then(function (response) {
          return response.json();
        }).then(function (data) {

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
      } else {
        link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png";
      }
      if (this.state.profilevideo != "") {
        videolink = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.state.profilevideo + ".mp4";
      }

      /*
      if (this.props.data["userinfodata"] != "")
      {
       
          if (this.props.data["userinfodata"] == "")
          {
            console.log("userinfodata is blank fak u")
          }
          else
          {
            console.log("userinfodat is not blank fak u bak")
          }
          
          if (this.props.data["sameperson"] == 1)
          {
            console.log("ok we start doing the edit from here")
          }
      }
      */
      var averagestars = Math.round(10 * this.props.data["averagestars"]) / 10;

      var categoryname = "";

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

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { 'class': 'controlininfluencer' },
            React.createElement(
              'div',
              { 'class': 'divcolumn' },
              React.createElement(
                'div',
                { 'class': 'wud1' },
                React.createElement(
                  'div',
                  { 'class': 'beforehihi' },
                  React.createElement(
                    'div',
                    { 'class': 'hihi' },
                    React.createElement(
                      'div',
                      { 'class': 'insidehihi' },
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
                          { 'class': 'd-flex justify-content-center coverchoosefile' },
                          React.createElement(
                            'label',
                            { 'class': 'chooseprofile2label', 'for': 'choosefile' },
                            '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E39\u0E1B',
                            React.createElement('input', { id: 'choosefile', 'class': 'chooseprofile1 ml-5', onChange: this.chooseFile, type: 'file' })
                          )
                        )
                      ) : null,
                      React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center' },
                        React.createElement(
                          'h1',
                          { 'class': 'usernameininfluencer' },
                          this.props.data['username']
                        )
                      ),
                      React.createElement(
                        'div',
                        { id: 'thefullnameidprofile' },
                        React.createElement(
                          'div',
                          { 'class': 'd-flex justify-content-center' },
                          this.state.fullname
                        )
                      ),
                      this.props.data["sameperson"] == 1 ? React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                          'button',
                          { type: 'button', 'class': 'btn registersmall', onClick: this.editProfile },
                          '\u0E41\u0E01\u0E49\u0E44\u0E02\u0E0A\u0E37\u0E48\u0E2D'
                        )
                      ) : null,
                      React.createElement(
                        'div',
                        { hidden: true, id: 'thefullnameidedit' },
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
                          React.createElement('textarea', { id: 'idfullname', 'class': 'd-flex justify-content-center inputhehore', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.fullname })
                        ),
                        React.createElement(
                          'div',
                          { 'class': 'd-flex justify-content-center' },
                          React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
                            React.createElement(
                              'button',
                              { type: 'button', name: 'edit_post_button', className: 'loll btn btn-outline-success btn-sm mr-2', onClick: this.sendEditPost },
                              '\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01'
                            )
                          ),
                          React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
                            React.createElement(
                              'button',
                              { type: 'button', className: 'loll btn btn-outline-danger btn-sm', name: 'cancel_button', onClick: this.cancel },
                              '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
                            )
                          )
                        )
                      ),
                      React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        this.props.data["userinfodata"] != "" ? React.createElement(
                          'p',
                          { 'class': 'forfont' },
                          categoryname
                        ) : null,
                        React.createElement(
                          'p',
                          { 'class': 'forfont' },
                          this.props.data["reviewnum"],
                          ' \u0E23\u0E35\u0E27\u0E34\u0E27'
                        ),
                        React.createElement(
                          'p',
                          { 'class': 'forfont' },
                          averagestars,
                          React.createElement('span', { id: 'starshow', 'class': 'fa fa-star checked ml-1' })
                        )
                      )
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { 'class': 'wud2' },
                React.createElement(
                  'div',
                  { 'class': 'beforehihi mt-3' },
                  React.createElement(
                    'div',
                    { 'class': 'hihi' },
                    React.createElement(
                      'div',
                      { 'class': 'insidehihi' },
                      React.createElement(
                        'div',
                        { id: 'descriptionidprofile' },
                        React.createElement(
                          'div',
                          null,
                          this.state.description
                        )
                      ),
                      React.createElement(
                        'div',
                        { hidden: true, id: 'descriptionidedit' },
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
                          React.createElement('textarea', { id: 'iddescription', 'class': 'd-flex justify-content-center inputhehore', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.description })
                        ),
                        React.createElement(
                          'div',
                          { 'class': 'd-flex justify-content-center' },
                          React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
                            React.createElement(
                              'button',
                              { type: 'button', name: 'edit_post_button', className: 'loll btn btn-outline-success btn-sm mr-2', onClick: this.sendEditDes },
                              '\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01'
                            )
                          ),
                          React.createElement(
                            'div',
                            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
                            React.createElement(
                              'button',
                              { type: 'button', className: 'loll btn btn-outline-danger btn-sm', name: 'cancel_button', onClick: this.cancelDes },
                              '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01'
                            )
                          )
                        )
                      ),
                      this.props.data["sameperson"] == 1 ? React.createElement(
                        'div',
                        { 'class': 'd-flex justify-content-center mt-2' },
                        React.createElement(
                          'button',
                          { type: 'button', 'class': 'btn registersmall', onClick: this.editDes },
                          '\u0E41\u0E01\u0E49\u0E44\u0E02\u0E44\u0E1A\u0E42\u0E2D'
                        )
                      ) : null
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center mt-5' },
                this.props.data["userinfodata"][0]["price"] != null ? this.props.data.accountstatus == 1 ? this.props.data["sameperson"] != 1 ? React.createElement(
                  'a',
                  { name: 'posterr', 'class': 'btn reservebutton', href: bookhtmllink },
                  '\u0E08\u0E2D\u0E07\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49: ',
                  this.props.data["userinfodata"][0]["price"],
                  '\u0E3F'
                ) : React.createElement('div', null) : React.createElement(
                  'div',
                  null,
                  '\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2B\u0E22\u0E38\u0E14\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27'
                ) : React.createElement(
                  'div',
                  null,
                  '\u0E2A\u0E15\u0E32\u0E23\u0E4C\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E17\u0E4D\u0E32\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19'
                ),
                ' '
              )
            ),
            this.state.edit,
            React.createElement(
              'div',
              null,
              videolink == "" ? React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center' },
                React.createElement(
                  'div',
                  { 'class': 'covercoverwanopostyet mt-5' },
                  React.createElement(
                    'div',
                    { 'class': 'coverwanopostyet' },
                    React.createElement(
                      'div',
                      { 'class': 'd-flex justify-content-center' },
                      React.createElement(
                        'h6',
                        { 'class': 'wanopostyet' },
                        '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E41\u0E19\u0E30\u0E19\u0E4D\u0E32\u0E15\u0E31\u0E27'
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'div',
                      { 'class': 'd-flex justify-content-center' },
                      this.props.data["sameperson"] == 1 ? React.createElement(
                        'video',
                        { autoplay: 'true', muted: 'true', 'class': 'almostvideovideowhenget', id: 'introvideo', controls: true },
                        React.createElement('source', { src: videolink, type: 'video/mp4' }),
                        'Your browser does not support the video tag.'
                      ) : null
                    ),
                    this.props.data["sameperson"] == 1 ? React.createElement(
                      'div',
                      { 'class': 'custom-filee mt-2' },
                      React.createElement(
                        'div',
                        { 'class': 'videouploadininfluencer' },
                        React.createElement(
                          'label',
                          { 'class': 'chooseprofile3label', 'for': 'inputGroupFile01' },
                          '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E41\u0E19\u0E30\u0E19\u0E4D\u0E32\u0E15\u0E31\u0E27',
                          React.createElement('input', { type: 'file', onChange: this.chooseFileVideo, 'class': 'chooseprofile1', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' })
                        )
                      )
                    ) : null
                  )
                )
              ) : React.createElement(
                'div',
                { 'class': 'd-flex justify-content-center' },
                React.createElement(
                  'div',
                  { 'class': 'd-flex flex-column' },
                  React.createElement(
                    'div',
                    { 'class': 'd-flex justify-content-center ' },
                    videolink == "" ? null : React.createElement(
                      'video',
                      { autoplay: 'true', muted: 'true', 'class': 'almostvideovideowhenget', id: 'introvideo', controls: true },
                      React.createElement('source', { src: videolink, type: 'video/mp4' }),
                      'Your browser does not support the video tag.'
                    )
                  ),
                  this.props.data["sameperson"] == 1 ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                      'div',
                      null,
                      React.createElement(
                        'div',
                        { 'class': 'custom-file mt-4' },
                        React.createElement(
                          'div',
                          { 'class': 'videouploadininfluencer' },
                          React.createElement(
                            'label',
                            { 'class': 'chooseprofile3label', 'for': 'inputGroupFile01' },
                            '\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E41\u0E19\u0E30\u0E19\u0E4D\u0E32\u0E15\u0E31\u0E27',
                            React.createElement('input', { type: 'file', onChange: this.chooseFileVideo, 'class': 'chooseprofile1', id: 'inputGroupFile01', 'aria-describedby': 'inputGroupFileAddon01' })
                          )
                        )
                      )
                    )
                  ) : React.createElement('div', { 'class': 'd-flex justify-content-center mt-3' })
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
            '*\u0E40\u0E27\u0E47\u0E1B\u0E44\u0E0B\u0E15\u0E4C\u0E08\u0E30\u0E42\u0E0A\u0E22\u0E4C 9 \u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E16\u0E49\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E0B\u0E49\u0E2D\u0E19\u0E27\u0E35\u0E14\u0E35\u0E42\u0E2D*'
          )
        ) : null
      );
    }
  }]);

  return InfluencerFeedTitle;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
  var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
  var feedtype = "main";

  fetch('/gotoinfluencer/' + influencerusername + '/' + feedtype).then(function (response) {
    return response.json();
  }).then(function (data) {

    ReactDOM.render(React.createElement(InfluencerFeedTitle, { data: data }), document.querySelector('#toppart'));
    ReactDOM.render(React.createElement(InfluencerFeedTable, { data: data }), document.querySelector('#maininfluencer'));

    //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));

  });
});