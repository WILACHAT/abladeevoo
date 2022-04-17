
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
class InfluencerFeedRows extends React.Component {
constructor(props) {
  super(props);
}
render()
{
  let thewholereturn = ""
  if (this.props.feedtype == "main")
  {
    let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4"
    thewholereturn = 
    <video id="testervideo" width="320" height="240" controls>
      <source src={link}></source>
      Your browser does not support the video tag.
    </video>
  }
  else
  {
    thewholereturn =  <h4>{this.props.data}</h4>
  }
  
  return(
    <div>
        {thewholereturn}
    </div>
  )
}

}
class InfluencerFeedTable extends React.Component {
  constructor(props) {
    super(props);
  }
    render()
    {

      console.log("finding the feedtype", this.props.data["feedtype"])
      console.log("finding the feedtype hehehe", this.props.data["alldata"])

      const rows = [];

      for (let i = 0; i < this.props.data["alldata"].length; i++)
      {
        rows.push( 
          <InfluencerFeedRows 
          data={this.props.data["alldata"][i]}
          feedtype={this.props.data["feedtype"]}/>
        );
      }
    
      return (
        <div>
            {this.props.data["feedtype"] == "main" ? <h1>Example Posts</h1>:<h1>Revies of Customers</h1>}
            <table className="table table-hover table-sm">
              {rows}
            </table>
        </div>
      )
    }
  }
  class EditPost extends React.Component {
    constructor(props)
    {
      super(props)
      this.editPost = this.editPost.bind(this);
      this.editCancel = this.editCancel.bind(this);
      this.checkTxtArea = this.checkTxtArea.bind(this);
      console.log("this.props.fillname", this.props.fullname)
      console.log("this.props.profilepic", this.props.profilepic)

      this.state = {
        fullname: this.props.fullname,
        description: this.props.description,
        first_url: this.props.first_url,
        second_url: this.props.second_url,
        third_url: this.props.third_url,
        profilepic:this.props.profilepic,
        introvideo:this.props.introvideo
      };
    }
    chooseFile(e)
    {
      const getcooked = getCookie('csrftoken')
      let fileInput = document.querySelector('#choosefile').files[0]

      console.log("this is in choose file")


      console.log("full name", this.state.fullname)
      console.log("profile pic", this.state.profilepic)

      console.log("i just wantto see the profilepic", this.props.profilepic)

      let formData = new FormData();
      formData.append("media", fileInput);
      let type = "image"
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
    editCancel(e)
    {
      this.props.cancel();
    }
    editPost(e)
    {
      this.props.savePostHandler("confused");
    }
    checkTxtArea(e)
    {
        if (e.target.id == "idfullname")
        {
            if (e.target.value.length > 0) {
                this.setState({fullname: e.target.value});
            }
            else {
                this.setState({fullname: ""});
            }
        }
        if (e.target.id == "iddescription")
        {
            if (e.target.value.length > 0) {
                console.log(e.target.value)
                this.setState({description: e.target.value});
            }
            else {
                this.setState({description: ""});
            }
        }
        if (e.target.id == "idurl1")
        {
            if (e.target.value.length > 0) {
                console.log(e.target.value)
                this.setState({first_url: e.target.value});
            }
            else {
                this.setState({first_url: ""});
            }
        }
        if (e.target.id == "idurl2")
        {
            if (e.target.value.length > 0) {
                console.log(e.target.value)
                this.setState({second_url: e.target.value});
            }
            else {
                this.setState({second_url: ""});
            }
        }
        if (e.target.id == "idurl3")
        {
            if (e.target.value.length > 0) {
                console.log(e.target.value)
                this.setState({third_url: e.target.value});
            }
            else {
                this.setState({third_url: ""});
            }
        }
    }

  render(){
    return (
        <div>
            <h1>{this.state.hi}</h1>
            <div class="d-flex justify-content-center mt-1 mb-1">
                    <label htmlFor="edit_post_txt">Click to change profile picture: </label>
                </div>
                <div class="d-flex justify-content-center">
                    <div id="coverschoosefile">
                        {<input id="choosefile" class="choosefile" onChange={this.chooseFile} type="file"></input>}
                    </div>
                </div>
                <div className="form-floating">
                    <div class="d-flex justify-content-center mt-1 mb-1">
                    <label htmlFor="edit_post_txt">Full Name: </label>
                    <textarea id="idfullname" class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.fullname}></textarea>

                    </div>

                    <div class="d-flex justify-content-center mt-1 mb-1">
                    <label htmlFor="edit_post_txt">Page Description: </label>
                    <textarea id="iddescription" class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.description}></textarea>

                    </div>
                    
                    <div class="d-flex justify-content-center mt-2 mb-2">
                    <label htmlFor="edit_post_txt">Url 1: </label>
                    <textarea id="idurl1"  class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.first_url}></textarea>
                    </div>

                         
                    <div class="d-flex justify-content-center mt-2 mb-2">
                    <label htmlFor="edit_post_txt">Url 2: </label>
                    <textarea id="idurl2"  class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.second_url}></textarea>
                    </div>

                         
                    <div class="d-flex justify-content-center mt-2 mb-2">
                    <label htmlFor="edit_post_txt">Url 3: </label>
                    <textarea id="idurl3"  class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.third_url}></textarea>
                    </div>

                    <div class="d-flex justify-content-center mt-2 mb-2">
                    <label htmlFor="edit_post_txt">Video: </label>
                    <textarea id="profiledes"  class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.profiledes}></textarea>

                    </div> 
                    
                    <div class="d-flex justify-content-center mt-2 mb-2">
                        <button type="button" name="edit_post_button" className="loll btn btn-outline-success btn-sm mr-2" onClick={this.editPost}>Save</button>
                        <button type="button"className="loll btn btn-outline-danger btn-sm" name="cancel_button" onClick={this.editCancel}>Cancel</button>
                    </div>
                
                </div>
        </div>
    );
}
}


class InfluencerFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedPortal = this.changeFeedPortal.bind(this);
      this.editProfile = this.editProfile.bind(this);
      this.cancel = this.cancel.bind(this);
    //  this.showImg = this.showImg.bind(this);
      this.sendEditPost = this.sendEditPost.bind(this);

  
      document.querySelector('#maininfluencer').hidden = false;
      document.querySelector('#reviewsmainfluencer').hidden = true;

      let fullname = ""
      let description = ""
      let profilepic = ""
      let introvideo = ""
      let first_url = ""
      let second_url = ""
      let third_url = ""
      
      if (this.props.data["userinfodata"][0] != null)
      {
          if (this.props.data["userinfodata"][0].profile_picture != null)
          {
            profilepic = this.props.data["userinfodata"][0].profile_picture
          }
          if(this.props.data["userinfodata"][0].profile_fullname != null)
          {
            fullname = this.props.data["userinfodata"][0].profile_fullname
          }
          if(this.props.data["userinfodata"][0].profile_description != null)
          {
            description = this.props.data["userinfodata"][0].profile_description
          }
          if(this.props.data["userinfodata"][0].first_url != null)
          {
            first_url = this.props.data["userinfodata"][0].first_url
          }
          if(this.props.data["userinfodata"][0].second_url != null)
          {
            second_url = this.props.data["userinfodata"][0].second_url
          }
          if(this.props.data["userinfodata"][0].third_url != null)
          {
            third_url = this.props.data["userinfodata"][0].second_url
          }
          if(this.props.data["userinfodata"][0].profile_video != null)
          {
            introvideo = this.props.data["userinfodata"][0].profile_video
          }
      }
    

      //let link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + profilepic + ".jpg"

      this.state = {
        fullname: fullname,
        description: description,
        first_url: first_url,
        second_url: second_url,
        third_url: third_url,
        profilepic:profilepic,
        introvideo:introvideo,


        edit:
          <div>
          <div onClick={this.showImg} class="d-flex justify-content-center">
            <img class="imgnoedit" src=""></img>
          </div>
             <h4>Name</h4>
              <h5>{fullname}</h5>
            <h5>Description</h5>
              <h6>{description}</h6>
            <h5>Links</h5>
              <h6>{first_url}</h6>
              <h6>{second_url}</h6>
             <h6>{third_url}</h6>
            <h6>Introduction Video</h6>
            <h6>Video</h6>
          </div>

        }
    }
    sendEditPost(yo)
    {
      let idfullname = document.getElementById("idfullname").value
      let iddescription = document.getElementById("iddescription").value
      let idurl1 = document.getElementById("idurl1").value
      let idurl2 = document.getElementById("idurl2").value
      let idurl3 = document.getElementById("idurl3").value
      console.log("idfullname", idfullname)
      console.log("iddescription", iddescription)
      console.log("idurl1", idurl1)
      console.log("idurl2", idurl2)
      console.log("idurl3", idurl3)
      console.log("yoyo", yo)
      const csrftoken = getCookie('csrftoken');
      let type = "normal"
      fetch(`/editprofile/${type}`, {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            idfullname: idfullname,
            iddescription: iddescription,
            idurl1: idurl1,
            idurl2: idurl2,
            idurl3: idurl3
        })
    })
    .then(response => response.json())
        .then(result =>{
            //this is the place where you set state of your profile
            //back to the normal page
            console.log("result", result)
        });




    }
    cancel()
    {
      this.setState({

        edit:
          <div>
            <div onClick={this.showImg} class="d-flex justify-content-center">
            <img class="imgnoedit" src={this.state.profilepic}></img>
          </div>
             <h4>Name</h4>
              <h5>{this.state.fullname}</h5>
            <h5>Description</h5>
              <h6>{this.state.description}</h6>
            <h5>Links</h5>
              <h6>{this.state.first_url}</h6>
              <h6>{this.state.second_url}</h6>
             <h6>{this.state.third_url}</h6>
            <h6>Introduction Video</h6>
            <h6>Video</h6>
          </div>
        })
      
    }
    
    editProfile(e)
    {
      //go to edit thingy ok??
      //the jon of this state is to essentially send the value to EditPost

      
      console.log("inside editprofile button/ function")
      console.log("profilepci in editprofile", this.state.profilepic)
      console.log("profilepci in editprofile", this.state.fullname)

      this.setState({
        fullname: this.state.fullname,
        description: this.state.description,
        first_url: this.state.first_url,
        second_url: this.state.second_url,
        third_url: this.state.third_url,
        profilepic:this.state.profilepic,
        introvideo:this.state.introvideo,

        edit:<EditPost savePostHandler={this.sendEditPost} cancel={this.cancel}
        fullname={this.state.fullname} description={this.state.description} first_url={this.state.first_url} 
        second_url={this.state.second_url} third_url={this.state.third_url} profilepic = {this.state.profilepic}
        introvideo={this.state.introvideo}/>     
      
      })
    }
    changeFeedPortal(e)
    {
        const getcooked = getCookie('csrftoken');
        if (e.target.id == "publicfeedbutid")
        {
          console.log("this", this.props.data)
            document.querySelector('#maininfluencer').hidden = false;
            document.querySelector('#reviewsmainfluencer').hidden = true;
            var feedtype = "main"
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
                
                console.log("gimme data", data)
                ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#maininfluencer'));

          });
         
        }
        else if (e.target.id == "reviewfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = true;
            document.querySelector('#reviewsmainfluencer').hidden = false;
            var feedtype = "review"
            console.log("this.props", this.props.data)
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
                console.log("gimme data", data)
              ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#reviewsmainfluencer'));

          });
                  
        }
    }
 
    
   
    render() {
        console.log("WILACHAT", this.state.profilepic)

     
        const bookhtmllink = "/book/"+this.props.data["username"]
        if (this.props.data["userinfodata"] == "")
        {
          console.log("userinfodata is blank fak u")
        }
        else
        {
          console.log("userinfodat is not blank fak u bak")
        }
        console.log("sameperson", this.props.data["sameperson"])
        
        if (this.props.data["sameperson"] == 1)
        {
          console.log("ok we start doing the edit from here")
        }

        return (
         <div>
             <h1>{this.props.data['username']}</h1>
            <button type="button" class="btn btn-primary" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
            <button type="button" class="btn btn-primary" id="reviewfeedbutid" onClick={this.changeFeedPortal}>Reviews</button>
            {this.props.data["sameperson"] != 1 ? <a name="posterr" class="btn btn-primary" href={bookhtmllink}>Reserve</a>:  <button type="button" class="btn btn-success" onClick={this.editProfile}>Edit</button>}
            {this.state.edit}
         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    console.log("walachat")
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main"
    console.log("influencer username", influencerusername)

    fetch(`/gotoinfluencer/${influencerusername}/${feedtype}`)
    .then(response => response.json())
    .then(data => {
        console.log("gimme data", data)

      ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
      ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#maininfluencer'));

      
    //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


  });
});