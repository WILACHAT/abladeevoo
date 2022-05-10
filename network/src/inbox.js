
 /*
        completed: false
firstinputoccasion: "birthday"
fourthinputoccasion: "fuck u"
fromintro: "someone else"
id: 3
secondinputoccasion: "old"
thirdinputoccasion: "nothing"
timestamp: "2022-04-07T03:42:42.397Z"
tointro: "Someone"
typeintro: "someoneelse_html_id"
typeoccasion: "birthday_html_i

//things you still need to do

*/
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
function checkforoccasiontype(occasion) {
    console.log("occasion", occasion)
    var checkoccasion = ""
    if (occasion == "birthday_html_id")
    {
        checkoccasion = "Birthday"
    }
    else if(occasion == "peptalk_html_id")
    {
        checkoccasion = "Pep Talk"
    }
    else if(occasion == "roastbutton_html_id")
    {
        checkoccasion = "Roast"
        console.log("is the mofo in here")
    }
    else
    {
        checkoccasion = "Others"
    }
    return checkoccasion;
}
/*
<h4>{this.props.name}</h4>
<h4>{this.props.giftornot}</h4>
<h4>{this.props.whatoccasion}</h4>
<h4>{this.props.completed}</h4>

HOW DO WE DO THE NEXT STPES GOD KAO PAI BLAH2 c
#TUM REVIEWS/PROFILE/edit in profile
*/
class EachReserve extends React.Component{
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.submitSave = this.submitSave.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.saveUrl = this.saveUrl.bind(this);
        this.reportButton = this.reportButton.bind(this);
        this.overlayCancel = this.overlayCancel.bind(this);
        this.submitReport = this.submitReport.bind(this);




        console.log("right in the constructor")
        console.log("this.props.data", this.props.data)

