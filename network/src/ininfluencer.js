
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
  this.hideFunction = this.hideFunction.bind(this);
  console.log("INFLUENCERFEEDROWSSSSSSSSSSSSSS")
  if (this.props.hide == true)
  {
    this.state = {
      hide : "Unhide"
    }
  }
  else
  {
    this.state = {
      hide : "Hide"
    }
  }
 

}
hideFunction(e)
{
  if (e.target.value == "Hide")
  {
    this.setState({hide : "Unhide"})
  }
  else
  {
    this.setState({hide : "Hide"})
  }
  let publicid = e.target.id
  const getcooked = getCookie('csrftoken');
  console.log("what is the value", e.target.value)

        fetch(`/hidepost`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
              publicid: publicid,
              hide: e.target.value
            })
          })
            .then(response => response.json())

          .then(result => {
            console.log(result)
            console.log("result", result["hide"])

           this.setState({hide: result["hide"]})

          });

}
render()
{  
  console.log("wawa", this.props.data)
  let thewholereturn = ""
  if (this.props.feedtype == "main")
  {
    let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4"
    thewholereturn = 
    <div class="d-flex justify-comlumn">
      <div  class="videomaincover mt-3 ml-2">
        <div class="d-flex justify-content-center">
          <video class="videoshow" id="testervideo" width="320" height="240" controls>
            <source src={link}></source>
            Your browser does not support the video tag.
          </video>
        
        </div>
        <div class="d-flex justify-content-center mt-3">
            {this.props.sameperson == 1 ?  <button id={this.props.data} value={this.state.hide} class="btn hidebutton" onClick={this.hideFunction}>{this.state.hide}</button>:null}
        </div>
      </div>
    </div>
  }
  else
  {
    //aab9d9bdb4bdfb65a5a030a5836762e2
    let link = ""
    if (this.props.data["picture"] == null)
    {
      link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"

    }
    else
    {
      link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["picture"] + ".jpg"
    }
    thewholereturn =  
    <div class="grid">
      <div class="reviewmaincover d-flex justify-content-center">
      <div class="d-flex flex-column d-flex justify-content-start mt-3">

        <img class="imgnoedit" src={link}></img>
          <h4>{this.props.data["username"]}</h4>
          <h6 class="reviewtext">{this.props.data["review"]}</h6>
      </div>
      </div>
      </div>
    
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
      console.log("datamofo", this.props.data["feedtype"])
      const rows = [];
      console.log("HAHAHAHAH", this.props.data["alldata"])

    
        for (let i = 0; i < this.props.data["alldata"].length; i++)
        {
          rows.push( 
            <InfluencerFeedRows 
            data={this.props.data["alldata"][i]}
            feedtype={this.props.data["feedtype"]}
            sameperson={this.props.data["sameperson"]}
            hide={this.props.data["hidedata"][i]}/>
          );
        }
      
     
    
      return (
        <div>
      
            {this.props.data["feedtype"] == "main" ? <div><div class="d-flex justify-content-center"><h1>Example Posts</h1></div>{this.props.data["alldata"] == "" ? <h6>ยังไม่มีโพส</h6>: 
            <div class="grid d-flex justify-content-center">
              {rows}
            </div>}</div>:
           
           <div>
                  <div class="d-flex justify-content-center">
                    <h1>ริวิว</h1>
                  </div> 
                  {this.props.data["alldata"] == "" ? <h6>ยังไม่มีรีวิว</h6>: 

                  <div class="row d-flex justify-content-center">
                    {rows}
                  </div>}
            </div>}
           

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
  

      this.state = {
        fullname: this.props.fullname,
        description: this.props.description,
        first_url: this.props.first_url,
        second_url: this.props.second_url,
        third_url: this.props.third_url
    
      };
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
      this.chooseFile = this.chooseFile.bind(this);
      this.chooseFileVideo = this.chooseFileVideo.bind(this);


  
      document.querySelector('#maininfluencer').hidden = false;
      document.querySelector('#reviewsmainfluencer').hidden = true;

      let fullname = ""
      let description = ""
      let profilepic = ""
      let profilevideo = ""
      let first_url = ""
      let second_url = ""
      let third_url = ""
      
      if (this.props.data["userinfodata"][0] != null)
      {
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
            third_url = this.props.data["userinfodata"][0].third_url
          }
          if(this.props.data["userinfodata"][0].profile_picture != null)
          {
            profilepic = this.props.data["userinfodata"][0].profile_picture
          }
          if(this.props.data["userinfodata"][0].profile_video != null)
          {
            profilevideo = this.props.data["userinfodata"][0].profile_video
          }
          
    }
       
    this.state = {
      fullname: fullname,
      description: description,
      first_url: first_url,
      second_url: second_url,
      third_url: third_url,
      profilepic: profilepic,
      profilevideo: profilevideo,

      edit:
        <div>
           <h4>Name</h4>
            <h5>{fullname}</h5>
          <h5>Description</h5>
            <h6>{description}</h6>
          <h5>Links</h5>
            <h6>{first_url}</h6>
            <h6>{second_url}</h6>
           <h6>{third_url}</h6>
        </div>

      }
  }
    chooseFile(e)
    {
          //  return file && file['type'].split('/')[0] === 'image';
        
        
      const getcooked = getCookie('csrftoken')
      let fileInput = document.querySelector('#choosefile').files[0]
      if (fileInput["type"].split('/')[0] != 'image')
      {
        alert("ไม่ใช่รูป");

      }
      else
      {

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
              console.log("result", result)
              console.log(result['url'])
              this.setState({
                profilepic : result['url']
              })
          });
      }



    }
    chooseFileVideo(e)
    {

      let fileInput = document.querySelector('#inputGroupFile01').files[0]

      if (fileInput["type"].split('/')[0] != 'video')
      {
        alert("ไม่ใช่วีดีโอ");

      }
      else
      {

        console.log("CHOOSEFILEVIDEOOOOOO")
        const getcooked = getCookie('csrftoken')
        console.log("this is fileinput", fileInput)
  
        console.log("this is in choose file")
  
        let formData = new FormData();
        formData.append("media", fileInput);
        let type = "videoinprofile"
        console.log("what the fuck is thye type", type)
        console.log("formdata", formData)
        fetch(`/forupload/${type}`, {
          method: 'POST',
          headers: {'X-CSRFToken': getcooked
          },
          body:formData
      })
      .then(response => response.json())
          .then(result =>{
              console.log("result", result)
              console.log("waan weesakul", result['url'])
              document.querySelector('#introvideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + result['url'] + ".mp4"
  
          });
      }
   


    }
    sendEditPost()
    {
      let idfullname = document.getElementById("idfullname").value
      let iddescription = document.getElementById("iddescription").value
      let idurl1 = document.getElementById("idurl1").value
      let idurl2 = document.getElementById("idurl2").value
      let idurl3 = document.getElementById("idurl3").value
      
      const csrftoken = getCookie('csrftoken');
      let type = "normal"
      console.log("what is going on")
      fetch(`/editprofile`, {
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
          console.log("this is result", idfullname)
          console.log("this is result", iddescription)
          console.log("this is result", idurl1)

        this.setState({
        fullname: idfullname,
        description: iddescription,
        first_url: idurl1,
        second_url: idurl2,
        third_url: idurl3,

        edit:
          <div>
             <h4>Name</h4>
              <h5>{idfullname}</h5>
            <h5>Description</h5>
              <h6>{iddescription}</h6>
            <h5>Links</h5>
              <h6>{idurl1}</h6>
              <h6>{idurl2}</h6>
             <h6>{idurl3}</h6>
          </div>

        })
            
        });
    }
    cancel()
    {
      this.setState({

        edit:
          <div>
             <h4>Name</h4>
              <h5>{this.state.fullname}</h5>
            <h5>Description</h5>
              <h6>{this.state.description}</h6>
            <h5>Links</h5>
              <h6>{this.state.first_url}</h6>
              <h6>{this.state.second_url}</h6>
             <h6>{this.state.third_url}</h6>
          </div>
        })
      
    }
    
    editProfile(e)
    {
      console.log("edot")
      //go to edit thingy ok??
      //the jon of this state is to essentially send the value to EditPost

      
      console.log("inside editprofile button/ function")
      console.log("profilepci in editprofile", this.state.fullname)

      this.setState({
        fullname: this.state.fullname,
        description: this.state.description,
        first_url: this.state.first_url,
        second_url: this.state.second_url,
        third_url: this.state.third_url,

        edit:<EditPost savePostHandler={this.sendEditPost} cancel={this.cancel}
        fullname={this.state.fullname} description={this.state.description} first_url={this.state.first_url} 
        second_url={this.state.second_url} third_url={this.state.third_url}/>     
      
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
      let link = ""
      let videolink = ""
      //THIS IS A NEW PROBLEM TO FIX
      //the user info data is fucked or essentially its blank and query anything
      let bookhtmllink = "/book/"+this.props.data["username"]

      if (this.state.profilepic != "")
      {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.state.profilepic + ".jpg"
        console.log("this is the new type of if in image")
      }
      if (this.state.profilevideo != "")
      {
        videolink = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.state.profilevideo + ".mp4"
        console.log("this is the new type of if in video")

      }

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
          console.log("sameperson", this.props.data["sameperson"])
          
          if (this.props.data["sameperson"] == 1)
          {
            console.log("ok we start doing the edit from here")
          }
      }
      let averagestars= Math.round(10*this.props.data["averagestars"])/10; 

      let categoryname = ""
      
      console.log("first")
      console.log(this.props.data)
      console.log(this.props.data["userinfodata"].length)


      if (this.props.data["userinfodata"].length == 0)
      {
          
        console.log("catching err")
      }
      else
      {
        if (this.props.data["userinfodata"][0].category == "athelete")
          {
            categoryname = "นักกีฬา"
          }
          else if(this.props.data["userinfodata"][0].category == "gamer")
          {
            categoryname = "เกมเมอร์"
          }
          else if(this.props.data["userinfodata"][0].category == "actor")
          {
            categoryname = "นักแสดง"
          }
          else if(this.props.data["userinfodata"][0].category == "influencer")
          {
            categoryname = "อินฟลูเอนเซอร์"
          }
          else if(this.props.data["userinfodata"][0].category == "comedian")
          {
            categoryname = "นักแสดงตลก"
          }
          else if(this.props.data["userinfodata"][0].category == "singer")
          {
            categoryname = "นักร้อง"
          }
      }
   



      console.log("daijoubu dayou", this.props.data)
        return (
         <div>
        
                <div>
                    <h2>looking for a yea u know</h2>
                    <div class="d-flex justify-content-between"> 
                          <div class="hihi d-flex flex-column ml-5">
                              <div class="d-flex justify-content-center">
                                <img class="imgnoedit" src={link}></img>
  
                              </div>
                              {this.props.data["sameperson"] == 1 ?                
                    
                      <div class="d-flex flex-column mt-3">
                        <div class="d-flex justify-content-center">
                            <label htmlFor="edit_post_txt">Click to change profile picture: </label>
                        </div>
                        <div class="d-flex justify-content-end">
                            <input id="choosefile" class="choosefile" onChange={this.chooseFile} type="file"></input>                  
                        </div>

                      </div> 
                      :null}
                              <div class="d-flex justify-content-between mt-3">
                                <h1 >{this.props.data['username']}</h1>
                                {this.props.data["sameperson"] == 1 ? <div><button type="button" class="btn editbutton" onClick={this.editProfile}>Edit</button></div>: null}
                                <div>
                                {this.props.data["sameperson"] != 1 ?  <a name="posterr" class="btn reservebutton" href={bookhtmllink}>Reserve</a>: <div></div>}
                                </div>
                              </div>                              
                              <div class="forfont d-flex justify-content-center">
                                  <div class="mr-3">
                                      <h5 class="forfont ml-3">{this.props.data["reviewnum"]} รีวิว</h5>
                                  </div>
                                  <div>
                                      <h5>{averagestars} ดาวเฉลี่ย</h5>
                                  </div>
                              </div>
                              <div class="d-flex justify-content-center mt-1">
                                  {this.props.data["userinfodata"] != "" ? <h5>{categoryname}</h5>:null}
                              </div>

                                  {this.state.edit}

                              </div>
                            <div class="coversvdointro">
                                <div class="d-flex flex-column">
                                    <video class="mr-5" id="introvideo" controls>
                                          <source src={videolink}></source>
                                          Your browser does not support the video tag.
                                    </video>
                                    {this.props.data["sameperson"] == 1 ?   
                                    <div class="mb-5">
                                        <div class="d-flex justify-content-center">
                                          <label htmlFor="edit_post_txt">Click to change introduction video: </label>
                                      </div>
                                        <div>
                                            <div class="custom-file">
                                                <div class="d-flex justify-content-center">
                                                <input type="file" onChange={this.chooseFileVideo} class="editintrovid" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :null}
                                </div>
                            </div>
                    </div>
             </div>


            <div class="enough d-flex justify-content-center mt-5 mb-3">
              <button type="button" class="btn btn-primary mr-5" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
              <button type="button" class="btn btn-primary" id="reviewfeedbutid" onClick={this.changeFeedPortal}>Reviews</button>
            </div>
            {this.props.data["sameperson"] == 1 ?
              <div class="d-flex justify-content-center">
                  <h6>*note สามารถ Show ได้แค่ 9 Posts</h6>
              </div>
              :null}
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