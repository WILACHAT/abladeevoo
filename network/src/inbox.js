
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
    var checkoccasion = ""
    if (occasion == "birthday_html_id")
    {
        checkoccasion = "วันเกิด"
    }
    else if(occasion == "peptalk_html_id")
    {
        checkoccasion = "กําลังใจ"
    }
    else if(occasion == "roastbutton_html_id")
    {
        checkoccasion = "เผา"
    }
    else
    {
        checkoccasion = "อื่นๆ"
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
        this.deleteRequest = this.deleteRequest.bind(this);

        this.overlayCancel = this.overlayCancel.bind(this);
        this.submitReport = this.submitReport.bind(this);
        this.checkStar = this.checkStar.bind(this);


        
    }
    deleteRequest(id)
    {
        
        Swal.fire({
            title: '<strong>คุณกําลังจะกดไม่ทําการสั่งซื้อนี้ของแฟนคลับ</strong>',
            icon: 'info',
            html:
                        
                'คุณมั่นใจว่าจะ <b>ไม่ทํา</b> รีเควสของแฟนคนนี้ <br><br>(แฟนคลับจะได้รับเงินคืน)',
          
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'มั่นใจ',
            cancelButtonText:
            'ยกเลิก',
            })
            .then((result) => { 
                const getcooked = getCookie('csrftoken')
                let type = ""
                if (result["isConfirmed"] == true)
                {


                    fetch(`/gotoeachreserve`, {
                        method: 'PUT',
                        headers:{'X-CSRFToken': getcooked},
                        body: JSON.stringify({
                          type:"deleterequest",
                          reservationid: this.props.data["data"][0].id,
                          requester:this.props.data["data"][0].username,
                          influencer: this.props.data["data"][0].username_influencer
                        })
                      })
                    
                      .then(result => {
                        document.querySelector('#myinboxhtml').hidden = true;
                        document.querySelector('#myrequesthtml').hidden = false;
                        document.querySelector('#mycompletehtml').hidden = true;
                        document.querySelector('#eachreserve').hidden = true;
                        document.querySelector('#inboxmainid').hidden = false;


                        for (let i = 0; i < document.getElementById('inboxtableid').children.length; i++)
                        {
                            if (document.getElementById('inboxtableid').children[i].id == id)
                            {
                                document.getElementById('inboxtableid').children[i].remove()
                            }
                        }

                         
                      });
                    
                    
                }
            
            })
    }
    checkStar(e)
    {
        let rest = 0
        const myarray = e.target.id.split("", 5);
        
        let stars = parseInt(myarray[4])

        for (let i = 1; i < stars + 1; i++)
        {
            document.querySelector('#star'+i).className = "fa fa-star checked"
            rest = i

        }

        rest = rest + 1
        for (let j = rest;j < 6; j++)
        {
            document.querySelector('#star'+j).className = "fa fa-star unchecked"
        }
    }
    submitReport(id)
    {
            
        Swal.fire({
            title: '<strong>คุณกําลังจะกดรีพอร์ตคําสั่งซื้อนี้</strong>',
            icon: 'info',
            html:
                        
                'คุณมั่นใจว่าจะ <b>รีพอร์ต</b> รีเควสนี้ <br><br>(คนที่รีเควสจะไม่ได้รับเงินคืน)',
          
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'มั่นใจ',
            cancelButtonText:
            'ยกเลิก',
            })
            .then((result) => { 
                let type = ""
                if (result["isConfirmed"] == true)
                {
    
                    const getcooked = getCookie('csrftoken');

                    fetch(`/gotoeachreserve`, {
                        method: 'PUT',
                        headers:{'X-CSRFToken': getcooked},
                        body: JSON.stringify({
                          value: document.querySelector('#reportinputid').value,
                          type:"report",
                          reservationid: this.props.data["data"][0].id,
                          requester:this.props.data["data"][0].username,
                          influencer: this.props.data["data"][0].username_influencer
                        })
                      })
                    
                      .then(result => {
                        document.querySelector('#reportinputid').value = ""
            
                        document.querySelector('#overlayreportid').hidden = true
                        document.querySelector('#myinboxhtml').hidden = true;
                        document.querySelector('#myrequesthtml').hidden = false;
                        document.querySelector('#mycompletehtml').hidden = true;
                        document.querySelector('#eachreserve').hidden = true;
                        document.querySelector('#inboxmainid').hidden = false;
            

            
                        for (let i = 0; i < document.getElementById('inboxtableid').children.length; i++)
                        {
                            if (document.getElementById('inboxtableid').children[i].id == id)
                            {
                                document.getElementById('inboxtableid').children[i].remove()
                            }
                        }
            
                      });

                }
            
            })


        
    }
    overlayCancel(e)
    {
        document.querySelector('#reportinputid').value = ""
        document.querySelector('#overlayreportid').hidden = true
    }
    reportButton(e)
    {
        document.querySelector('#overlayreportid').hidden = false
    }
    saveUrl(e)
    {
        let content = e.target.value
        if (!navigator.clipboard) {
            return
        }

        navigator.clipboard.writeText(content)
        .then(() => {
            Swal.fire({
                title: 'คัดลอกวีดีโอเรียบร้อย!',
                showConfirmButton: false,

                timer: 500

              })
        
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

        if (checker != 'video')
        {
          Swal.fire({
            icon: 'error',
            text: 'ต้องเป็นวีดีโอแต่ดันอัพโหลดรูป',
          })
        }
        else
        {
            let formData = new FormData();
            formData.append("media", fileinput);
            Swal.fire({
                icon: 'info',
                title: 'กําลังเซฟวีดีโอ',
                text: 'กรุณาอย่ากดออกหรือรีเฟรชจากหน้านี้จนกว่าจะมีข้อความสําเร็จ อาจจะใช้เวลานาน',
              })
            
            const getcooked = getCookie('csrftoken')
            fetch(`/forupload/${type}`, {
              method: 'POST',
              headers:{'X-CSRFToken': getcooked},
              body: formData
      
            })
            .then(response => response.json())
              .then(data => {
                  //right now its either you create a new video or unhide the one that you already have
                document.querySelector('#testervideo').hidden = false
                document.querySelector('#sendingvideoidback').name = data['url']
                document.querySelector('#testervideo').src = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + data['url'] + ".mp4"
                Swal.fire({
                    icon: 'success',
                    title: 'สําเร็จ!',
                    text: '*คุณต้องกดอัพโหลดถึงจะส่งวีดีโอไปให้แฟนคลับ*'
                  })
              });
        }
  
        
    }

    goBack(e)
    {

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
        if (videoid != "")
        {
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
                Swal.fire({
                    title: 'สําเร็จ!',
                    showCancelButton: false,
                    showConfirmButton: false
    
    
                  })
                  setTimeout(() => {   window.location.href = "/inbox"; }, 800);
    
              });
              
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'คุณยังไม่ได้อัพโหลดวีดีโอ'
           
            })
        }

       
    }
    submitReview(e)
    {
   
        const getcooked = getCookie('csrftoken');
        var value = document.querySelector('#typeforreview').value
        if (value == "")
        {
            Swal.fire({
                icon: 'error',
                title: 'คุณยังไม่ได้เขียนรีวิว'
              })
        }
        else
        {
            var reserveid = this.props.data["data"][0].id


            var influencername = this.props.data["data"][0].username_influencer
    
            let selectreview = 5
            let count = 0
            for (let i = 0; i < document.querySelector('#starboss').children.length; i++)
            {
                let checker = document.querySelector('#starboss').children[i].className.split(" ")[2]
                if (checker == "checked")
                {
                    count +=1
                }
            }
            selectreview = count
           
            
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
                Swal.fire({
                    title: 'สําเร็จ!',
                    showCancelButton: false,
    
                  })
                  setTimeout(() => {   window.location.href = "/inbox"; }, 800);
            });
            

        }
        
        

    }
    render() {
        let videoandstuff = ""
        link = "https://res.cloudinary.com/ablaze-project/video/upload/l_9687f7ee-e194-11ec-a149-3af9d3ce8c1e1.png,w_160,h_60,g_south_west/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"
       // https://res.cloudinary.com/demo/video/upload/l_cloudinary_icon,w_70,h_70,g_north_west/abbey_road.mp4
        videoandstuff = 
        <div id="videowhengetid">
            <div class="videowhenget">
                <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center">
                        <video autoplay="true" muted="true" id="testervideo" class="videovideowhenget" controls>
                            <source type="video/mp4" src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div class="beforesavethelink d-flex justify-content-center mt-2">
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn registerbtnsavelink">คัดลอกวีดีโอ</button>
                    </div>

                </div>

            </div>

                        
        
        </div>

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
                              <div class="custom-file">
                                  <div class="d-flex justify-content-center mt-3">
                                    <label class="chooseprofile4label" for="inputGroupFile01">
                                        กดเพื่อเลือกวีดีโอที่จะส่งให้แฟนคลับ
                                        <input type="file" onChange={this.chooseFile} class="chooseprofile1" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                      </label>                                  
                                    </div>

        
                              </div>
                              <div class="d-flex justify-content-center">
                        <video autoplay="true" muted="true" hidden id="testervideo" class="videovideowhenget" controls>
                            <source type="video/mp4" src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                          </div>
                          
                    <div class="d-flex justify-content-center mt-4">
                        <h6 class="wa">ข้อความสั้นๆให้แฟนคลับ: </h6>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho"id="sendingbacktorequest"></input>
                    </div>
                    <div class="d-flex justify-content-center mt-3 mb-5">
                        <button class="btn registerbtnforupload" onClick={this.submitSave} id="submitrequested">อัพโหลด</button>
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
                         <div class="beforedonetitle">
                         <div class="d-flex flex-column">

                             <div class="d-flex justify-content-center">
                                <h1 class="biggersarabun">วีดีโอเสร็จสิ้น!</h1>
                            </div>
                            
                            <div class="d-flex justify-content-center">
                                <a href="#videowhengetid"class="sarabun">กดเพื่อเลื่อนไปดูวีดีโอ</a>
                            </div>
                            </div>

                        
                        </div>

                      
                        <div class="donetitle">

                        
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
                        <h4 class="wa">สตาร์กําลังดําเนินการทําวีดีโอที่น่าจดจําของท่านอยู่</h4>

                    </div>
                </div>
            }
            else
            {
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

                    postoption = 
                    <div>
                        
                  
                        <div class="beforedonetitle">
                         <div class="d-flex flex-column">

                             <div class="d-flex justify-content-center">
                                <h1 class="biggersarabun">วีดีโอเสร็จสิ้น!</h1>
                            </div>
                            
                            <div class="d-flex justify-content-center">
                                <a href="#videowhengetid"class="sarabun">กดเพื่อเลื่อนไปดูวีดีโอ</a>
                            </div>
                            </div>

                        
                        </div>

                      
                        <div class="donetitle">

                        
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
                            <h4 class="wa">เขียนรีวิวและให้ดาวสตาร์คนโปรดของคุณ</h4>
                        </div>

                        <div id="starboss"class="d-flex justify-content-center mt-3">
                            <span id="star1" onClick={this.checkStar} class="fa fa-star checked"></span>
                            <span id="star2" onClick={this.checkStar} class="fa fa-star checked"></span>
                            <span id="star3" onClick={this.checkStar} class="fa fa-star checked"></span>
                            <span id="star4" onClick={this.checkStar} class="fa fa-star checked"></span>
                            <span id="star5" onClick={this.checkStar} class="fa fa-star checked"></span>
                        </div>

                        <div class="d-flex justify-content-center mt-2 mb-3">
                            <input maxlength="250" class="inputhehorere" id="typeforreview" placeholder="รีวิว"></input>
                        </div>

                        <div class="d-flex justify-content-center mb-5">
                            <button onClick={this.submitReview} class="btn btn-primary">บันทึก</button>
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
        if (occasion == "วันเกิด") 
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
                        <h4 class="wainfosaywhat">{this.props.data["data"][0].thirdinputoccasion}</h4>
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
        else if (occasion == "กําลังใจ")
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
        else if (occasion == "เผา")
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
       
        
        let link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"

        if (document.querySelector('#typeofpage').value == "inbox")
        {
            if (this.props.data["data"][0].influencer_pic != null)
            {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].influencer_pic + ".jpg"

            }
            else
            {
                link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png"
            }
     
        }
        else
        {
            if (this.props.data["data"][0].normal_pic != null)
            {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["data"][0].normal_pic + ".jpg"
            }
            else
            {
                link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
            }
        }

        return (
            <div>
                <div hidden id="overlayreportid" class="overlayreport">
                    <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center">
                        <label>Report</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputhehore" id="reportinputid" placeholder="รายงานเรื่องอะไร"></input>
    
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <button onClick={() => this.submitReport(this.props.id)}class="btn btn-primary mr-2">รายงาน</button>
                        <button onClick={this.overlayCancel} class="btn btn-danger">ยกเลิก</button>
                    </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="backbutton btn btn-primary mb-3"onClick={this.goBack}>กลับ</button>
                    {this.props.data["type"] == "request" ? <button class="backbutton btn btn-danger mb-3 ml-3"onClick={this.reportButton}>รายงาน</button>:null}
                    {this.props.data["type"] == "request" ? <button class="backbutton btn btn-danger mb-3 ml-3"onClick={() => this.deleteRequest(this.props.id)}>ไม่ทํา</button>:null}



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
                                    <h4 class="wa">ถึง: </h4><h4 class="wainfo">{this.props.data["data"][0].tointro}</h4>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <h4 class="wa">จาก: </h4><h4 class="wainfo">{this.props.data["data"][0].fromintro}</h4>
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
    clickHref(id)
    {
        
        document.querySelector('#eachreserve').hidden = false;
        document.querySelector('#inboxmainid').hidden = true;
        document.querySelector('#myinboxhtml').hidden = true;
        document.querySelector('#mycompletehtml').hidden = true;

        document.querySelector('#myrequesthtml').hidden = true;

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
            ReactDOM.render(<EachReserve data={data} id={id} />, document.querySelector('#eachreserve'));
            });
      
            }
    render() {

       
        let eachcontent = ""
       
        let today = new Date().toISOString().slice(0, 10)

        let checktime = 0
        if (this.props.duedate != null || this.props.dudedate != "")
        {
            if (today > this.props.duedate)
            {
                checktime = 1
            }
           
        }

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
              link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png"
        
            }
            else
            {
              link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.influencer_pic + ".jpg"
            }
        }
        
        var occasion = checkforoccasiontype(this.props.whatoccasion)
        let id = this.props.id + "eachrow"


        eachcontent =  
        <div class="okseecolor">
        <div class="randomdesign d-flex justify-content-between">
            <div class="fakimgnoeditinbox d-flex justify-content-start ml-3">
                <div>
                    <img class="imgnoeditinbox" src={link}></img>
                </div>
                <div class="d-flex flex-column yeathename mt-2">
                    <a class="nameininbox" >{this.props.name}</a> 
                    <h4 class="wanameinbox mt-2">{this.props.giftornot == "someoneelse_html_id" ? "ของขวัญ":"ตัวเอง"}</h4>
                    
                </div>
                   
              
            </div>
        

            <div class="d-flex flex-column">
                <div class="d-flex justify-content-center">
                    <h4 class="waoccasion">{occasion}</h4>
                </div>
                <div onClick={() => this.clickHref(id)} class="button" id="button-7">
                    <input type="hidden" id="divtogetid" value={this.props.id}></input>
                    <div value={this.props.id}  class="dub-arrow">
                        <img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </div>
                    <a class="letsgo" href="#">เข้าชม</a>
                </div>
                
            </div>
            

        </div>
        <div class="d-flex justify-content-center mt-1">
                    {this.props.completed == true ? <h6 class="waduedatecomplete mt-3">เสร็จสิ้น</h6> : 
                    checktime == 0 ? 
                        <div class="inboxtroublesome mt-1 ml-2">
                                
                                <h6 class="waduedate"> ไม่เสร็จสิ้น</h6>
                                <div class="d-flex justify-content-center mb-5">
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
            <div id={id}class="d-flex justify-content-center">
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
          hide: "ซ่อนเสร็จสิ้น",
          sort: "เรียงตามวันครบกําหนด",
          rowsstate:[]

        }
    }
    sortTime(e)
    {
       
        
        let type = "mysorttime"
        const csrftoken = getCookie('csrftoken');


        if (e.target.value == "เรียงตามวันครบกําหนด")
        {
            type = "mysorttime"
        }
        else
        {
            type = "myrequesthtml"
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
            let sort = ""

            if (data["sort"] == 0)
            {
                sort = "เรียงตามวันครบกําหนด"               
            }
            else
            {
                sort = "เลิกเรียงลัาดับ"
            }

            this.setState({
                newdata: data,
                sort: sort
              })
        })
    }
    hideCompleted(e)
    {


        let type = ""

        const csrftoken = getCookie('csrftoken');
       
        
        
        if (e.target.value == "เลิกซ่อน")
        {
            type = "myinboxhtml"
        }
        else
        {
            type = "hidecompleted"
        }
      
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
        
            let hide = ""
            if (data["hide"] == 0)
            {
                hide = "ซ่อนเสร็จสิ้น"
            }
            else
            {
                hide = "เลิกซ่อน"
            }
          
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
      
        let type=""
        if (this.props.data["type"] == "request")
        {
            if (this.state.sort == "เรียงตามวันครบกําหนด")
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
            if (this.state.hide == "ซ่อนเสร็จสิ้น")
            {
                type = "myinboxhtml"
            }
            else
            {
                type = "hidecompleted"
               
            }

        }
      
        const getcooked = getCookie('csrftoken');

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
          this.setState({
            newdata: data,
             
          })

          this.setState({
            pagination:this.state.newdata["paginationid"]
        })
      
        });
  
        window.scrollTo(0, 0)
    }
    render() {
       
    const button = [];
    const rows = [];

    const paginationid = this.props.data["paginationid"]
  
    for (let j = 0; j < this.state.newdata["num_pages"]; j++)
    {
      let thej = j + 1
      button.push
      (
        <a onClick={this.changePage} class={this.state.pagination == thej ? "paginationcolor btn":"paginationnocolor btn"}>{thej}</a>
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
   

        let gotoindex = "/"
        let gotoaboutus = "/aboutus"


        return(
            <div class="coversalldiv">      
                <div class="d-flex justify-content-center">    
                    {this.state.newdata["type"] == "inbox" ? <button id="hidecompletedid" value={this.state.hide}class="sortbutton btn" onClick={this.hideCompleted}>{this.state.hide}</button>:null}
                    {this.state.newdata["type"] == "request" ? <button class="sortbutton btn" value={this.state.sort}onClick={this.sortTime}>{this.state.sort}</button>:null}
               </div> 
                {this.state.newdata["data"] != "" ? 
            
                <div class="inboxtable d-flex justify-content-center">
                    <div id="inboxtableid" class="columninbox d-flex justify-content-center flex-column">
                        {rows}
                    </div>
                </div>: 
                <div>
                    <div class="norequestdiv">
                            <div class="d-flex justify-content-center">
                            {this.state.newdata["type"] == "inbox" ? 
                              <div class="noorderyet">
                              

                                <div class="d-flex justify-content-center">
                                    <div>
                                    <div class="d-flex justify-content-center">
                                            <h1 class="waheading">ยังไม่มีออเดอร์ในอินบ็อกซ์</h1>
                                        </div>
                                        <div class="d-flex justify-content-center mt-4">
                                            <h4 class="waa mr-3">ค้นหาสตาร์: </h4>
                                            <a href={gotoindex} class="wae">หน้าหลัก</a>                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h4 class="waa mt-3">สอบถาม: vidma@vidma.tv</h4>
                                        </div>
                                        <div class="d-flex justify-content-center mt-4">
                                            <h4 class="waa mr-3">เรียนรู้เพิ่มเติม: </h4>
                                            <a href={gotoaboutus} class="wae">เกี่ยวกับเรา</a> 
                                        </div>
                                    </div>
                                    </div>
                      
                            </div>: 
                       
                                <div class="noorderyet">
                                    <div class="d-flex justify-content-center">
                                    <div>
                                    <div class="d-flex justify-content-center">
                                            <h1 class="waheading">คุณยังไม่มีออเดอร์ในรีเควสท์</h1>
                                        </div>
                                        <div class="d-flex justify-content-center mt-4">
                                            <h2 class="waa mt-2">เชิญชวนแฟนคลับมาใช้เลย!</h2>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h4 class="waa mt-3">สอบถามเพิ่มเติม: vidma@vidma.tv</h4>
                                        </div>
                                        <div class="d-flex justify-content-center mt-4">
                                            <h4 class="waa mt-3 mr-3">อ่านเรื่องเกี่ยวกับกฏหมาย:</h4>
                                            <a href="/legal" class="wae mt-3">กฏหมาย</a>
                                        </div>

                                   
                                            </div>
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
            try {
                document.getElementById('requesttableid').id = "inboxtableid"
            }
              catch(err) {}

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
            try {
                document.getElementById('inboxtableid').id = "requesttableid"
            }
              catch(err) {}
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
            try {
                document.getElementById('requesttableid').id = "inboxtableid"
            }
              catch(err) {}
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

        //you already create and if for the thing so no need yea just decide what kind of 
        //button you want to have
        return (
         <div class="buttonchoicesinbox mb-2">
             <div class="wangong">
                <button id="myinboxid" onClick={this.changeFeedInbox} class={this.state.currentpage ==  "myinbox" ? "myinboxclicked"  : "myinboxcss"}>อินบ็อกซ์</button>
            </div>
                {this.props.data["checkifinfluencer"] == true ? <div class="wangong"> <button id="myrequestid" onClick={this.changeFeedInbox} class={this.state.currentpage ==  "myrequest" ? "requestcssclicked"  : "requestcss"}>รีเควส</button></div>:null}
                {this.props.data["checkifinfluencer"] == true ? <div class="wangong"><button id="mycompleteid" onClick={this.changeFeedInbox} class={this.state.currentpage ==  "mycomplete" ? "completecssclicked"  : "completecss"}>วีดีโอที่เสร็จสิ้น</button></div>:null}
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
       ReactDOM.render(<InboxFeedTitle data={data}/>, document.querySelector('#inboxmainid'));
       ReactDOM.render(<InboxFeedInbox data={data}/>, document.querySelector('#myinboxhtml'));



  });
});