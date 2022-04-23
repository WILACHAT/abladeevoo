function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

class Information extends React.Component{
    constructor(props) {
        super(props);
        this.chooseFile = this.chooseFile.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.checkTxtArea = this.checkTxtArea.bind(this);
        this.state = 
        {
          firstname: this.props.data["data"][0].first_name,
          lastname: this.props.data["data"][0].last_name,
          email: this.props.data["data"][0].email,
          username: this.props.data["data"][0].username,
          profilepic: this.props.data["data"][0].normal_user_pic,

        }


    };
    checkTxtArea(e)
    {
      if (e.target.id == "firstname")
      {
          if (e.target.value.length > 0) {
              this.setState({firstname: e.target.value});
          }
          else {
              this.setState({firstname: ""});
          }
      }
      if (e.target.id == "lastname")
      {
          if (e.target.value.length > 0) {
              console.log(e.target.value)
              this.setState({lastname: e.target.value});
          }
          else {
              this.setState({lastname: ""});
          }
      }
      if (e.target.id == "username")
      {
          if (e.target.value.length > 0) {
              console.log(e.target.value)
              this.setState({username: e.target.value});
          }
          else {
              this.setState({first_url: ""});
          }
      }
      if (e.target.id == "lastname")
      {
          if (e.target.value.length > 0) {
              console.log(e.target.value)
              this.setState({lastname: e.target.value});
          }
          else {
              this.setState({lastname: ""});
          }
      }
     
    }
    chooseFile(e) 
    {
      const getcooked = getCookie('csrftoken')
      let fileInput = document.querySelector('#choosefile').files[0]
      console.log("this is fileinput", fileInput)

      console.log("this is in choose file")

      let formData = new FormData();
      formData.append("media", fileInput);
      let type = "imageinprofile"
      console.log("formdata", formData)
      fetch(`/forupload/${type}`, {
        method: 'POST',
        headers: {'X-CSRFToken': getcooked
        },
        body:formData
    })
    .then(response => response.json())
        .then(result =>{
            document.querySelector('#profilepicture').value = result['url']
            document.querySelector('#profilepicture').src = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + result['url'] + ".jpg"

        });


    }
   
    saveChanges(e) 
    {      

      let profilepic = document.querySelector('#profilepicture').value
      let firstname = document.querySelector('#firstname').value
      let lastname = document.querySelector('#lastname').value
      let email = document.querySelector('#email').value
      let username = document.querySelector('#username').value
      
        let getcooked = getCookie('csrftoken');
        fetch(`/usersettingapi`, {
          method: 'POST',
          headers: {'X-CSRFToken': getcooked
          },
          body: JSON.stringify({
            profilepic: profilepic,
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username
        })
    })
    .then(response => response.json())
        .then(result =>{
          window.location.href = "/";

        })

    }
      render() 
      {
      let link = ""
      console.log("what", this.state.profilepic)
      if (this.state.profilepic != "")
      {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.state.profilepic + ".jpg"
        console.log("this is the new type of if in image")
      }
   
        console.log("this", this.props.data["data"][0])
        return (
          <div>
          <label>Change your settings or add stuff! (If you want to)</label><br></br>

          
          <label>Change Profile Picture</label>
          <input id="choosefile" class="choosefile" onChange={this.chooseFile} type="file"></input>
          <img id="profilepicture" class="imgnoedit" value="" src={link}></img>
          <br></br>

         
          <label>First Name</label>
          <input type="text" onChange={this.checkTxtArea} id="firstname" value={this.state.firstname != "" ? this.state.firstname:""}></input>
          <br></br>

          <label>Last Name</label>
          <input type="text" onChange={this.checkTxtArea} id="lastname" value={this.state.lastname != "" ? this.state.lastname:""}></input>
          <br></br>


          <label>Email</label>
          <input type="text" onChange={this.checkTxtArea} id="email" value={this.state.email}></input>
          <br></br>


          <label>Username</label>
          <input type="text" onChange={this.checkTxtArea} id="username" value={this.state.username}></input>
          <br></br>
          

         <button class="btn btn-primary" onClick={this.saveChanges}>Save Changes</button>


          </div>
        );
      }
  }


document.addEventListener('DOMContentLoaded', function() {
    fetch(`/usersettingapi`)
    .then(response => response.json())
    .then(data => {        
      console.log("this is data wtf", data)
      ReactDOM.render(<Information data={data}/>, document.querySelector('#inputforchange'));
  
    });
  
   
  });
  