        console.log("kaido is ded2", document.querySelector('#typeofpage'))
        console.log("bruh", this.props.data["type"])
        
    }
    submitReport(e)
    {
        console.log("very close", document.querySelector('#reportinputid').value)
        console.log("requester", this.props.data["data"][0].username)
        console.log("reservationid", this.props.data["data"][0].id)        


        const getcooked = getCookie('csrftoken');

        fetch(`/gotoeachreserve`, {
            method: 'PUT',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
              value: document.querySelector('#reportinputid').value,
              reservationid: this.props.data["data"][0].id,
              requester:this.props.data["data"][0].username,
              influencer: this.props.data["data"][0].username_influencer
            })
          })
        
          .then(result => {
            console.log("this is the result", result)
            document.querySelector('#reportinputid').value = ""

            document.querySelector('#overlayreportid').hidden = true

          });
        
    }
    overlayCancel(e)
    {
        document.querySelector('#reportinputid').value = ""
        document.querySelector('#overlayreportid').hidden = true
    }
    reportButton(e)
    {
        document.querySelector('#overlayreportid').hidden = false
        console.log("reported!")
    }
    saveUrl(e)
    {
        let content = e.target.value
        if (!navigator.clipboard) {
            return
        }

        navigator.clipboard.writeText(content)
        .then(() => {
        console.log("Text copied to clipboard...")
        })
        .catch(err => {
        console.log('Something went wrong', err);
        })
      

    }
    chooseFile(e)
    {
        let fileinput = document.querySelector('#inputGroupFile01').files[0]
        let checker = fileinput['type']
  
        checker = checker.split('/')[0]
       
        let type= ""
        if (checker == "video")
        {
          type= "video"
        }
        else
        {
          type= "image"
        }
  
        let formData = new FormData();
        formData.append("media", fileinput);
        
        const getcooked = getCookie('csrftoken')
        fetch(`/forupload/${type}`, {
          method: 'POST',
          headers:{'X-CSRFToken': getcooked},
          body: formData
  
        })
        .then(response => response.json())
          .then(data => {
              //right now its either you create a new video or unhide the one that you already have
            console.log("yayyyyyyyyyyyyyyy")
            document.querySelector('#testervideo').hidden = false
            document.querySelector('#sendingvideoidback').name = data['url']
            document.querySelector('#testervideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + data['url'] + ".mp4"

          });
    }

    goBack(e)
    {
        console.log("this one is important", document.querySelector('#typeofpage').value)

        document.querySelector('#eachreserve').hidden = true;
        document.querySelector('#inboxmainid').hidden = false;

        if (document.querySelector('#typeofpage').value == "request")
        {
            
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = false;
            document.querySelector('#mycompletehtml').hidden = true;

        }
        else if (document.querySelector('#typeofpage').value == "inbox")
        {
            document.querySelector('#myinboxhtml').hidden = false;
            document.querySelector('#myrequesthtml').hidden = true;
            document.querySelector('#mycompletehtml').hidden = true;
        }
        else
        {
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = true;
            document.querySelector('#mycompletehtml').hidden = false;

        }

    }
    submitSave(e)
    {
        //sending vdo and stuff gor ja yhu trong nee (this is just the message)
        var value = document.querySelector('#sendingbacktorequest').value
        var reserveid = this.props.data["data"][0].id
        var videoid = document.querySelector('#sendingvideoidback').name

        const getcooked = getCookie('csrftoken');

        fetch(`/gotoeachreserve`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
              value: value,
              reserveid: reserveid,
              type:"submitvdo",
              videoid: videoid
            })
          })
        
          .then(result => {
              window.location.href = "/inbox";
          });
          
    }
    submitReview(e)
    {
        const getcooked = getCookie('csrftoken');
        var value = document.querySelector('#typeforreview').value
        if (value == "")
        {
            alert("You can't submit Review without writing a review")
        }
        else
        {
            var reserveid = this.props.data["data"][0].id

            console.log("before error", this.props.data["data"][0].username_influencer)

            var influencername = this.props.data["data"][0].username_influencer
    
            var selectreview = document.querySelector('#selectforreview').value
        

            console.log("value of review", value)
            
            fetch(`/gotoeachreserve`, {
                method: 'POST',
                headers:{'X-CSRFToken': getcooked},
                body: JSON.stringify({
                value: value,
                reserveid: reserveid,
                influencername, influencername,
                type:"submitreview",
                reviewstars: selectreview
                })
            })
            .then(result => {
                window.location.href = "/inbox";
            });

        }
        
        

    }
    render() {
        console.log("hahahahahahheheheheheh", document.querySelector('#typeofpage').value)

        let videoandstuff = ""
        link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

        videoandstuff = 
        <div>
            <div class="videowhenget">
                <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center">
                        <video id="testervideo" class="videovideowhenget" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>
                    </div>

                </div>

            </div>

                        
        
        </div>

        console.log("kaido is ded3", document.querySelector('#typeofpage'))     
        //FOUND IT THIS IF IS MEGA WRONG
        var postoption = ""
        if (document.querySelector('#typeofpage').value == "request" || document.querySelector('#typeofpage').value == "completed")
        {
            //this is before influencer posted video
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div class="d-flex justify-content-center mb-3">
                    <div class="postoptionforinfluencer">
                        <div>
                              <div class="d-flex justify-content-center">
                                  <label class="wa" htmlFor="edit_post_txt">คลิ๊กเพื่อเลือก Vid โพสต์: </label>
                              </div>
                              <div class="custom-file">
                                  <div class="d-flex justify-content-center">
                                      <input type="file" onChange={this.chooseFile} class="editintrovid" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                  </div>
                              </div>
                              <div class="d-flex justify-content-center mt-5">
                        <video hidden id="testervideo" class="videovideowhenget" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                          </div>
                          
                    <div class="d-flex justify-content-center mt-4">
                        <h6 class="wa">ข้อความสั้นๆให้แฟนคลับ: </h6>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="sendingbacktorequest"></input>
                    </div>
                    <div class="d-flex justify-content-center mt-3 mb-5">
                        <button class="btn btn-primary" onClick={this.submitSave} id="submitrequested">Post</button>
                    </div>
                    <input name="" type="hidden" id="sendingvideoidback"></input>
                </div>
                </div>
            }
            else
            {
                //this is after influencer posted video
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"
                
                    postoption = 
                    <div>
                        <div class="donetitle">
                          <div class="d-flex justify-content-center">
                                <h1 class="donetext">เสร็จแล้ววว!</h1>
                                
                          </div>
                        </div>
                        {videoandstuff}

                        <div class="d-flex justify-content-center mt-3">
                            <div class="orderdetails">
                                <div class="d-flex justify-content-center">
                                    <h4 class="wa">สิ่งที่คุณเขียนให้แฟนคลับ: </h4>
                                </div>
                            
                                <hr class="hr"/>
                                <div class="d-flex justify-content-center">
                                    <h2 class="wa">{this.props.data["forpostdata"][0]}</h2>
                                </div>
                            </div>
                        </div>

                        
                    
                    
                        {this.props.data["data"][0].reviewcompleted != true ? 
                        
                        <div class="d-flex justify-content-center mt-3 mb-5">
                        <div class="orderdetails">
                            <div class="d-flex justify-content-center">
                                <h4 class="wa">Customer Review: </h4>
                            </div>
                        
                            <hr class="hr"/>
                            <div class="d-flex justify-content-center">
                                <h2 class="wa">ยัวไม่มีรีวิว</h2>
                            </div>
                        </div>
                    </div>:
                         <div class="d-flex justify-content-center mt-5 mb-5">
                         <div class="orderdetails">
                             <div class="d-flex justify-content-center">
                                 <h4 class="wa">Customer Review: </h4>
                             </div>
                         
                             <hr class="hr"/>
                             <div class="d-flex justify-content-center">
                                 <h2 class="wa">{this.props.data["reviewvalue"]}</h2>
                             </div>
                         </div>
                     </div>}
                    </div>
            }
        }
        else
        {
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div class="mb-5 d-flex justify-content-center">
                    <div class="waitingforstar">
                        <h4 class="wa">สตาร์กําลังดําเนินการทํา Vid ที่น่าจดจําของท่านอยู่</h4>
                    </div>
                </div>
            }
            else
            {
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

                    postoption = 
                    <div>
                        <div class="donetitle">
                          <div class="d-flex justify-content-center">
                                <h1 class="donetext">เสร็จแล้ววว!</h1>
                          </div>
                        </div>
                        {videoandstuff}

                        <div class="d-flex justify-content-center mt-3">
                            <div class="orderdetails">
                                <div class="d-flex justify-content-center">
                                    <h4 class="wa">ขอความเล็กๆน้อยๆจากสตาร์</h4>
                                </div>
                            
                                <hr class="hr"/>
                                <div class="d-flex justify-content-center">
                                    <h2 class="wa">{this.props.data["forpostdata"][0]}</h2>
                                </div>
                            </div>
                        </div>

                        

                            
                      
                        {this.props.data["data"][0].reviewcompleted != true ? 
                        <div class="d-flex flex-column">

                        <div class="d-flex justify-content-center mt-5">
                            <h4 class="wa">เขียนรีวิวให้กับสตาร์คนโปรด</h4>
                        </div>

                        <div class="d-flex justify-content-center mt-2 mb-3">
                            <input id="typeforreview"></input>
                            <select id="selectforreview">
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </select>
                        </div>

                       
                        
                        <div class="d-flex justify-content-center mb-5">
                            <button onClick={this.submitReview} class="btn btn-primary">Submit</button>
                        </div>
                    </div>:    
                    <div class="d-flex justify-content-center mt-5 mb-5">
                    <div class="orderdetails">
                        <div class="d-flex justify-content-center">
                            <h4 class="wa">รีวิวของคุณ: </h4>
                        </div>
                    
                        <hr class="hr"/>
                        <div class="d-flex justify-content-center">
                            <h2 class="wa">{this.props.data["reviewvalue"]}</h2>
                        </div>
                    </div>
                </div>}
                        
                    </div>
            }
          
        }
        var occasion = checkforoccasiontype(this.props.data["data"][0].typeoccasion)
        console.log("check for the occasion", occasion)
        if (occasion == "Birthday") 
        {
            occasion = 
            
            <div>
            <hr></hr>


                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">เนื่องในโอกาส: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">เฉลมเฉลองวันเกิด</h4>
                    </div>

                </div>

                <hr></hr>



                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">วันที่เกิด: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].firstinputoccasion}</h4>
                    </div>

                </div>

                <hr></hr>



                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อายุขึ้นเท่าไหร่: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].secondinputoccasion}</h4>
                    </div>

                </div>

                <hr></hr>

                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากให้สตาร์พูดอะไร: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].thirdinputoccasion}</h4>
                    </div>

                </div>

                <hr></hr>


                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากบอกอะไรเพิ่มเติมกับสตาร์: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].fourthinputoccasion}</h4>
                    </div>

                </div>

            </div>
        } 
        else if (occasion == "Pep Talk")
        { 
            occasion = 
            <div>
                <hr></hr>

                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">เนื่องในโอกาส: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">คุยให้กําลังใจ</h4>
                    </div>
                </div>

                <hr></hr>

                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">ทําไมถึงอยากได้กําลังใจ: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].firstinputoccasion}</h4>
                    </div>
                </div>

                <hr></hr>

                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">ให้สตาร์ช่วยอะไรได้บ้าง: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].secondinputoccasion}</h4>
                    </div>
                </div>

                <hr></hr>

                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากบอกอะไรเพิ่มเติมกับสตาร์: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].thirdinputoccasion}</h4>
                    </div>

                </div>
       

            </div>
        }
        else if (occasion == "Roast")
        {
            occasion = 
            <div>
                <hr></hr>

                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">เนื่องในโอกาส: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">เผา</h4>
                    </div>
                </div>

                <hr></hr>


                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากให้สตาร์เผาอะไร: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].firstinputoccasion}</h4>
                    </div>
                </div>

                <hr></hr>


                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากบอกอะไรเพิ่มเติมกับสตาร์: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].secondinputoccasion}</h4>
                    </div>

                </div>
                
            </div>
        }
        else
        {
            occasion = 
            <div>
                <hr></hr>

                  <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">เนื่องในโอกาส: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].firstinputoccasion}</h4>
                    </div>
                </div>

                <hr></hr>


                <div class="d-flex flex-column mt-3">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากให้สตาร์ทําอะไร: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].secondinputoccasion}</h4>
                    </div>
                </div>

                <hr></hr>



                <div class="d-flex flex-column mt-2">
                    
                    <div class="d-flex justify-content-center">
                        <h4 class="watitle">อยากบอกอะไรเพิ่มเติมกับสตาร์: </h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h4 class="wainfo">{this.props.data["data"][0].thirdinputoccasion}</h4>
                    </div>

                </div>
            </div>
        }
        console.log("this is the type of intro", this.props.data["data"][0].typeintro)
        console.log("SIDEMEN", this.props.data["propicandusername"])
        console.log("gu tong check for data eek laew", this.props.data)
        console.log("gu tong check for data eek laew", this.props.data["data"][0].influencer_pic)

        
        let link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"

        if (document.querySelector('#typeofpage').value == "inbox")
        {
            if (this.props.data["data"][0].influencer_pic != null || this.props.data["data"][0].influencer_pic != "")
            {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].influencer_pic + ".jpg"

            }
     
        }
        else
        {
            if (this.props.data["data"][0].influencer_pic != null || this.props.data["data"][0].influencer_pic != "")
            {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].normal_pic + ".jpg"
            }
        }

        console.log("kaido wins", this.props.data)
        console.log("kaido wins", this.props.data["type"])



        return (
            <div>
                <div hidden id="overlayreportid" class="overlayreport">
                    <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center">
                        <label>Report</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="reportinputid" placeholder="Report Tummai"></input>
                        <button onClick={this.submitReport}class="btn btn-primary">Submit</button>
                        <button onClick={this.overlayCancel} class="btn btn-danger">Cancel</button>

                    </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="backbutton btn btn-primary mb-3"onClick={this.goBack}>Back</button>
                    {this.props.data["type"] == "request" ? <button class="backbutton btn btn-danger mb-3 ml-3"onClick={this.reportButton}>Report</button>:null}


                </div>
                
                <div class="d-flex justify-content-center mb-5">
                    <div class="orderorder">
                        <div class="d-flex justify-content-center">
                            <h4 class="wa">รายละเอียดการสั่งซื้อ</h4>
                        </div>
                        <div class="d-flex justify-content-center">
                            {this.props.data["data"][0].completed == true ? <h4 class="watitle" style={{color: "green"}}>เสร็จสิ้น</h4> : <h4 class="watitle" style={{color: "red"}}>ไม่เสร็จสิ้น</h4>}
                        </div>
                    </div>
                </div>


                <div class="d-flex justify-content-center mb-5">
                    <div class="orderfrom">
                        <div class="d-flex justify-content-center">
                            {document.querySelector('#typeofpage').value == "inbox" ?                            
                            <h4 class="wa">ออเดอร์ถึง</h4>:<h4 class="wa">ออเดอร์จาก</h4>}
                        </div>
                        <hr class="hr"/>
                        <div class="d-flex justify-content-center">
                            {document.querySelector('#typeofpage').value == "inbox" ?   
                            <h4 class="ml-2 align-middle">{this.props.data["data"][0].username_influencer}</h4>:
                            <h4 class="ml-2 align-middle">{this.props.data["data"][0].username}</h4>}
                        </div>

                        <div class="d-flex justify-content-center">
                            <img class="imgnoeditinbox" src={link}></img>
                        </div>

                    </div>
                </div>
               

                <div class="d-flex justify-content-center mb-5">
                    <div class="orderdetails">
                        <div class="d-flex justify-content-center">
                            {this.props.data["data"][0].typeintro == "someoneelse_html_id" ?  <h4 class="wa">ของขวัญสำหรับคนอื่น</h4>: <h4 class="wa">ของขวัญสำหรับตนเอง</h4>}
                        </div>
                       
                        <hr class="hr"/>

      
                    {this.props.data["data"][0].typeintro == "someoneelse_html_id" ?   
                        <div class="d-flex justify-content-center mb-5">
                            <div class="d-flex flex-column mt-3">
                                <div class="d-flex justify-content-center">
                                    <h4 class="wa">จาก: {this.props.data["data"][0].tointro}</h4>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <h4 class="wa">ถึง: {this.props.data["data"][0].fromintro}</h4>
                                </div>
                              
                                
                                {occasion}
                            </div>

                        </div>:
                       <div class="d-flex justify-content-center mb-5">
                       <div class="d-flex flex-column mt-3">
                           <div class="d-flex justify-content-center">
                               <h4 class="wa">ถึง: {this.props.data["data"][0].tointro}</h4>
                           </div>
                           {occasion}

                       </div>

                   </div>} 

                    </div>

                   

                </div>
  
                    {postoption}
            </div>
        )
    }
}
class InboxFeedRows extends React.Component {
    constructor(props) {
        super(props);
        this.clickHref = this.clickHref.bind(this);


    }
    clickHref(e)
    {
        
        document.querySelector('#eachreserve').hidden = false;
        document.querySelector('#inboxmainid').hidden = true;
        document.querySelector('#myinboxhtml').hidden = true;
        document.querySelector('#mycompletehtml').hidden = true;

        console.log("this.props.iddddddd", this.props.id)

        console.log("KINGDOM IS ONE OF THE BEST MANGA OF ALL TIME BUT STILL ONE PIECE IS BETTER", document.querySelector('#divtogetid').value)
        document.querySelector('#myrequesthtml').hidden = true;

        console.log("WAEARTH", this.props.type)
        const getcooked = getCookie('csrftoken');
        let paginationid = 1;
        fetch(`/gotozjguen484s9gj302g/${paginationid}`, {
        method: 'PUT',
        headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({
          reservationid: this.props.id,
          from: "eachreserve",
          type:this.props.type
            })
        })
        .then(response => response.json())

        .then(data => {
            console.log("unicornbillions", data)
            ReactDOM.render(<EachReserve data={data}/>, document.querySelector('#eachreserve'));
            });
      
            }
    render() {

        console.log("check for", this.props.completed)
       
        let eachcontent = ""
        console.log("this.propsasdfasdfasdf", this.props)
        console.log(this.props.influencer_pic)
        console.log(this.props.normal_pic)
        let today = new Date().toISOString().slice(0, 10)

        let checktime = 0
        if (this.props.duedate != null || this.props.dudedate != "")
        {
            if (today > this.props.duedate)
            {
                checktime = 1
            }
           
        }
        console.log("WTF", this.props.duedate - today)

      

        

        let link = ""

        //this will 
        if (this.props.type == "request" || this.props.type == "complete")
        {
            if (this.props.normal_pic == null)
            {
              link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
        
            }
            else
            {
              link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.normal_pic + ".jpg"
            }
        }
        else
        {
            if (this.props.influencer_pic == null)
            {
              link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
        
            }
            else
            {
              link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.influencer_pic + ".jpg"
            }
        }
        
        var occasion = checkforoccasiontype(this.props.whatoccasion)

        eachcontent =  
        <div class="okseecolor">
        <div class="randomdesign d-flex justify-content-between">
            <div class="d-flex justify-content-start mt-2">
                <img class="imgnoeditinbox mt-3 mr-5" src={link}></img>
                <div class="d-flex flex-column yeathename mt-2">
                    <a class="nameininbox" >{this.props.name}</a> 
                    <h4 class="wa">{this.props.giftornot == "someoneelse_html_id" ? "A gift":"For you"}</h4>
                    
                </div>
                   
              
            </div>
        

            <div class="d-flex flex-column">
                <div class="d-flex justify-content-center">
                    <h4 class="waoccasion">{occasion}</h4>
                </div>
                <div onClick={this.clickHref} class="button" id="button-7">
                    <input type="hidden" id="divtogetid" value={this.props.id}></input>
                    <div value={this.props.id}  class="dub-arrow">
                        <img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </div>
                    <a class="letsgo" href="#">Watch</a>
                </div>
                
            </div>
            

        </div>
        <div class="d-flex justify-content-center mt-1">
                    {this.props.completed == true ? <h6 class="waduedatecomplete mt-3">เสร็จสิ้น</h6> : 
                    checktime == 0 ? 
                        <div class="inboxtroublesome mt-1 ml-2">
                                
                                <h6 class="waduedate"> ไม่เสร็จสิ้น</h6>
                                <div class="d-flex justify-content-center">
                                    <h6 class="waduedate">ส่งก่อน:</h6>
                                    <h6 class="waduedate">{this.props.duedate}</h6> 
                                </div>
                        </div>:
                        <div class="d-flex justify-content-center">
                            <h4 class="waduedateexpire">หมดอายุ</h4>
                        </div>}
                     </div>
        
       
    </div>


        return(
            <div class="d-flex justify-content-center">
            <div class="ineachrow mt-4 mb-4">

                {this.props.type == "inbox" ? eachcontent: 
                
                this.props.completed == true ?  eachcontent:
                
                checktime == 1 ? null:
                eachcontent}

            </div>
            </div>
        )
    }
}

