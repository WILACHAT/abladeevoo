
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
class PaymentPage extends React.Component {
    constructor(props) {
    super(props);
    this.backPage = this.backPage.bind(this);
    this.submitCc = this.submitCc.bind(this);


  }
  submitCc(e)
  {
      Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

      console.log("yo wassup submit CC")
      console.log("yo wassup submit CC")


      document.querySelector('#create_token').disabled = true
     

      let card = {
          "name": document.querySelector('[data-omise=holder_name]').value,
          "number": document.querySelector('[data-omise=number]').value,
          "expiration_month": document.querySelector('[data-omise=expiration_month]').value,
          "expiration_year": document.querySelector('[data-omise=expiration_year]').value,
          "security_code": document.querySelector('[data-omise=security_code]').value 
      }
      
      console.log("this is card", card)
      Omise.createToken("card", card, function (statusCode, response) {
        console.log("inside the create token")

        if (response.object == "error" || !response.card.security_code_check) {
            // Display an error message.
            var message_text = "SET YOUR SECURITY CODE CHECK FAILED MESSAGE";
            if(response.object == "error") {
            message_text = response.message;
            }
            $("#token_errors").html(message_text);

            // Re-enable the submit button.
            document.querySelector('#create_token').disabled = true
        } else {
            // Then fill the omise_token.
            document.querySelector('[name=omise_token]').value = response.id


            // Remove card number from form before submiting to server.
            document.querySelector('[data-omise=number]').value = ""
            document.querySelector('[data-omise=security_code]').value = ""
            console.log("this is the response", response)
            console.log("this is the response token id", response["id"])

            const getcooked = getCookie('csrftoken')
            
            fetch(`/paymentapi`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
                token: response["id"],
                })
            })
            .then(response => response.json())
            .then(data => {
                //if data returns successful show beautiful success stuff
                //if not show failed html
                console.log(data)
            });
            };
        });
      
  }
  backPage(e)
  {
    document.querySelector('#paymentpage').hidden = true
    document.querySelector('#wholereservepage').hidden = false
  }
  
  render() {
    
    return (
    <div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary" onClick={this.backPage}>Back</button>
        </div>
        <div class="d-flex justify-content-center">
            <h1>yo wassup this is the payment page</h1>
        </div>

        <div class="d-flex justify-content-center">
            <div>
                <div id="token_errors"></div>
            
                <input type="hidden" name="omise_token"></input>
            
                <div>
                Name<br></br>
                <input type="text" data-omise="holder_name"></input>
                </div>
                <div>
                Number<br></br>
                <input type="text" data-omise="number"></input>
                </div>
                <div>
                Date<br></br>
                <input type="text" data-omise="expiration_month" size="4"></input>
                <input type="text" data-omise="expiration_year" size="8"></input>
                </div>
                <div>
                Security Code<br></br>
                <input type="text" data-omise="security_code" size="8"></input>
                </div>
            
                <input type="submit" onClick={this.submitCc} id="create_token"></input>

            </div>
        </div>
        
        
 
    </div>
    )

    }
  }
class BookPage extends React.Component {
    constructor(props) {
      super(props);
      this.changeIntroReserve = this.changeIntroReserve.bind(this);
      this.changeOccasionReserve = this.changeOccasionReserve.bind(this);
      this.saveReserve = this.saveReserve.bind(this);
      this.nextPage = this.nextPage.bind(this);
      document.querySelector('#paymentpage').hidden = true





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
                        <input id="optional/occa4" class="inputheho" name="occa4" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
                    </div>

                </div>
            </div>,
        colorof1:"someoneelsehtml",
        colorof2:"birthday"
      }

    }
    nextPage(e)
    {
        console.log("this is nextpage")
        document.querySelector('#paymentpage').hidden = false
        document.querySelector('#wholereservepage').hidden = true
        ReactDOM.render(<PaymentPage />, document.querySelector('#paymentpage'));

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

  
    
    let inputcheck = document.querySelector('#inputcheckid').checked

    



    var checkerintro = document.getElementsByName("introname")[0].id
    tointro = document.querySelector('#to_intro').value;
 
    typeintro = checkerintro;

    if (intro == "")
    {
        checkblank = 10
    }
    
    if (checkerintro == "someoneelse_html_id")
    {
       fromintro =  document.querySelector('#from_intro').value;
       if (fromintro == "")
       {
           checkblank = 9
       }
    }
     
    var checkeroccasion = document.getElementsByName("occasionname")[0].id
    typeoccasion = checkeroccasion

    firstinputocca = document.getElementsByName("occa1")[0].value
    if (firstinputocca == "")
    {
        checkblank = 8
    }

    secondinputocca = document.getElementsByName("occa2")[0].value
    if (document.getElementsByName("occa2")[0].id == "")
    {
        if (secondinputocca == "")
        {
            checkblank = 7
        }
    }
   
   
    if (document.getElementsByName("occa3").length != 0)
    {
        if (document.getElementsByName("occa3")[0].id == "")
        {
            thirdinputocca = document.getElementsByName("occa3")[0].value
            if (thirdinputocca == "")
            {
                checkblank = 6
            }
        }

     
    }
   
    if (document.getElementsByName("occa4").length != 0)
    {
        if (document.getElementsByName("occa4")[0].id == "")
        {
            fourthinputocca = document.getElementsByName("occa4")[0].value
            console.log("ok what is going on", document.getElementsByName("occa4")[0].id)
            if (fourthinputocca == "")
            {
                checkblank = 5
            }
        }
       
    }

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    datetime = document.getElementById('date_inputid').value
    if (datetime == "")
    {
        checkblank = 4
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
    else if (checkblank == 10)
    {
        alert("luem tueng")
    }
    else if (checkblank == 9)
    {
        alert("luem jark")
    }
    else if (checkblank == 8)
    {
        alert("luem chong raek")
    }
    else if (checkblank == 7)
    {
        alert("luem chong sorng")
    }  else if (checkblank == 6)
    {
        alert("luem chong sarm")
    }  else if (checkblank == 5)
    {
        alert("luem chong seeh")
    }
    else if (checkblank == 4)
    {
        alert("luem sai date")
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
                datetime: datetime,
                inputcheck: inputcheck
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
                        <input id="optional/occa4" ame="occa4" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
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
                                <input id="optional/occa3" class="inputheho" name="occa3" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input><br></br>
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
                                <input id="optional/occa2" class="inputheho" name="occa2" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
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
                                <input id="optional/occa3" class="inputheho" name="occa3" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"/>
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

            <div class="d-flex justify-content-center">
                <label class="wa mr-2">ซ่อนจากโพรไฟล์ของสตาร์</label>
                <input id="inputcheckid" class="inputcheckbox" type="checkbox"></input>
            </div>

            <div class="d-flex justify-content-center mt-2 mb-5">
                <input required id="submitreservation" type="submit" onClick={this.nextPage} value="Payment"class="btn btn-primary"/>
            </div>
            
            <div class="d-flex justify-content-center mt-2 mb-5">
                <input required id="submitreservation" type="submit" onClick={this.saveReserve} value="Reserve"class="btn btn-primary"/>
            </div>

           

         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#paymentpage').hidden = true
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch(`/gotobook/${influencerusername}`)
    .then(response => response.json())
    .then(data => {
        ReactDOM.render(<BookPage data={data}/>, document.querySelector('#wholereservepage'));

  });
});