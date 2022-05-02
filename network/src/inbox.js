
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



        console.log("right in the constructor")
        console.log("this.props.data", this.props.data)


        console.log("bruh", this.props.data["type"])
        
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
        }
        else
        {
            document.querySelector('#myinboxhtml').hidden = false;
            document.querySelector('#myrequesthtml').hidden = true;
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
    render() {
        let videoandstuff = ""
        link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

        videoandstuff = 
        <div>
                   {document.querySelector('#typeofpage').value == "request" ? <div>
                        {this.props.data["data"].completed != true ? 
                              <div>
                              <div class="d-flex justify-content-center">
                                  <label htmlFor="edit_post_txt">Click to change introduction video: </label>
                              </div>
                              <div class="custom-file">
                                  <div class="d-flex justify-content-center">
                                      <input type="file" onChange={this.chooseFile} class="editintrovid" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                                  </div>
                              </div>
                              <video hidden id="testervideo" width="320" height="240" controls>
                            <source src=""></source>
                            Your browser does not support the video tag.
                        </video>
                          </div>:   
                    null}
                        
                    </div>:  <video id="testervideo" width="320" height="240" controls>
                        <source src={link}></source>
                        Your browser does not support the video tag.
                        </video>}

                        
                    
        </div>


        var postoption = ""
        if (document.querySelector('#typeofpage').value == "request")
        {
            //this is before influencer posted video
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div>
                    {videoandstuff}

                    <input name="" type="hidden" id="sendingvideoidback"></input>
                    <input id="sendingbacktorequest"></input>
                    <button class="btn btn-primary" onClick={this.submitSave} id="submitrequested">Post</button>
                </div>
            }
            else
            {
                //this is after influencer posted video
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"
                
                    postoption = 
                    <div>
                        <h1>DONE</h1>
                        {videoandstuff}

                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>


                        <h1>What you wrote: {this.props.data["forpostdata"][0]}</h1>
                    
                        {this.props.data["data"][0].reviewcompleted != true ? 
                        <div class="d-flex justify-content-center">
                            <h3>No reviews from customer yet</h3>
                        </div>:
                         <div class="d-flex justify-content-center">
                          <h3>Customer Review: {this.props.data["reviewvalue"]}</h3>
                     </div>}
                    </div>
            }
        }
        else
        {
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div>
                    <h1>Waiting for influencer</h1>
                </div>
            }
            else
            {
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

                    postoption = 
                    <div>
                        <h1>Done</h1>
                        {videoandstuff}

                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>
                        <h2>Message from influencer: {this.props.data["forpostdata"][0]}</h2>


                        {this.props.data["data"][0].reviewcompleted != true ? 
                        <div>
                        <input id="typeforreview"></input>
                        <select id="selectforreview">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>
                        <button onClick={this.submitReview} class="btn btn-primary">Submit</button>
                    </div>:    
                    <div>        
                        <h1>Ur Review</h1>
                        <h3>{this.props.data["reviewvalue"]}</h3>
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
                <div class="d-flex justify-content-center">
                    <h4>Birthday</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>When is the birthday: {this.props.data["data"][0].firstinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>How old are they turning: {this.props.data["data"][0].secondinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Instructions: {this.props.data["data"][0].thirdinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Optional: {this.props.data["data"][0].fourthinputoccasion}</h4> 
                </div>

            </div>
        } 
        else if (occasion == "Pep Talk")
        {
            occasion = 
            <div>
                <div class="d-flex justify-content-center">
                    <h4>Pep Talk</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>What's going on?: {this.props.data["data"][0].firstinputoccasion}</h4>
                </div>
                
                <div class="d-flex justify-content-center">
                    <h4>How can help?: {this.props.data["data"][0].secondinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Optional: {this.props.data["data"][0].thirdinputoccasion}</h4>
                </div>

            </div>
        }
        else if (occasion == "Roast")
        {
            occasion = 
            <div>
                <div class="d-flex justify-content-center">
                    <h4>Pep Talk</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>What to Roast?: {this.props.data["data"][0].firstinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Optional: {this.props.data["data"][0].secondinputoccasion}</h4>
                </div>
                
            </div>
        }
        else
        {
            occasion = 
            <div>
                <div class="d-flex justify-content-center">
                    <h4>Others</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>What's the occasion?: {this.props.data["data"][0].firstinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Instructions: {this.props.data["data"][0].secondinputoccasion}</h4>
                </div>

                <div class="d-flex justify-content-center">
                    <h4>Optional: {this.props.data["data"][0].thirdinputoccasion}</h4>
                </div>
            </div>
        }
        console.log("this is the type of intro", this.props.data["data"][0].typeintro)
        console.log("SIDEMEN", this.props.data["propicandusername"])
        let link = ""
        if (this.props.data["propicandusername"][1] == null)
        {
          link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
    
        }
        else
        {
          link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.data["propicandusername"][1] + ".jpg"
        }

        return (
            <div>
                <button class="btn btn-primary"onClick={this.goBack}>Back</button>
                <div class="d-flex justify-content-center">
                    <h4>Order Details</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <h4>Username: </h4>
                    <h4>{this.props.data["propicandusername"][0]}</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <img class="imgnoedit" src={link}></img>
                </div>
            
                    {this.props.data["data"][0].typeintro == "someoneelse_html_id" ?   
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-center"> 
                        <h4>A Gift For Someone Else</h4> 

                        </div>
                        <div class="d-flex justify-content-center"> 
                        <h4>From: {this.props.data["data"][0].tointro}</h4>

                        </div>
                        <div class="d-flex justify-content-center"> 
                        <h4>To: {this.props.data["data"][0].fromintro}</h4>

                        </div>
                    </div>:
                    <div>
                        <h4>For Buyer</h4> 
                     
                        <h4>{this.props.toinro}</h4>
                    </div>}     
                    {occasion}
                    <div class="d-flex justify-content-center">
                        {this.props.data["data"][0].completed == true ? <h4>Completed</h4> : <h4>Not Complete</h4>}
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

        console.log("KINGDOM IS ONE OF THE BEST MANGA OF ALL TIME BUT STILL ONE PIECE IS BETTER", document.querySelector('#divtogetid').value)
        document.querySelector('#myrequesthtml').hidden = true;

        console.log("clickedwork")
        const getcooked = getCookie('csrftoken');
        let paginationid = 1;
        fetch(`/gotozjguen484s9gj302g/${paginationid}`, {
        method: 'PUT',
        headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({
          reservationid: document.querySelector('#divtogetid').value,
          from: "eachreserve"  
            })
        })
        .then(response => response.json())

        .then(data => {
            console.log("data", data)
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

        let g1 = new Date(today);

        let g2 = new Date(this.props.duedate);

        let checktime = 0
        if (g1.getTime() < g2.getTime())
        {
            checktime = 0
        }
        else
        {
            checktime = 1
        }
        let link = ""

        if (this.props.type == "request")
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
        <div class="d-flex justify-content-between">
            <div class="d-flex justify-content-start">
                <img class="imgnoeditinbox mr-5" src={link}></img>
                <div class="d-flex flex-column">
                    <a class="wa" >{this.props.name}</a> 
                    <h4 class="wa">{this.props.giftornot == "someoneelse_html_id" ? "A gift":"For you"}</h4>
                   
                   {this.props.completed == true ? <h6 class="waduedatecomplete">เสร็จสิ้น</h6> : 
                   checktime == 0 ? 
                       <div>
                            <h6 class="waduedate"> ไม่เสร็จสิ้น</h6>
                            <label class="wa">ส่งก่อน</label>
                            <h4 class="waduedate">{this.props.duedate}</h4> 
                       </div>:
                       <h4 class="waduedateexpire">หมดอายุ</h4>}
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-center">
                    <h4 class="wa">{occasion}</h4>
                </div>
                <div onClick={this.clickHref} class="button" id="button-7">
                    <input type="hidden" id="divtogetid"value={this.props.id}></input>
                    <div value={this.props.id}  class="dub-arrow">
                        <img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" />
                    </div>
                    <a class="letsgo" href="#">Watch</a>
                </div>
                
            </div>
            

        </div>
    </div>


        return(
            <div class="d-flex justify-content-center mb-4">

                {this.props.type == "inbox" ? <div class="ineachrow mt-4"> {eachcontent} </div>: 
                
                this.props.completed == true ? <div class="ineachrow mt-4"> {eachcontent} </div>:
                
                checktime == 1 ? null:
                <div class="ineachrow mt-4"> {eachcontent} </div>}

            </div>
        )
    }
}

class InboxFeedInbox extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.hideCompleted = this.hideCompleted.bind(this);


        this.state = 
        {
          newdata: this.props.data,
          hide: "Hide Completed"

        }
    }
    hideCompleted(e)
    {


        let type = ""

        console.log("ngong")
        console.log("ngong sus", this.state.hide)

        const csrftoken = getCookie('csrftoken');
        let paginationid = 1
        if (e.target.value == "Unhide Completed")
        {
            type = "myrequesthtml"
        }
        else
        {
            console.log("is it in hidecompleted yohohoho")
            type = "hidecompleted"
        }
        console.log("type before in ", type)
        fetch(`/gotozjguen484s9gj302g/${paginationid}`, {
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

            this.setState({
                newdata: data,
                hide: hide
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
            type = "myrequesthtml"
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

    for (let j = 0; j < this.props.data["num_pages"]; j++)
    {
      let thej = j + 1
      button.push
      (
        <li class={paginationid == thej ? "page-item active":"page-item"} onClick={this.changePage}><a class="page-link">{thej}</a></li>
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
        return(
            <div>      
                <div class="d-flex justify-content-center mb-5">    
                    {this.state.newdata["type"] == "request" ? <button id="hidecompletedid" value={this.state.hide}class="btn btn-primary" onClick={this.hideCompleted}>{this.state.hide}</button>:null}
               </div> 
                {this.state.newdata["data"] != "" ? 
            
                <div class="inboxtable d-flex justify-content-center">
                    <div class="columninbox d-flex justify-content-center flex-column">
                        {rows}
                    </div>
                </div>: <div>
                <h6>
                    <h4>ยัวไม่มี Request</h4>
                    <h4>Share hai khon eunn </h4>
                </h6>
                
            </div>}
                {rows != "" ? 
        <div class="paginationcss">
        {this.props.data["num_pages"] != 0 ?
        <ul class="pagination container justify-content-center mt-3">
            <li class="page-item">
              {this.state.pagination != 1 ? <span id={this.state.pagination} class="page-link pagelink" onClick={this.changePage}>Previous</span>: null}
              </li>
                {button}              
              <li class="page-item">
              {this.state.pagination != this.props.data["num_pages"] ? <span id={this.state.pagination} class="page-link pagelink" onClick={this.changePage}>Next</span>: null}
            </li>
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
            document.querySelector('#myinboxhtml').hidden = false;

            type = "myinboxhtml"  

        }
        else if(e.target.id == "myrequestid")
        {
            document.querySelector('#typeofpage').value = "request"
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = false;

            type = "myrequesthtml"
        }
        else 
        {
            document.querySelector('#typeofpage').value = "request"
            document.querySelector('#myinboxhtml').hidden = true;
            document.querySelector('#myrequesthtml').hidden = false;
            document.querySelector('#hiderequesthtml').hidden = false;


            type = "myrequesthtml"

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
  
        return (
         <div class="d-flex justify-content-center mb-2">
            
            <span><a id="myinboxid" onClick={this.changeFeedInbox} class="myinboxcss"></a></span>
            {this.props.data["checkifinfluencer"] == true ?  <span><a id="myrequestid" onClick={this.changeFeedInbox} class="requestcss"></a></span>:null}


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