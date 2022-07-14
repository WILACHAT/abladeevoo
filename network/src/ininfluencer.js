
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
  this.testerfunction = this.testerfunction.bind(this);

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
testerfunction(e)
{
  console.log("this is to test")
}
hideFunction(dataid)
{
  
  let findid = dataid + "ininfluencer"

  if (document.getElementById(dataid).value == "Hide")
  {
    this.setState({hide : "Unhide"})
  }
  else
  {
    this.setState({hide : "Hide"})
  }
  let publicid = dataid
  const getcooked = getCookie('csrftoken');

        fetch(`/hidepost`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
              publicid: publicid,
              hide: document.getElementById(dataid).value

            })
          })
            .then(response => response.json())

          .then(result => {
           
           this.setState({hide: result["hide"]})

          });

}
render()
{  
  let waid = this.props.data + "ininfluencer"
  let thewholereturn = ""
  if (this.props.feedtype == "main")
  {

    let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data + ".mp4"
    thewholereturn = 

      <div class="ngongcover">
        <div id={waid} class={this.props.sameperson == 1 ?  this.state.hide == "Hide" ? "backgroundhide mt-5 ml-2 mr-2":"backgroundhidewrong mt-5 ml-2 mr-2":null}>
            <div class="beforevideomaincover">
              <div class="videomaincover">
                  <div class="d-flex justify-content-center">
                    <video class="videoshow" muted="true" id="testervideo" controls >
                      <source src={link} type="video/mp4"></source>
                      Your browser does not support the video tag.
                    </video>
                  </div>
              </div>
            </div>
            </div>

        <div class="d-flex justify-content-center mt-3">
          {this.props.sameperson == 1 ?  <button id={this.props.data} value={this.state.hide} class={this.state.hide == "Hide" ? "btn hidebutton":"btn hidebuttonwrong"} onClick={() => this.hideFunction(this.props.data)}>{this.state.hide == "Hide" ? "ซ้อน":"เลิกซ่อน"}</button>:null}
        </div>
      </div>
   
  }
  else
  {
    //aab9d9bdb4bdfb65a5a030a5836762e2
    let link = ""
    if (this.props.data["picture"] == null)
    {
      link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png"

    }
    else
    {
      link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["picture"] + ".jpg"
    }
    thewholereturn =  
   
<div class="d-flex justify-content-start">
<div class="d-flex justify-content-start reviewbigdiv">
    <div class="d-flex justify-content-center">
        <img class="imgnoeditreview" src={link}></img>
    </div>
    <div class="d-flex flex-column">
      <div class="ml-2">
          <h3 class="usernamereviewtext">{this.props.data["username"]}</h3>
      </div> 
      <div class="ml-2">
        <p class="actualreview">{this.props.data["review"]}</p>
     </div>
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
      const rows = [];
      
    
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

      
            {this.props.data["feedtype"] == "main" ? <div><div class="d-flex justify-content-center"><h1 class="wa mt-3">วีดีโอตัวอย่าง</h1></div>{this.props.data["alldata"] == "" ? 
            <div class="d-flex justify-content-center mt-3 mb-5">
              <h6 class="wanopostyetyet">ยังไม่มีโพส</h6>
            </div>: 
            <div class="grid d-flex justify-content-center mb-5">
              {rows}
            </div>}</div>:
           
           <div>
                  <div class="d-flex justify-content-center">
                      <h1 class="wa mt-3">ริวิว</h1>
                  </div> 
                  {this.props.data["alldata"] == "" ? 
                  
                  <div class="d-flex justify-content-center mt-3 mb-5">
                  <h6 class="wanopostyetyet">ยังไม่มีรีวิว</h6>
                </div>: 

                  <div class="d-flex justify-content-center">
                     <div class="biggestdivreview mb-5">

                        <div class="d-flex justify-content-center">
                          <div class="vidmareviewverybigdiv">
                            <div class="d-flex justify-content-center">
                            </div>  
                            {rows}
                          </div>
                       </div>
                      </div>
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
                this.setState({description: e.target.value});
            }
            else {
                this.setState({description: ""});
            }
        }
    }

  render(){
    let link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profilepic + ".jpg"

    return (
        <div>
             <div className="form-floating">
                    <div class="d-flex justify-content-center mt-2 mb-2">
                        <button type="button"className="loll btn btn-outline-danger btn-sm" name="cancel_button" onClick={this.editCancel}>ยกเลิก</button>
                    </div>
                    <div class="d-flex justify-content-center mt-1 mb-1">
                        <label htmlFor="edit_post_txt">ชื่อจริง: </label>
                    </div>
                    <div class="d-flex justify-content-center mt-1 mb-1">
                      <textarea id="idfullname" class="d-flex justify-content-center" name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.fullname}></textarea>
                    </div>

                    <div class="d-flex justify-content-center mt-1 mb-1">
                      <label htmlFor="edit_post_txt">ไบโอ: </label>
                    </div>
                    <div class="d-flex justify-content-center mt-1 mb-1">
                        <textarea id="iddescription" class="d-flex justify-content-center" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.description}></textarea>
                    </div>
                    
                    <div class="d-flex justify-content-center mt-2 mb-2">
                        <button type="button" name="edit_post_button" className="loll btn btn-outline-success btn-sm mr-2" onClick={this.editPost}>บันทึก</button>
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
      this.editDes = this.editDes.bind(this);

      this.cancel = this.cancel.bind(this);
      this.cancelDes = this.cancelDes.bind(this);

    //  this.showImg = this.showImg.bind(this);
      this.sendEditPost = this.sendEditPost.bind(this);
      this.sendEditDes = this.sendEditDes.bind(this);

      this.chooseFile = this.chooseFile.bind(this);
      this.chooseFileVideo = this.chooseFileVideo.bind(this);
      this.checkTxtArea = this.checkTxtArea.bind(this);

      


  
      document.querySelector('#maininfluencer').hidden = false;
      document.querySelector('#reviewsmainfluencer').hidden = true;
      

      let fullname = ""
      let description = ""
      let profilepic = ""
      let profilevideo = ""
      let first_url = ""
      let second_url = ""
      let third_url = ""
      let trackername = 0
      let trackerdes = 0

      
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
      trackername: 0,
      trackerdes:0,
      

      edit:
        <div class="biggestdivchecker">
          

        

    

        </div>

      }
  }
  checkTxtArea(e)
  {

      document.querySelector('#thefullnameidprofile').hidden = true
      document.querySelector('#thefullnameidedit').hidden = false
 
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
              this.setState({description: e.target.value});
          }
          else {
              this.setState({description: ""});
          }
      }
  }
    chooseFile(e)
    {
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
        
        
      const getcooked = getCookie('csrftoken')
      let fileInput = document.querySelector('#choosefile').files[0]
      if (fileInput["type"].split('/')[0] != 'image')
      {
        Swal.fire({
          icon: 'error',
          text: 'ต้องเป็นรูปแต่ดันอัพโหลดวีดีโอ!',
        })

      }
      else
      {

        let formData = new FormData();
        formData.append("media", fileInput);
        let type = "imageinprofile"
        fetch(`/forupload/${type}`, {
          method: 'POST',
          headers: {'X-CSRFToken': getcooked
          },
          body:formData
      })
      .then(response => response.json())
          .then(result =>{
            Swal.fire({
              icon: 'success',
              text: 'เปลี่ยนรูปสําเร็จ',
            })
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
        Swal.fire({
          icon: 'error',
          text: 'ต้องเป็นวีดีโอแต่ดันอัพโหลดรูป',
        })
      }
      else
      {

       
        const getcooked = getCookie('csrftoken')
    
        let formData = new FormData();
        formData.append("media", fileInput);
        let type = "videoinprofile"

        Swal.fire({
          icon: 'info',
          title: 'กําลังเซฟวีดีโอ',
          text: 'กรุณาอย่ากดออกหรือรีเฟรชจากหน้านี้จนกว่าจะมีข้อความสําเร็จ อาจจะใช้เวลานาน',
        })
        fetch(`/forupload/${type}`, {
          method: 'POST',
          headers: {'X-CSRFToken': getcooked
          },
          body:formData
      })
      .then(response => response.json())
          .then(result =>{

              document.querySelector('#introvideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + result['url'] + ".mp4"
              Swal.fire({
                icon: 'success',
                title: 'สําเร็จ!'
              })
  
          });
      }
   


    }
    sendEditDes()
    {
      let iddescription = document.getElementById("iddescription").value
      const csrftoken = getCookie('csrftoken');
      fetch(`/editprofile`, {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            iddescription: iddescription,
            type: "description"

        })
    })
    .then(response => response.json())
        .then(result =>{

        this.setState({
          description: iddescription,
          trackerdes: 1
          
 
      
        })
        document.querySelector('#descriptionidprofile').hidden = false
        document.querySelector('#descriptionidedit').hidden = true
            
        });


    }
    sendEditPost()
    {
      let idfullname = document.getElementById("idfullname").value
      
      const csrftoken = getCookie('csrftoken');
      let type = "normal"
      fetch(`/editprofile`, {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            idfullname: idfullname,
            type: "fullname"

   
        })
    })
    .then(response => response.json())
        .then(result =>{

        this.setState({
        fullname: idfullname,
        trackername: 1
 
      
        })
        document.querySelector('#thefullnameidprofile').hidden = false
        document.querySelector('#thefullnameidedit').hidden = true
            
        });
    }
    cancelDes()
    {
      if (this.state.trackerdes == 1)
      {
        this.setState({
          description: this.state.description
        })
      }
      else
      {
        this.setState({
          description: this.props.data["userinfodata"][0].profile_description
        })
      }
     

      document.querySelector('#descriptionidprofile').hidden = false
      document.querySelector('#descriptionidedit').hidden = true
    }

    cancel()
    {
      if (this.state.trackername == 1)
      {
        this.setState({
          fullname: this.state.fullname,
        })
          
      }
      else
      {
        this.setState({
          fullname: this.props.data["userinfodata"][0].profile_fullname,
        })
          
      }
     
       
      document.querySelector('#thefullnameidprofile').hidden = false
      document.querySelector('#thefullnameidedit').hidden = true
    

      
    }
    
    editDes(e)
    {
      document.querySelector('#descriptionidprofile').hidden = true
      document.querySelector('#descriptionidedit').hidden = false
    }
    editProfile(e)
    {
      //function above
      /*
      <label class="wa">ลิ้งค์</label>
      <h6>{this.state.first_url}</h6>
      <h6>{this.state.second_url}</h6>
     <h6>{this.state.third_url}</h6>
     <hr></hr>
     */
   

      
      document.querySelector('#thefullnameidprofile').hidden = true
      document.querySelector('#thefullnameidedit').hidden = false
 
      
    }
    changeFeedPortal(e)
    {
        const getcooked = getCookie('csrftoken');
        if (e.target.id == "publicfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = false;
            document.querySelector('#reviewsmainfluencer').hidden = true;
            var feedtype = "main"
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
                
                ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#maininfluencer'));

          });
         
        }
        else if (e.target.id == "reviewfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = true;
            document.querySelector('#reviewsmainfluencer').hidden = false;
            var feedtype = "review"
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
             
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
      }
      else
      {
        link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png"

      }
      if (this.state.profilevideo != "")
      {
        videolink = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.state.profilevideo + ".mp4"

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
      let averagestars= Math.round(10*this.props.data["averagestars"])/10; 

      let categoryname = ""



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

        
        return (
         <div>
                <div>
                        <div class="controlininfluencer"> 

                        <div class="divcolumn">
       
                          
                          <div class="wud1">
                         <div class="beforehihi">
                            <div class="hihi">
                              <div class="insidehihi">
                                  <div class="d-flex justify-content-center">
                                    <img class="imgnoedit" src={link}></img>
                                  </div>

                                  {this.props.data["sameperson"] == 1 ?                
                                
                                      <div class="d-flex flex-column mt-3">
      
                                          <div class="d-flex justify-content-center coverchoosefile">
                                          <label class="chooseprofile2label" for="choosefile">
                                          เปลี่ยนรูป
                                          <input id="choosefile" class="chooseprofile1 ml-5" onChange={this.chooseFile} type="file"></input>
                                        </label>
                                          </div>
                                      </div> 
                                  :null}


                                  <div class="d-flex justify-content-center">
                                      <h1 class="usernameininfluencer">{this.props.data['username']}</h1>
                                  </div>   

 
                                  <div id="thefullnameidprofile">
                                    <div class="d-flex justify-content-center">
                                      {this.state.fullname}
                                    </div>
                                  </div>
                                  {this.props.data["sameperson"] == 1 ? <div class="d-flex justify-content-center mt-2"><button type="button" class="btn registersmall" onClick={this.editProfile}>แก้ไขชื่อ</button></div>:null}

                                  <div hidden id="thefullnameidedit">
                                      <div class="d-flex justify-content-center mt-1 mb-1">
                                          <label htmlFor="edit_post_txt">ชื่อจริง: </label>
                                      </div>
                                      <div class="d-flex justify-content-center mt-1 mb-1">
                                          <textarea id="idfullname" class="d-flex justify-content-center inputhehore" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.fullname}></textarea>
                                      </div>
                                        
                                        <div class="d-flex justify-content-center">
                                        <div class="d-flex justify-content-center mt-2 mb-2">
                                            <button type="button" name="edit_post_button" className="loll btn btn-outline-success btn-sm mr-2" onClick={this.sendEditPost}>บันทึก</button>
                                        </div>
                                          <div class="d-flex justify-content-center mt-2 mb-2">
                                              <button type="button"className="loll btn btn-outline-danger btn-sm" name="cancel_button" onClick={this.cancel}>ยกเลิก</button>
                                          </div>
                                          
                                      </div>


                                   </div>                                

                                  <div class="d-flex justify-content-center mt-2">
                                    {this.props.data["userinfodata"] != "" ? <p class="forfont">{categoryname}</p>:null}
                                    <p class="forfont">{this.props.data["reviewnum"]} รีวิว</p>
                                    <p class="forfont" >{averagestars}<span id="starshow" class="fa fa-star checked ml-1"></span></p>

                                  </div>
                                  </div>
                              </div>
                          </div>
                          </div>

                            <div class="wud2">
                              <div class="beforehihi mt-3">
                                <div class="hihi">
                                  <div class="insidehihi">
                                        <div id="descriptionidprofile">
                                        <div>

                                            {this.state.description}
                                        </div>
                                      </div>
                                      <div hidden id="descriptionidedit">
                                          <div class="d-flex justify-content-center mt-1 mb-1">
                                            <label htmlFor="edit_post_txt">ไบโอ: </label>
                                          </div>
                                          <div class="d-flex justify-content-center mt-1 mb-1">
                                              <textarea id="iddescription" class="d-flex justify-content-center inputhehore" ref={this.textInput} name="edit_post_txt" style={{height: 100+'px'}} onChange={this.checkTxtArea} value={this.state.description}></textarea>
                                          </div>
                                          <div class="d-flex justify-content-center">
                                        <div class="d-flex justify-content-center mt-2 mb-2">
                                            <button type="button" name="edit_post_button" className="loll btn btn-outline-success btn-sm mr-2" onClick={this.sendEditDes}>บันทึก</button>
                                        </div>
                                          <div class="d-flex justify-content-center mt-2 mb-2">
                                              <button type="button"className="loll btn btn-outline-danger btn-sm" name="cancel_button" onClick={this.cancelDes}>ยกเลิก</button>
                                          </div>
                                          
                                      </div>
                                      </div>
                                      {this.props.data["sameperson"] == 1 ? <div class="d-flex justify-content-center mt-2"><button type="button" class="btn registersmall" onClick={this.editDes}>แก้ไขไบโอ</button></div>:null}
                                      
                                  </div>
                                </div>
                             </div>
                             </div>


                              <div class="d-flex justify-content-center mt-5">
                              {this.props.data["userinfodata"][0]["price"] != null ?

                            
                            this.props.data.accountstatus == 1 ? 
                              this.props.data["sameperson"] != 1 ?  <a name="posterr" class="btn reservebutton"  href={bookhtmllink}>จองตอนนี้: {this.props.data["userinfodata"][0]["price"]}฿</a>: <div></div>:<div>บัญชีหยุดชั่วคราว</div>
                            
                              :<div>สตาร์ยังไม่ได้ทําเรื่องการเงิน</div>} </div>

                                </div>
                        {this.state.edit}

                          
                            <div>
                            {videolink == "" ? 
                            <div class="d-flex justify-content-center">
                            <div class="covercoverwanopostyet mt-5">
                              <div class="coverwanopostyet">
                                <div class="d-flex justify-content-center">
                                    <h6 class="wanopostyet">ยังไม่มีวีดีโอแนะนําตัว</h6>
                                  </div>
                              </div>
                              <div>
                                  <div class="d-flex justify-content-center">
                                    {this.props.data["sameperson"] == 1 ? 
                                      <video autoplay="true" muted="true" class="almostvideovideowhenget" id="introvideo" controls >
                                          <source src={videolink} type="video/mp4"></source>
                                          Your browser does not support the video tag.
                                      </video>:null}
                                   </div>
                                   {this.props.data["sameperson"] == 1 ? 
                                  <div class="custom-filee mt-2">
                                      <div class="videouploadininfluencer">
                                      <label class="chooseprofile3label" for="inputGroupFile01">
                                        เลือกวีดีโอแนะนําตัว
                                        <input type="file" onChange={this.chooseFileVideo} class="chooseprofile1" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                      </label>
                                      </div>
                                  </div>:null}


                              </div>
                            </div>
                            </div>

                                : 
                                <div class="d-flex justify-content-center">
                               

                                <div class="d-flex flex-column">
                                    <div class="d-flex justify-content-center ">
                                   {videolink == "" ? 
                                  null:
                                      <video autoplay="true" muted="true" class="almostvideovideowhenget" id="introvideo" controls >
                                      <source src={videolink} type="video/mp4"></source>
                                      Your browser does not support the video tag.
                                   </video>  }
                                                                
                                </div>
                                {this.props.data["sameperson"] == 1 ?   
                                    <div>
                                        <div>
                                            <div class="custom-file mt-4">
                                                <div class="videouploadininfluencer">
                                                <label class="chooseprofile3label" for="inputGroupFile01">
                                                เปลี่ยนวีดีโอแนะนําตัว
                                                <input type="file" onChange={this.chooseFileVideo} class="chooseprofile1" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                              </label>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : 
                                    <div class="d-flex justify-content-center mt-3">

                                    </div>}
                                </div>
                              </div>
                        
                           
        }</div>
                    </div>
             </div>


            <div class="enough d-flex justify-content-center mb-3">
              <button type="button" class="publicbutton mr-5 btn " id="publicfeedbutid" onClick={this.changeFeedPortal}>วีดีโอตัวอย่าง</button>
              <button type="button" class="btn publicbutton" id="reviewfeedbutid" onClick={this.changeFeedPortal}>รีวิว</button>
            </div>
            {this.props.data["sameperson"] == 1 ?
              <div class="d-flex justify-content-center">
                  <h6>*เว็ปไซต์จะโชย์ 9 วีดีโอล่าสุดถ้าไม่ได้ซ้อนวีดีโอ*</h6>
              </div>
              :null}
         </div>
        )

       
    }
  
  }
document.addEventListener('DOMContentLoaded', function() {
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main"

    fetch(`/gotoinfluencer/${influencerusername}/${feedtype}`)
    .then(response => response.json())
    .then(data => {

      ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
      ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#maininfluencer'));

      
    //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


  });
});