class InboxFeedInbox extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.hideCompleted = this.hideCompleted.bind(this);
        this.sortTime = this.sortTime.bind(this);


        this.state = 
        {
          newdata: this.props.data,
          hide: "Hide Completed",
          sort: "Sort Closest to Due Date"

        }
    }
    sortTime(e)
    {
       
        
        let type = "mysorttime"
        const csrftoken = getCookie('csrftoken');
        console.log("e.target.value", e.target.value)


        if (e.target.value == "Sort Closest to Due Date")
        {
            type = "mysorttime"
        }
        else
        {
            type = "myrequesthtml"
            console.log("e.target.value", type)
        }
     

        fetch(`/gotozjguen484s9gj302g/${this.state.newdata["paginationid"]}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                from: "inbox",
                type: type
            })
        })        
        .then(response => response.json())
        .then(data => {
            console.log("sortting time", data)
            let sort = ""

            if (data["sort"] == 0)
            {
                sort = "Sort Closest to Due Date"               
            }
            else
            {
                sort = "Unsort"
            }

            console.log("e.target.value", sort)
            this.setState({
                newdata: data,
                sort: sort
              })
        })
    }
    hideCompleted(e)
    {


        let type = ""

        console.log("ngong")
        console.log("ngong sus", this.state.hide)

        const csrftoken = getCookie('csrftoken');
       
        
        
        if (e.target.value == "Unhide Completed")
        {
            type = "myinboxhtml"
        }
        else
        {
            console.log("is it in hidecompleted yohohoho")
            type = "hidecompleted"
        }
        console.log("type before in ", type)
        console.log("pagi", this.state.newdata)

        console.log("pagi", this.state.newdata["paginationid"])
        console.log("pagi", this.state.newdata["num_pages"])
        

        //might have to be an if here
        fetch(`/gotozjguen484s9gj302g/${1}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                from: "inbox",
                type: type
            })
        })        
        .then(response => response.json())
        .then(data => {
            console.log("mg pen kuay arai", this.props.data)
        
            let hide = ""
            if (data["hide"] == 0)
            {
                hide = "Hide Completed"
            }
            else
            {
                hide = "Unhide Completed"
            }
            console.log("sentback", data)
            console.log("sentback", data["paginationid"])


            this.setState({
                newdata: data,
                hide: hide,
                pagination:data["paginationid"]

              })


        });
    }
    
    changePage(e)
    {
        let pagination = e.target.id
        const innerhtmlpage = e.target.innerHTML
      
      
        if (innerhtmlpage == "Previous")
        {
          pagination = parseInt(pagination)
          pagination = pagination - 1
        }
        else if(innerhtmlpage == "Next")
        {
          pagination = parseInt(pagination)
          pagination = pagination + 1
        }
        else
        {
          pagination = parseInt(e.target.innerHTML)
        }
        let checkfornull = window.location.pathname.split('/')[2]
        let clicked = parseInt(window.location.pathname.split('/')[2])
        if (checkfornull == null){
            clicked = 0
        }
        console.log("detective conan", this.props.data)
        console.log("detective conan2", this.state.hide)

        let type=""
        if (this.props.data["type"] == "request")
        {
            if (this.state.sort == "Sort Closest to Due Date")
            {
                type = "myrequesthtml"

            }
            else
            {
                type = "mysorttime"
               
            }

        }
        else if (this.props.data["type"] == "complete")
        {
            type = "mycompletehtml"
        }
        else 
        {
            if (this.state.hide == "Hide Completed")
            {
                type = "myinboxhtml"
            }
            else
            {
                type = "hidecompleted"
               
            }

        }
      
        const getcooked = getCookie('csrftoken');

        console.log("the not so strongest", pagination)
        fetch(`/gotozjguen484s9gj302g/${pagination}`, {
            method: 'PUT',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
                from: "inbox",
                type: type
                })
            })
       
        .then(response => response.json())
        .then(data => {
            console.log("gojo", this.props.data)
          this.setState({
            newdata: data,
             
          })

          console.log("gojo", this.state.newdata)
          this.setState({
            pagination:this.state.newdata["paginationid"]
        })
      
        });
  
        window.scrollTo(0, 0)
    }
    render() {
    console.log("CUCKOOOOOOOOOO", this.props.data)
    console.log("CUCKOOOOOOOOOO SECONDO", this.state.pagination)



    const button = [];
    const rows = [];

    const paginationid = this.props.data["paginationid"]
   // {this.state.pagination == thej ? "page-item active":"page-item"}
   //style:{color:"red"}
   console.log("one piece", this.state.newdata)
   console.log("one piece", this.state.newdata["num_pages"])


    for (let j = 0; j < this.state.newdata["num_pages"]; j++)
    {
      let thej = j + 1
      button.push
      (
        <a onClick={this.changePage} class={this.state.pagination == thej ? "paginationcolor btn btn-primary":"paginationnocolor btn"}>{thej}</a>
      )

    }
        if (this.state.newdata["data"] == null)
        {
            console.log("looking to hire")            
        }
        else
        {
            for (let i = 0; i < this.state.newdata["data"].length; i++)
            {
                console.log("we wil lcccc", this.props.data["data"][i])
                rows.push( 
                    <InboxFeedRows 
                    id={this.state.newdata["data"][i].id}
                    name={this.props.data["type"] == "inbox" ? this.state.newdata["data"][i].username_influencer:this.state.newdata["data"][i].username}
                    giftornot={this.state.newdata["data"][i].typeintro}
                    whatoccasion={this.state.newdata["data"][i].typeoccasion}
                    completed={this.state.newdata["data"][i].completed}
                    duedate={this.state.newdata["data"][i].duedate}
                    type={this.state.newdata["type"]}
                    influencer_pic={this.state.newdata["data"][i].influencer_pic}
                    normal_pic={this.state.newdata["data"][i].normal_pic}/>
                );
            } 
        }

        if (this.state.pagination == null)
        {
            this.setState({
                pagination:1
            })
        }
        
        console.log("WAKU WAKU", this.state.newdata["data"])
        console.log("WAKU FAKU", this.state.newdata["type"])
        console.log("waka paku", this.state.pagination)
        console.log("waka naku", this.state.newdata)
        console.log("waka naku", this.state.newdata["paginationid"])
    
        console.log("this")

        console.log(this.state.newdata["num_pages"])
        console.log(this.state.pagination)

        let gotoindex = "/"
        let gotoaboutus = "/aboutus"


        return(
            <div>      
                <div class="d-flex justify-content-center mb-5">    
                    {this.state.newdata["type"] == "inbox" ? <button id="hidecompletedid" value={this.state.hide}class="btn btn-primary" onClick={this.hideCompleted}>{this.state.hide}</button>:null}
                    {this.state.newdata["type"] == "request" ? <button class="btn btn-primary" value={this.state.sort}onClick={this.sortTime}>{this.state.sort}</button>:null}
               </div> 
                {this.state.newdata["data"] != "" ? 
            
                <div class="inboxtable d-flex justify-content-center">
                    <div class="columninbox d-flex justify-content-center flex-column">
                        {rows}
                    </div>
                </div>: 
                <div>
                    <div class="norequestdiv">
                            <div class="d-flex justify-content-center">
                            {this.state.newdata["type"] == "inbox" ? 
                            <div>
                                <h1 class="wa">ยัวไม่มีออเดอร์ใน อินบ็อกซ์</h1>

                                <div class="d-flex justify-content-center mt-4">
                                    <h4 class="wa mr-3">ไปค้นหาสตาร์ได้เลย: </h4>
                                   <h4><a href={gotoindex} class="wae">หน้าหลัก</a></h4> 
                                </div>

                                <div class="d-flex justify-content-center mt-4">
                                    <h4 class="wa mr-3">ถ้าอยากเรียนรู้เพิ่มเติมกับพวกเรา: </h4>
                                   <h4><a href={gotoaboutus} class="wae">เกี่ยวกับเรา</a></h4> 
                                </div>
                               
                            </div>: 
                            <div>
                                <div class="d-flex justify-content-center">
                                    <h1 class="wa">ยัวไม่มีออเดอร์ใน รีเควสท์</h1>
                                </div>
                                    <div class="d-flex justify-content-center">                                
                                    <h2 class="wa mt-2">ช่วยแชร์ให้แฟนคลับคุณใน โซเชียล!</h2>
                                </div>

                            
                            </div>}
                            </div>
                    </div>
                
                
            </div>}
                {rows != "" ? 
        <div class="paginationcss">
        {this.state.newdata["num_pages"] != 0 ?
        <ul class="pagination justify-content-center mt-3">
              {this.state.pagination > 1 ?  <a id={this.state.pagination} class="nextbutton btn" onClick={this.changePage}>Previous</a>: null}
                {button}              
              {this.state.pagination != this.state.newdata["num_pages"] ? <a id={this.state.pagination} class="nextbutton btn" onClick={this.changePage}>Next</a>: null}
        </ul>: null}
        </div>:null}
            </div>
        )
    }
}
class InboxFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedInbox = this.changeFeedInbox.bind(this);
      this.state = 
      {
        currentpage:"myinbox"
     
      }

      
    //document.querySelector('#maininfluencer').hidden = false;
    //document.querySelector('#reviewsmainfluencer').hidden = true;
      
    }
    
    changeFeedInbox(e)
    {
        var type=""
        const csrftoken = getCookie('csrftoken');
        if (e.target.id == "myinboxid")
        {
            document.querySelector('#typeofpage').value = "inbox"
            document.querySelector('#myrequesthtml').hidden = true;
            document.querySelector('#mycompletehtml').hidden = true;

            document.querySelector('#myinboxhtml').hidden = false;

            type = "myinboxhtml"  
            this.setState({
                currentpage: "myinbox"
            })

        }
        else if(e.target.id == "myrequestid")
        {
            document.querySelector('#typeofpage').value = "request"
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = false;
            document.querySelector('#mycompletehtml').hidden = true;

            type = "myrequesthtml"
            this.setState({
                currentpage: "myrequest"
            })
        }
        else if (e.target.id == "mycompleteid")
        {
            console.log("kaido is dedd")
            document.querySelector('#typeofpage').value = "completed"
            document.querySelector('#mycompletehtml').hidden = false;
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = true;

            type = "mycompletehtml"  
            this.setState({
                currentpage: "mycomplete"
            })


        }
        else 
        {
            document.querySelector('#typeofpage').value = "request"
            document.querySelector('#myinboxhtml').hidden = false;
            document.querySelector('#myrequesthtml').hidden = true;
            document.querySelector('#mycompletehtml').hidden = true;



            type = "myinboxhtml"
            this.setState({
                currentpage: "myinbox"
            })

        }
        let paginationid = 1
        fetch(`/gotozjguen484s9gj302g/${paginationid}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                type: type,
                from: "inbox"
            })
        })        
        .then(response => response.json())
        .then(data => {
            ReactDOM.render(<InboxFeedInbox data={data}/>, document.querySelector('#' + type));

        });
    }
    
    render() {
        //<select>
       // <option value="1">Newest</option>
       // <option value="2">Oldest</option>      
    //</select>
        console.log("shanks", this.state.currentpage)

        console.log("currentpage state", this.state.currentpage)
        //you already create and if for the thing so no need yea just decide what kind of 
        //button you want to have
        return (
         <div class="buttonchoicesinbox d-flex justify-content-center mb-2">

            
            <span class="mt-2" ><a style={{background: "red"}} id="myinboxid" onClick={this.changeFeedInbox} class="myinboxcss"></a></span>
            {this.props.data["checkifinfluencer"] == true ?  <span class="mt-2"><a id="myrequestid" onClick={this.changeFeedInbox} class={this.state.currentpage ==  "myrequest" ? "requestcss btn-success"  : "requestcss"}></a></span>:null}
            {this.props.data["checkifinfluencer"] == true ?  <span class="mt-2"><a id="mycompleteid" onClick={this.changeFeedInbox} class={this.state.currentpage ==  "mycomplete" ? "completecss btn-success"  : "completecss"}></a></span>:null}



         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
   // var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main"
    //console.log("influencer username", influencerusername)
    let paginationid = 1;
    
    fetch(`/gotozjguen484s9gj302g/${paginationid}`)
   .then(response => response.json())
    .then(data => {
    console.log("gimme data", data)
       ReactDOM.render(<InboxFeedTitle data={data}/>, document.querySelector('#inboxmainid'));
       ReactDOM.render(<InboxFeedInbox data={data}/>, document.querySelector('#myinboxhtml'));



  });
});