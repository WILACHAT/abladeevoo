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
              this.setState({username: ""});
          }
      }
      if (e.target.id == "email")
      {
          if (e.target.value.length > 0) {
              console.log(e.target.value)
              this.setState({email: e.target.value});
          }
          else {
              this.setState({email: ""});
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
            console.log("profilepicresult", result)
            if (result["error"] != null)
            {
              Swal.fire({
                icon: 'error',
                title: 'อุ๊ยยย',
                text: 'ต้องเป็นรูปแต่ดันอัพโหลดวีดีโอ!',
              })
            }
            else
            {
              Swal.fire({
                icon: 'success',
                title: 'อิอิ',
                text: 'เปลี่ยนรูปสําเร็จ!',
              })
              document.querySelector('#profilepicture').value = result['url']
              document.querySelector('#profilepicture').src = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + result['url'] + ".jpg"  
            }
            
         
        });
      
      
     
   


    }
   
    saveChanges(e) 
    {      

      
      let profilepic = document.querySelector('#profilepicture').value
      let firstname = document.querySelector('#firstname').value
      let lastname = document.querySelector('#lastname').value
      let email = document.querySelector('#email').value
      let username = document.querySelector('#username').value
      console.log("something wrong in profilepic", profilepic)

      
        let getcooked = getCookie('csrftoken');
        fetch(`/usersettingapi`, {
          method: 'POST',
          headers: {'X-CSRFToken': getcooked
          },
          body: JSON.stringify({
            profilepic: this.state.profilepic,
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username
        })
    })
    .then(response => response.json())
        .then(result =>{
          console.log("resul error", result["error"])
          if (result["error"] != null)
          {
            if (result["error"] == "mail")
            {
              Swal.fire({
                icon: 'error',
                title: 'อุ๊ยยย',
                text: 'อีเมลนี้มีผู้ใช้แล้ว!',
              })
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'อุ๊ยยย',
                text: 'ยูเซอเนมนี้มีผู้ใช้แล้ว!'

              })
            }
          }
          else
          {
            Swal.fire({
                icon: 'success',
                title: 'อิอิอิ',
                text: 'เปลี่ยนแปลงสําเร็จ!',
                footer: '<a href="/">กลับหน้าหลัก</a>'

              })
          }

        })

    }
      render() 
      {
      let link = ""
      console.log("what", this.state.profilepic)
      if (this.state.profilepic != null)
      {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.state.profilepic + ".jpg"
        console.log("this is the new type of if in image")
      }
      else
      {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
      }
   
        console.log("this", this.props.data["data"][0])
        return (
          <div>
          <div class="d-flex justify-content-center">

          <div class="settingbackground">
          <label class="headingsetting">เปลี่ยนการตั้งค่าหรือเพิ่มข้อมูล</label><br></br>
          <div class="d-flex flex-column">
              <div class="d-flex justify-content-center">
                <label class="labelsetting" >เปลี่ยนรูปโปรไฟล์</label><br></br>
              </div>
              <div class="d-flex justify-content-center mt-1">
                <img id="profilepicture" class="imgnoedit" value="" src={link}></img>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <input id="choosefile" class="choosefile" onChange={this.chooseFile} type="file"></input>
            </div>
          </div>


          <br></br>


          <label class="labelsetting">ชื่อจริง</label><br></br>
          <input type="text" onChange={this.checkTxtArea} class="settinginput" id="firstname" value={this.state.firstname != "" ? this.state.firstname:""}></input>
          <br></br>

          <label class="labelsetting">นามสกุล</label><br></br>
          <input type="text" onChange={this.checkTxtArea} class="settinginput" id="lastname" value={this.state.lastname != "" ? this.state.lastname:""}></input>
          <br></br>


          <label class="labelsetting">อีเมล</label><br></br>
          <input type="text" onChange={this.checkTxtArea} class="settinginput" id="email" value={this.state.email}></input>
          <br></br>


          <label class="labelsetting">ชื่อผู้ใช้</label><br></br>
          <input type="text" onChange={this.checkTxtArea} class="settinginput" id="username" value={this.state.username}></input>
          <br></br>


         <button class="btn registerbtn mt-3" onClick={this.saveChanges}>บันทึกการเปลี่ยนแปลง</button>

          </div>
          </div>


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
  