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

var Information = function (_React$Component) {
    _inherits(Information, _React$Component);

    function Information(props) {
        _classCallCheck(this, Information);

        var _this = _possibleConstructorReturn(this, (Information.__proto__ || Object.getPrototypeOf(Information)).call(this, props));

        _this.chooseFile = _this.chooseFile.bind(_this);
        _this.saveChanges = _this.saveChanges.bind(_this);
        _this.checkTxtArea = _this.checkTxtArea.bind(_this);
        _this.state = {
            firstname: _this.props.data["data"][0].first_name,
            lastname: _this.props.data["data"][0].last_name,
            email: _this.props.data["data"][0].email,
            username: _this.props.data["data"][0].username,
            profilepic: _this.props.data["data"][0].normal_user_pic

        };

        return _this;
    }

    _createClass(Information, [{
        key: 'checkTxtArea',
        value: function checkTxtArea(e) {
            if (e.target.id == "firstname") {
                if (e.target.value.length > 0) {
                    this.setState({ firstname: e.target.value });
                } else {
                    this.setState({ firstname: "" });
                }
            }
            if (e.target.id == "lastname") {
                if (e.target.value.length > 0) {
                    console.log(e.target.value);
                    this.setState({ lastname: e.target.value });
                } else {
                    this.setState({ lastname: "" });
                }
            }
            if (e.target.id == "username") {
                if (e.target.value.length > 0) {
                    console.log(e.target.value);
                    this.setState({ username: e.target.value });
                } else {
                    this.setState({ first_url: "" });
                }
            }
            if (e.target.id == "lastname") {
                if (e.target.value.length > 0) {
                    console.log(e.target.value);
                    this.setState({ lastname: e.target.value });
                } else {
                    this.setState({ lastname: "" });
                }
            }
        }
    }, {
        key: 'chooseFile',
        value: function chooseFile(e) {
            var getcooked = getCookie('csrftoken');
            var fileInput = document.querySelector('#choosefile').files[0];
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
                document.querySelector('#profilepicture').value = result['url'];
                document.querySelector('#profilepicture').src = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + result['url'] + ".jpg";
            });
        }
    }, {
        key: 'saveChanges',
        value: function saveChanges(e) {

            var profilepic = document.querySelector('#profilepicture').value;
            var firstname = document.querySelector('#firstname').value;
            var lastname = document.querySelector('#lastname').value;
            var email = document.querySelector('#email').value;
            var username = document.querySelector('#username').value;

            var getcooked = getCookie('csrftoken');
            fetch('/usersettingapi', {
                method: 'POST',
                headers: { 'X-CSRFToken': getcooked
                },
                body: JSON.stringify({
                    profilepic: profilepic,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username
                })
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                window.location.href = "/";
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var link = "";
            console.log("what", this.state.profilepic);
            if (this.state.profilepic != "") {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.state.profilepic + ".jpg";
                console.log("this is the new type of if in image");
            }

            console.log("this", this.props.data["data"][0]);
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    null,
                    'Change your settings or add stuff! (If you want to)'
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Change Profile Picture'
                ),
                React.createElement('input', { id: 'choosefile', 'class': 'choosefile', onChange: this.chooseFile, type: 'file' }),
                React.createElement('img', { id: 'profilepicture', 'class': 'imgnoedit', value: '', src: link }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'First Name'
                ),
                React.createElement('input', { type: 'text', onChange: this.checkTxtArea, id: 'firstname', value: this.state.firstname != "" ? this.state.firstname : "" }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Last Name'
                ),
                React.createElement('input', { type: 'text', onChange: this.checkTxtArea, id: 'lastname', value: this.state.lastname != "" ? this.state.lastname : "" }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Email'
                ),
                React.createElement('input', { type: 'text', onChange: this.checkTxtArea, id: 'email', value: this.state.email }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Username'
                ),
                React.createElement('input', { type: 'text', onChange: this.checkTxtArea, id: 'username', value: this.state.username }),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { 'class': 'btn btn-primary', onClick: this.saveChanges },
                    'Save Changes'
                )
            );
        }
    }]);

    return Information;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    fetch('/usersettingapi').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("this is data wtf", data);
        ReactDOM.render(React.createElement(Information, { data: data }), document.querySelector('#inputforchange'));
    });
});