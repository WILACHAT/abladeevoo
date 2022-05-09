
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

class BookPage extends React.Component {
    constructor(props) {
      super(props);
      this.changeIntroReserve = this.changeIntroReserve.bind(this);
      this.changeOccasionReserve = this.changeOccasionReserve.bind(this);
      this.saveReserve = this.saveReserve.bind(this);



      //the number of steps can be state as well i believe
      this.state = {
        reserve_into_html: 
            <div name="introname"id="someoneelse_html_id" >
                <div>
                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">จากใคร (ชื่อเล่น/ชื่อจริง)</label>
                    </div>                    
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required id="from_intro" placeholder="จากใคร"></input>
                    </div>
                </div>

                
            </div>,
        reserve_occasion_html:
            <div name="occasionname"id="birthday_html_id">
                <div>
                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">เกิดวันที่เท่าไหร่</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa1" placeholder="เกิดวันที่เท่าไหร่?"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">จะอายุขึ้นเท่าไหร่</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa2" placeholder="จะอายุขึ้นเท่าไหร่?"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">อยากให้สตาร์พูด/ทําอะไรให้</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa3"placeholder="อยากให้สตาร์พูด/ทําอะไรให้"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์:</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" name="occa4" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
                    </div>

                </div>
            </div>,
        colorof1:"someoneelsehtml",
        colorof2:"birthday"
      }

    }
    saveReserve(e)
    {
    var typeintro = "";
    var tointro = "";
    var fromintro = "";
    var typeoccasion = "";
    var firstinputocca = "";
    var secondinputocca = "";
    var thirdinputocca = "";
    var fourthinputocca = "";
    let datetime = ""

    let checkblank = 0


    var checkerintro = document.getElementsByName("introname")[0].id
    tointro = document.querySelector('#to_intro').value;
 
    typeintro = checkerintro;

    if (intro == "")
    {
        checkblank = 1
    }
    
    
    if (checkerintro == "someoneelse_html_id")
    {
       fromintro =  document.querySelector('#from_intro').value;
       if (fromintro == "")
       {
           checkblank = 1
       }
    }
    
    var checkeroccasion = document.getElementsByName("occasionname")[0].id
    typeoccasion = checkeroccasion

    firstinputocca = document.getElementsByName("occa1")[0].value
    if (firstinputocca == "")
    {
        checkblank = 1
    }
    secondinputocca = document.getElementsByName("occa2")[0].value
    if (secondinputocca == "")
    {
        checkblank = 1
    }
   
    if (document.getElementsByName("occa3").length != 0)
    {
        thirdinputocca = document.getElementsByName("occa3")[0].value
        if (thirdinputocca == "")
        {
            checkblank = 1
        }
    }
   
    if (document.getElementsByName("occa4").length != 0)
    {
        fourthinputocca = document.getElementsByName("occa4")[0].value
        if (fourthinputocca == "")
        {
            checkblank = 1
        }
    }

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    datetime = document.getElementById('date_inputid').value
    if (datetime == "")
    {
        checkblank = 1
    }

    let today = new Date().toISOString().slice(0, 10)

    let g1 = new Date(today);

    let g2 = new Date(datetime);

    if (g1.getTime() >= g2.getTime())
    {
        checkblank = 2

    }
   
    if (checkblank == 1)
    {
        alert("Forgot to fill in at least one form")
    }
    else if (checkblank == 2)
    {
        alert("Time must be atleast 1 day ahead")
    }
    else
    {
            const getcooked = getCookie('csrftoken')
            fetch(`/book/${influencerusername}`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
                typeintro: typeintro,
                tointro: tointro,
                fromintro: fromintro,
                typeoccasion: typeoccasion,
                firstinputocca: firstinputocca,
                secondinputocca: secondinputocca,
                thirdinputocca: thirdinputocca,
                fourthinputocca: fourthinputocca,
                datetime: datetime
            })
            })
            .then(data => {
                window.location.href = "/";
            });
    }


    
    }
    
    changeIntroReserve(e)
    {

        if (e.target.id == "someoneelsehtml")
        {
            console.log("is it someoneelsehtml")
            this.setState({
                reserve_into_html:
                     <div name="introname" id="someoneelse_html_id">
                        <div>
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">จากใคร (ชื่อเล่น/ชื่อจริง)</label>
                            </div>                    
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" required id="from_intro" placeholder="จากใคร"></input>
                            </div>
                        </div>
                     </div>,
                     colorof1:"someoneelsehtml"
            });
        }
        else
        {
            console.log("is it anotherpeoplehtml")
            this.setState({
                reserve_into_html:
                <div name="introname" id="myself_html_id">
                </div>,
                colorof1:"myselfhtml"
            });
          
        }
    }
    changeOccasionReserve(e)
    {
        console.log("this is e", e)
        if (e.target.id == "birthdaybutton")
        {
            console.log("birthday")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="birthday_html_id">
                        <div>
                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">เกิดวันที่เท่าไหร่</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa1" placeholder="เกิดวันที่เท่าไหร่?"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">จะอายุขึ้นเท่าไหร่</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa2" placeholder="จะอายุขึ้นเท่าไหร่?"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">อยากให้สตาร์พูด/ทําอะไรให้</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" required name="occa3"placeholder="อยากให้สตาร์พูด/ทําอะไรให้"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์:</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="inputheho" name="occa4" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
                    </div>

                </div>
                    </div>,
                    colorof2:"birthday"

            })
        }
        else if (e.target.id == "peptalkbutton")
        {
            console.log("peptalk")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="peptalk_html_id">
                        <div>
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">ทําไมถึงอยากได้กําลังใจ</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" required name="occa1" placeholder="ทําไมถึงอยากได้กําลังใจ?"></input><br></br>
                            </div>

                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">ให้สตาร์ช่วยอะไรได้บ้าง</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" required name="occa2" placeholder="ให้สตาร์ช่วยอะไรได้บ้าง?"></input><br></br>
                            </div>

                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" name="occa3" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input><br></br>
                            </div>
                           
                        </div>
                    </div>,
                    colorof2:"peptalk"
                    
            })

        }
        else if (e.target.id == "roastbutton")
        {
            console.log("roast")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="roastbutton_html_id">
                        <div>
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">อยากได้ฏัาลังใจในเรื่องอะไร</label>
                            </div>

                            <div class="d-flex justify-content-center"> 
                                <input class="inputheho" required name="occa1" placeholder="อยากได้ฏัาลังใจในเรื่องอะไร"></input>
                            </div>

                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                            </div>

                            <div class="d-flex justify-content-center">
                                <input class="inputheho" name="occa2" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
                            </div>
                        </div>
                    </div>,
                    colorof2:"roast"
            })

        }
        else
        {
            console.log("other lets go")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="other_html_id">
                        <div>
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">เนื่องในโอกาสอะไร</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" required name="occa1" placeholder="เนื่องในโอกาสอะไร?"></input>
                            </div>
                           
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">อยากให้สตาร์พูดหรือทําอะไร</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" required name="occa2" placeholder="อยากให้สตาร์พูดหรือทําอะไร"></input>
                            </div>
                           
                            <div class="d-flex justify-content-center mt-2">
                                <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input class="inputheho" name="occa3" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"/>
                            </div>
                        </div>
                    </div>,
                    colorof2:"other"
            })

        }
    }

    
    render() {
        console.log("this.state.colorof1", this.state.colorof1)

        return (
         <div>
        
            <div id="intro" class="d-flex justify-content-center">
                <div class="bookdetails">
                    <div class="d-flex justify-content-center">
                        <h4 class="wa">Vid นี้อยากทําให้ใคร: </h4>
                    </div>
                
                    <hr class="hr"/>
                    <div class="d-flex justify-content-center mt-2">
                        <button type="button" class= {this.state.colorof1 == "someoneelsehtml" ? "btn btn-success mr-3": "btn btn-primary mr-3"} id="someoneelsehtml" onClick={this.changeIntroReserve}><h6 id="someoneelsehtml" onClick={this.changeIntroReserve} class="wabuttontext">คนอื่น</h6></button>
                        <button type="button" class={this.state.colorof1 == "myselfhtml" ? "btn btn-success": "btn btn-primary"} id="myselfhtml" onClick={this.changeIntroReserve}><h6 id="myselfhtml" onClick={this.changeIntroReserve} class="wabuttontext">ตัวเอง</h6></button>                    
                    </div>
                    <div>
                        <div class="d-flex justify-content-center mt-2">
                            <label class="wa">ถึงใคร (ชื่อเล่น/ชื่อจริง)</label>
                        </div>
                        <div class="d-flex justify-content-center">
                            <input class="inputheho" required id="to_intro" placeholder="ถึงใคร"></input>
                        </div>
                    </div>
                    {this.state.reserve_into_html}

                </div>
            </div>

            <div id="occasion" class="d-flex justify-content-center">

                <div class="bookdetails mt-5">
                    <div class="d-flex justify-content-center">
                        <h4 class="wa">เนื่องในโอกาสอะไร: </h4>
                    </div>
                
                    <hr class="hr"/>
                    <div class="d-flex justify-content-center mt-2">
                        <button type="button" class= {this.state.colorof2 == "birthday" ? "btn btn-success mr-3": "btn btn-primary mr-3"} id="birthdaybutton" onClick={this.changeOccasionReserve}><h6 id="birthdaybutton" onClick={this.changeOccasionReserve} class="wabuttontext">วันเกิด</h6></button>
                        <button type="button" class= {this.state.colorof2 == "peptalk" ? "btn btn-success mr-3": "btn btn-primary mr-3"} id="peptalkbutton" onClick={this.changeOccasionReserve}><h6 id="peptalkbutton" onClick={this.changeOccasionReserve} class="wabuttontext">กําลังใจ</h6></button>
                        <button type="button" class= {this.state.colorof2 == "roast" ? "btn btn-success mr-3": "btn btn-primary mr-3"} id="roastbutton" onClick={this.changeOccasionReserve}><h6 id="roastbutton" onClick={this.changeOccasionReserve} class="wabuttontext">เผา</h6></button>
                        <button type="button" class= {this.state.colorof2 == "other" ? "btn btn-success": "btn btn-primary"} id="otherbutton" onClick={this.changeOccasionReserve}><h6 id="otherbutton" onClick={this.changeOccasionReserve} class="wabuttontext">อื่นๆ</h6></button>              
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <h4 class="wa">ทําให้ Vid ของคุณน่าจดจํา!</h4>
                    </div>
                    {this.state.reserve_occasion_html}
                </div>

            </div>

              

            <div class="d-flex justify-content-center mt-2">
                <label class="wa">ต้องการก่อนวันที่เท่าไหร่</label>
            </div>
            <div class="d-flex justify-content-center">
                <input class="datechecker" equired id="date_inputid" name="date_inputname" type="date"></input>
            </div>

            <div class="d-flex justify-content-center mt-1">
                <h6>NOTE* ถ้าสตาร์ทําเสร็จไม่ทันวันที่นี้คุณจะได้เงินคืน</h6>
            </div>
            
            <div class="d-flex justify-content-center mt-2 mb-5">
                <input required id="submitreservation" type="submit" onClick={this.saveReserve} value="Reserve"class="btn btn-primary"/>
            </div>

         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch(`/gotobook/${influencerusername}`)
    .then(response => response.json())
    .then(data => {
        ReactDOM.render(<BookPage data={data}/>, document.querySelector('#wholereservepage'));

  });
});