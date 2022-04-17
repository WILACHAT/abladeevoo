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

    return _possibleConstructorReturn(this, (InfluencerFeedRows.__proto__ || Object.getPrototypeOf(InfluencerFeedRows)).call(this, props));
  }

  _createClass(InfluencerFeedRows, [{
    key: 'render',
    value: function render() {
      var thewholereturn = "";
      if (this.props.feedtype == "main") {
        var link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4";
        thewholereturn = React.createElement(
          'video',
          { id: 'testervideo', width: '320', height: '240', controls: true },
          React.createElement('source', { src: link }),
          'Your browser does not support the video tag.'
        );
      } else {
        thewholereturn = React.createElement(
          'h4',
          null,
          this.props.data
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

      console.log("finding the feedtype", this.props.data["feedtype"]);
      console.log("finding the feedtype hehehe", this.props.data["alldata"]);

      var rows = [];

      for (var i = 0; i < this.props.data["alldata"].length; i++) {
        rows.push(React.createElement(InfluencerFeedRows, {
          data: this.props.data["alldata"][i],
          feedtype: this.props.data["feedtype"] }));
      }

      return React.createElement(
        'div',
        null,
        this.props.data["feedtype"] == "main" ? React.createElement(
          'h1',
          null,
          'Example Posts'
        ) : React.createElement(
          'h1',
          null,
          'Revies of Customers'
        ),
        React.createElement(
          'table',
          { className: 'table table-hover table-sm' },
          rows
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

    var _this3 = _possibleConstructorReturn(this, (EditPost.__proto__ || Object.getPrototypeOf(EditPost)).call(this, props));

    _this3.editPost = _this3.editPost.bind(_this3);
    _this3.editCancel = _this3.editCancel.bind(_this3);
    _this3.checkTxtArea = _this3.checkTxtArea.bind(_this3);
    console.log("this.props.fillname", _this3.props.fullname);
    console.log("this.props.profilepic", _this3.props.profilepic);

    _this3.state = {
      fullname: _this3.props.fullname,
      description: _this3.props.description,
      first_url: _this3.props.first_url,
      second_url: _this3.props.second_url,
      third_url: _this3.props.third_url,
      profilepic: _this3.props.profilepic,
      introvideo: _this3.props.introvideo
    };
    return _this3;
  }

  _createClass(EditPost, [{
    key: 'chooseFile',
    value: function chooseFile(e) {
      var getcooked = getCookie('csrftoken');
      var fileInput = document.querySelector('#choosefile').files[0];

      console.log("this is in choose file");

      console.log("full name", this.state.fullname);
      console.log("profile pic", this.state.profilepic);

      console.log("i just wantto see the profilepic", this.props.profilepic);

      var formData = new FormData();
      formData.append("media", fileInput);
      var type = "image";
      /* fetch(`/forupload/${type}`, {
         method: 'POST',
         headers: {'X-CSRFToken': getcooked
         },
         body:formData
      })
      .then(response => response.json())
         .then(result =>{
             console.log("result", result)
             console.log(result['url'])
             let pictureid = result['url'].split("/")[7].split(".")[0]
             console.log("is this pictureid we will c", pictureid)
             console.log(pictureid)
               this.setState({profilepic: pictureid});
         });
      */
    }
  }, {
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
          'h1',
          null,
          this.state.hi
        ),
        React.createElement(
          'div',
          { 'class': 'd-flex justify-content-center mt-1 mb-1' },
          React.createElement(
            'label',
            { htmlFor: 'edit_post_txt' },
            'Click to change profile picture: '
          )
        ),
        React.createElement(
          'div',
          { 'class': 'd-flex justify-content-center' },
          React.createElement(
            'div',
            { id: 'coverschoosefile' },
            React.createElement('input', { id: 'choosefile', 'class': 'choosefile', onChange: this.chooseFile, type: 'file' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-floating' },
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Full Name: '
            ),
            React.createElement('textarea', { id: 'idfullname', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.fullname })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-1 mb-1' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Page Description: '
            ),
            React.createElement('textarea', { id: 'iddescription', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.description })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Url 1: '
            ),
            React.createElement('textarea', { id: 'idurl1', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.first_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Url 2: '
            ),
            React.createElement('textarea', { id: 'idurl2', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.second_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Url 3: '
            ),
            React.createElement('textarea', { id: 'idurl3', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.third_url })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'label',
              { htmlFor: 'edit_post_txt' },
              'Video: '
            ),
            React.createElement('textarea', { id: 'profiledes', 'class': 'd-flex justify-content-center', ref: this.textInput, name: 'edit_post_txt', style: { height: 100 + 'px' }, onChange: this.checkTxtArea, value: this.state.profiledes })
          ),
          React.createElement(
            'div',
            { 'class': 'd-flex justify-content-center mt-2 mb-2' },
            React.createElement(
              'button',
              { type: 'button', name: 'edit_post_button', className: 'loll btn btn-outline-success btn-sm mr-2', onClick: this.editPost },
              'Save'
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'loll btn btn-outline-danger btn-sm', name: 'cancel_button', onClick: this.editCancel },
              'Cancel'
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

    var _this4 = _possibleConstructorReturn(this, (InfluencerFeedTitle.__proto__ || Object.getPrototypeOf(InfluencerFeedTitle)).call(this, props));

    _this4.changeFeedPortal = _this4.changeFeedPortal.bind(_this4);
    _this4.editProfile = _this4.editProfile.bind(_this4);
    _this4.cancel = _this4.cancel.bind(_this4);
    //  this.showImg = this.showImg.bind(this);
    _this4.sendEditPost = _this4.sendEditPost.bind(_this4);

    document.querySelector('#maininfluencer').hidden = false;
    document.querySelector('#reviewsmainfluencer').hidden = true;

    var fullname = "";
    var description = "";
    var profilepic = "";
    var introvideo = "";
    var first_url = "";
    var second_url = "";
    var third_url = "";

    if (_this4.props.data["userinfodata"][0] != null) {
      if (_this4.props.data["userinfodata"][0].profile_picture != null) {
        profilepic = _this4.props.data["userinfodata"][0].profile_picture;
      }
      if (_this4.props.data["userinfodata"][0].profile_fullname != null) {
        fullname = _this4.props.data["userinfodata"][0].profile_fullname;
      }
      if (_this4.props.data["userinfodata"][0].profile_description != null) {
        description = _this4.props.data["userinfodata"][0].profile_description;
      }
      if (_this4.props.data["userinfodata"][0].first_url != null) {
        first_url = _this4.props.data["userinfodata"][0].first_url;
      }
      if (_this4.props.data["userinfodata"][0].second_url != null) {
        second_url = _this4.props.data["userinfodata"][0].second_url;
      }
      if (_this4.props.data["userinfodata"][0].third_url != null) {
        third_url = _this4.props.data["userinfodata"][0].second_url;
      }
      if (_this4.props.data["userinfodata"][0].profile_video != null) {
        introvideo = _this4.props.data["userinfodata"][0].profile_video;
      }
    }

    //let link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + profilepic + ".jpg"

    _this4.state = {
      fullname: fullname,
      description: description,
      first_url: first_url,
      second_url: second_url,
      third_url: third_url,
      profilepic: profilepic,
      introvideo: introvideo,

      edit: React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { onClick: _this4.showImg, 'class': 'd-flex justify-content-center' },
          React.createElement('img', { 'class': 'imgnoedit', src: '' })
        ),
        React.createElement(
          'h4',
          null,
          'Name'
        ),
        React.createElement(
          'h5',
          null,
          fullname
        ),
        React.createElement(
          'h5',
          null,
          'Description'
        ),
        React.createElement(
          'h6',
          null,
          description
        ),
        React.createElement(
          'h5',
          null,
          'Links'
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
        React.createElement(
          'h6',
          null,
          'Introduction Video'
        ),
        React.createElement(
          'h6',
          null,
          'Video'
        )
      )

    };
    return _this4;
  }

  _createClass(InfluencerFeedTitle, [{
    key: 'sendEditPost',
    value: function sendEditPost(yo) {
      var idfullname = document.getElementById("idfullname").value;
      var iddescription = document.getElementById("iddescription").value;
      var idurl1 = document.getElementById("idurl1").value;
      var idurl2 = document.getElementById("idurl2").value;
      var idurl3 = document.getElementById("idurl3").value;
      console.log("idfullname", idfullname);
      console.log("iddescription", iddescription);
      console.log("idurl1", idurl1);
      console.log("idurl2", idurl2);
      console.log("idurl3", idurl3);
      console.log("yoyo", yo);
      var csrftoken = getCookie('csrftoken');
      var type = "normal";
      fetch('/editprofile/' + type, {
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
        //this is the place where you set state of your profile
        //back to the normal page
        console.log("result", result);
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
            'div',
            { onClick: this.showImg, 'class': 'd-flex justify-content-center' },
            React.createElement('img', { 'class': 'imgnoedit', src: this.state.profilepic })
          ),
          React.createElement(
            'h4',
            null,
            'Name'
          ),
          React.createElement(
            'h5',
            null,
            this.state.fullname
          ),
          React.createElement(
            'h5',
            null,
            'Description'
          ),
          React.createElement(
            'h6',
            null,
            this.state.description
          ),
          React.createElement(
            'h5',
            null,
            'Links'
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
          React.createElement(
            'h6',
            null,
            'Introduction Video'
          ),
          React.createElement(
            'h6',
            null,
            'Video'
          )
        )
      });
    }
  }, {
    key: 'editProfile',
    value: function editProfile(e) {
      //go to edit thingy ok??
      //the jon of this state is to essentially send the value to EditPost


      console.log("inside editprofile button/ function");
      console.log("profilepci in editprofile", this.state.profilepic);
      console.log("profilepci in editprofile", this.state.fullname);

      this.setState({
        fullname: this.state.fullname,
        description: this.state.description,
        first_url: this.state.first_url,
        second_url: this.state.second_url,
        third_url: this.state.third_url,
        profilepic: this.state.profilepic,
        introvideo: this.state.introvideo,

        edit: React.createElement(EditPost, { savePostHandler: this.sendEditPost, cancel: this.cancel,
          fullname: this.state.fullname, description: this.state.description, first_url: this.state.first_url,
          second_url: this.state.second_url, third_url: this.state.third_url, profilepic: this.state.profilepic,
          introvideo: this.state.introvideo })

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
      console.log("WILACHAT", this.state.profilepic);

      var bookhtmllink = "/book/" + this.props.data["username"];
      if (this.props.data["userinfodata"] == "") {
        console.log("userinfodata is blank fak u");
      } else {
        console.log("userinfodat is not blank fak u bak");
      }
      console.log("sameperson", this.props.data["sameperson"]);

      if (this.props.data["sameperson"] == 1) {
        console.log("ok we start doing the edit from here");
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          this.props.data['username']
        ),
        React.createElement(
          'button',
          { type: 'button', 'class': 'btn btn-primary', id: 'publicfeedbutid', onClick: this.changeFeedPortal },
          'Public Feed'
        ),
        React.createElement(
          'button',
          { type: 'button', 'class': 'btn btn-primary', id: 'reviewfeedbutid', onClick: this.changeFeedPortal },
          'Reviews'
        ),
        this.props.data["sameperson"] != 1 ? React.createElement(
          'a',
          { name: 'posterr', 'class': 'btn btn-primary', href: bookhtmllink },
          'Reserve'
        ) : React.createElement(
          'button',
          { type: 'button', 'class': 'btn btn-success', onClick: this.editProfile },
          'Edit'
        ),
        this.state.edit
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