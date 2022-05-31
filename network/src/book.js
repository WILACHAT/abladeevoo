
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
    this.changePage = this.changePage.bind(this);
    this.submitIb = this.submitIb.bind(this);
    this.submitPp = this.submitPp.bind(this);
    this.submitTm = this.submitTm.bind(this);
    
    this.saveInfo = this.saveInfo.bind(this);
    this.backButton = this.backButton.bind(this);

    this.state = {
        statusib: "ksbtnid",
        divofpaymentpage: 
        <div class="d-flex justify-content-center">
      

        <div>
            <div id="token_errors"></div>
        
            <input type="hidden" name="omise_token"></input>
        
            <div>
                <div class="d-flex justify-content-start">
                    <label class="labelpayment">Name</label>
                </div>
                <div>
                    <input class="paymentinput" type="text" data-omise="holder_name"></input>
                </div>
            </div>
            
            <div>
            Number<br></br>
            <input class="paymentinput" type="text" data-omise="number"></input>
            </div>
            <div>
            Date<br></br>
            <input type="text" data-omise="expiration_month" size="4"></input>
            <input type="text" data-omise="expiration_year" size="8"></input>
            </div>
            <div>
            Security Code<br></br>
            <input class="paymentinput" type="text" data-omise="security_code" size="8"></input>
            </div>
            <input id="tokenhiddenid"type="hidden" data-tokenid=""></input>
          
            <input type="submit" onClick={this.submitCc} id="create_token"></input>

        </div>
    </div>                 
    }
  }

  backButton(e)
  {
      document.querySelector('#paymentpage').hidden = true
      document.querySelector('#wholereservepage').hidden = false
  }
  submitTm(e)
  {
    Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");
    this.saveInfo()
    console.log("lenght", document.querySelector('#phonenumberid').value.length)
    console.log("[0]", document.querySelector('#phonenumberid').value[0])


    if (document.querySelector('#phonenumberid').value[0] == "0" && document.querySelector('#phonenumberid').value.length == 10)
    {
        console.log("correct")
/*
    Omise.createSource('truemoney', {
        "amount":parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
        "currency": "THB",
        "phone_number": document.querySelector('#phonenumberid').value
    }, function(statusCode, response) {
    console.log("ftw", response['id'])
    console.log("this is the amount i have to fucking pay", document.querySelector('#getinfluencerprice').dataset.price)

    const getcooked = getCookie('csrftoken')
    let influencerusername = document.getElementById('getinfluencerusername').dataset.username;

    
    fetch(`/paymentapi/${influencerusername}`, {
    method: 'POST',
    headers:{'X-CSRFToken': getcooked},
    body: JSON.stringify({
        token: response["id"],
        type: "truemoneypayment"
        })
    })
    .then(response => response.json())
    .then(data => {
        //if data returns successful show beautiful success stuff
        window.location.href = data['url']
        
        })
    });
  */
    }

    else
    {
        alert("Invalid Phone Number")
    }
    
}

  
  submitPp(e)
  {
    console.log("yay promptpay")
    this.saveInfo()

    Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

    Omise.createSource('promptpay', {
    "amount": parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
    "currency": "THB"
    }, function(statusCode, response) {
    console.log("ftw", response['id'])
    const getcooked = getCookie('csrftoken')
    let influencerusername = document.getElementById('getinfluencerusername').dataset.username;

    
    fetch(`/paymentapi/${influencerusername}`, {
    method: 'POST',
    headers:{'X-CSRFToken': getcooked},
    body: JSON.stringify({
        token: response["id"],
        type: "promptpaypayment"
        })
    })
    .then(response => response.json())
    .then(data => {
        //if data returns successful show beautiful success stuff
        window.location.href = data['url']
        
        })
    });
  }

  submitIb(id)
  {

    this.saveInfo()
    Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

      console.log("what what")
      Omise.createSource(document.querySelector('#selectbankid').value,
        {
            "amount": parseInt(document.querySelector('#getinfluencerprice').dataset.price) * 100,
            "currency": "THB"
        },
        function(statusCode, response) {
            console.log("this is the fucking respones", response["id"])
            const getcooked = getCookie('csrftoken')
            let influencerusername = document.getElementById('getinfluencerusername').dataset.username;

            fetch(`/paymentapi/${influencerusername}`, {
            method: 'POST',
            headers:{'X-CSRFToken': getcooked},
            body: JSON.stringify({
                token: response["id"],
                type: "internetbankingpayment"
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("bacl here or nah?")
                //if data returns successful show beautiful success stuff
                //if not show failed html
                window.location.href = data['url']

                console.log(data)
            });
        });
  }

  changePage(id)
  {
 
    if (id == "creditcardbtnid")
    {
        this.setState({
            divofpaymentpage: 
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
            <input id="tokenhiddenid"type="hidden" data-tokenid=""></input>

            <div class="field-container">
            <label for="name">Name</label>
            <input id="name" maxlength="20" type="text"></input>
            </div>            

        
            <input type="submit" onClick={this.submitCc} id="create_token"></input>

        </div>
    </div>            
        })

    }
    else if (id == "truemoneybtnid")
    {
        this.setState({
            divofpaymentpage: 
            <div>
            <h1>True Money</h1>
            <input id="phonenumberid"></input>
             <div class="d-flex justify-content-center">
               <button onClick={this.submitTm} class="btn btn-primary">True Money</button>
             </div>
       </div>

            
        })
    }
    else if (id == "internetbankingbtnid")
    {
        console.log("state", this.state.statusib)
        this.setState({
            divofpaymentpage: 
            <div>
                <h1>internetbanking</h1>
                <div class="d-flex justify-content-center">
                      <select name="selectbank" id="selectbankid">
                          <option value="nothing"></option>
                          <option value="internet_banking_bbl">Bangkok Bank</option>
                          <option value="internet_banking_bay">Krungsri Bank</option>
                          <option value="internet_banking_ktb">Krungthai Bank</option>
                          <option value="internet_banking_scb">Siam Commercial Bank</option>
                      </select>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button onClick={this.submitIb} class="btn btn-primary">Submit</button>
                  </div>

            </div>

            
        })
    }
    else if (id == "promptpaybtnid")
    {
        this.setState({
            divofpaymentpage: 
            <div>
                 <h1>PromptPay</h1>
                  <div class="d-flex justify-content-center">
                    <button onClick={this.submitPp} class="btn btn-primary">Promptpay</button>
                  </div>
            </div>

            
        })
    }
  }
  submitCc(e)
  {
    this.saveInfo()

    Omise.setPublicKey("pkey_test_5rsv5lm4gxeb5fc9i2k");

      console.log("what the fuck")

      let card = {
        "name": document.querySelector('[data-omise=holder_name]').value,
        "number": document.querySelector('[data-omise=number]').value,
        "expiration_month": document.querySelector('[data-omise=expiration_month]').value,
        "expiration_year": document.querySelector('[data-omise=expiration_year]').value,
        "security_code": document.querySelector('[data-omise=security_code]').value 
        
    }
    let status = ""
    
    console.log("this is card", card)
    let tokenn = Omise.createToken("card", card, function (statusCode, response) {
      console.log("inside the create token")
      console.log("inside the create lol")


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
    
          let influencerusername = document.getElementById('getinfluencerusername').dataset.username;

          const getcooked = getCookie('csrftoken')
          
          fetch(`/paymentapi/${influencerusername}`, {
          method: 'POST',
          headers:{'X-CSRFToken': getcooked},
          body: JSON.stringify({
              token: response["id"],
              type: "creditcardpayment"
              })
          })
  
          .then(response => response.json())
          .then(data => {
              //if data returns successful show beautiful success stuff
              //if not show failed html
              console.log(data["status"])
              window.location.href = "http://127.0.0.1:8000/paymentresponse"
  
          });
          
      }
    })  
           
            
        
         

  }
  backPage(e)
  {
    document.querySelector('#paymentpage').hidden = true
    document.querySelector('#wholereservepage').hidden = false
  }
  saveInfo(data)
  {

        let influencerusername = document.getElementById('getinfluencerusername').dataset.username;

        const getcooked = getCookie('csrftoken')
        fetch(`/book/${influencerusername}`, {
        method: 'POST',
        headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({
            typeintro: this.props.data["typeintro"],
            tointro: this.props.data["tointro"],
            fromintro: this.props.data["fromintro"],
            typeoccasion: this.props.data["typeoccasion"],
            firstinputocca: this.props.data["firstinputocca"],
            secondinputocca: this.props.data["secondinputocca"],
            thirdinputocca: this.props.data["thirdinputocca"],
            fourthinputocca: this.props.data["fourthinputocca"],
            datetime: this.props.data["datetime"],
            inputcheck: this.props.data["inputcheck"]
            })
        })
          
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
            <button onClick={() => this.changePage("creditcardbtnid")} id="creditcardbtnid" class="btn btn-primary">Credit Card</button>
            <button onClick={() => this.changePage("truemoneybtnid")} id="truemoneybtnid" class="btn btn-primary">True Money</button>
            <button onClick={() => this.changePage("internetbankingbtnid")} id="internetbankingbtnid"class="btn btn-primary">Internet Banking</button>
            <button onClick={() => this.changePage("promptpaybtnid")} id="promptpaybtnid"class="btn btn-primary">PromptPay</button>
        </div>

        {this.state.divofpaymentpage}
     
        <h1></h1>
   
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
        else
        {
            thirdinputocca = document.getElementsByName("occa3")[0].value
        }
    }
   
    if (document.getElementsByName("occa4").length != 0)
    {
        console.log("fuck this in 4")
        if (document.getElementsByName("occa4")[0].id == "")
        {
            fourthinputocca = document.getElementsByName("occa4")[0].value
            console.log("fourstinputocca", fourthinputocca)
            console.log("ok what is going on", document.getElementsByName("occa4")[0].id)
            if (fourthinputocca == "")
            {
                checkblank = 5
            }
        }
        else
        {
            fourthinputocca = document.getElementsByName("occa4")[0].value
        }
       
    }

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    datetime = document.getElementById('date_inputid').value
    if (datetime == "")
    {
        checkblank = 4
    }

    let today = new Date().toISOString().slice(0, 10)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    console.log("this is today", today)
    tomorrow.toISOString().slice(0, 10)
    console.log("first tomorrow", tomorrow)




    let g1 = new Date(tomorrow);
    console.log("get time", g1.getTime())


    let g2 = new Date(datetime);


    if (g1.getTime() >= g2.getTime())
    {
        checkblank = 2
    }
   
    if (checkblank == 1)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกอย่างน้อย 1 ฟอร์ม',
          })
    }
    else if (checkblank == 10)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกฟอร์ม ถึงใคร',
          })
    }
    else if (checkblank == 9)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกฟอร์ม จากใคร',
          })

    }
    else if (checkblank == 8)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกเนื่องในโอกาสช่องแรก',
          })
    }
    else if (checkblank == 7)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกเนื่องในโอกาสช่องสอง',
          })
    }  else if (checkblank == 6)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกเนื่องในโอกาสช่องสาม',
          })
    }  else if (checkblank == 5)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกเนื่องในโอกาสช่องสี่',
          })
    }
    else if (checkblank == 4)
    {
        Swal.fire({
            icon: 'error',
            text: 'ลืมกรอกวันที่',
          })
    }
    else if (checkblank == 2)
    {
        Swal.fire({
            icon: 'error',
            text: 'วันที่ต้องมากกว่าวันที่กรอกฟอร์มอย่างน้อย 2 วัน',
          })
    }
    
    else
    {
            document.querySelector('#paymentpage').hidden = false
            document.querySelector('#wholereservepage').hidden = true
            document.querySelector('#realpayment').hidden = false
            
            document.querySelector('#storevalueid').value = JSON.stringify({
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
           // ReactDOM.render(<PaymentPage data={data}/>, document.querySelector('#paymentpage'));
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
                        <input class="inputheho" id="optional/occa4" name="occa4" placeholder="อยากบอกอะไรเพิ่มเติมกับสตาร์"></input>
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
        let waan = {name:"val", name2:"val"}
        waan = JSON.stringify(waan);
        console.log(waan)

        //document.getElementById('dicttest').value = "waan"
        //console.log("checkery checkcheck", document.getElementById('dicttest').value)
        //console.log(Object.values(document.getElementById('dicttest').value))
        //console.log(Object.keys(document.getElementById('dicttest').value))




        return (
         <div>
        
            <div id="intro" class="d-flex justify-content-center">
                <div class="bookdetails">
                    <div class="d-flex justify-content-center">
                        <h4 class="wa">วีดีโอนี้อยากทําให้ใคร: </h4>
                    </div>
                
                    <hr class="hr"/>
                    <div class="d-flex justify-content-center mt-4 mb-5">
                        <button type="button" class= {this.state.colorof1 == "someoneelsehtml" ? "btn successbutton mr-3": "btn failbutton mr-3"} id="someoneelsehtml" onClick={this.changeIntroReserve}><h6 id="someoneelsehtml" onClick={this.changeIntroReserve} class="wabuttontext">คนอื่น</h6></button>
                        <button type="button" class={this.state.colorof1 == "myselfhtml" ? "btn successbutton": "btn failbutton"} id="myselfhtml" onClick={this.changeIntroReserve}><h6 id="myselfhtml" onClick={this.changeIntroReserve} class="wabuttontext">ตัวเอง</h6></button>                    
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
                    <div class="d-flex justify-content-center mt-4 mb-5">
                        <button type="button" class= {this.state.colorof2 == "birthday" ? "btn successbutton mr-3": "btn failbutton mr-3"} id="birthdaybutton" onClick={this.changeOccasionReserve}><h6 id="birthdaybutton" onClick={this.changeOccasionReserve} class="wabuttontext">วันเกิด</h6></button>
                        <button type="button" class= {this.state.colorof2 == "peptalk" ? "btn successbutton mr-3": "btn failbutton mr-3"} id="peptalkbutton" onClick={this.changeOccasionReserve}><h6 id="peptalkbutton" onClick={this.changeOccasionReserve} class="wabuttontext">กําลังใจ</h6></button>
                        <button type="button" class= {this.state.colorof2 == "roast" ? "btn successbutton mr-3": "btn failbutton mr-3"} id="roastbutton" onClick={this.changeOccasionReserve}><h6 id="roastbutton" onClick={this.changeOccasionReserve} class="wabuttontext">เผา</h6></button>
                        <button type="button" class= {this.state.colorof2 == "other" ? "btn successbutton": "btn failbutton"} id="otherbutton" onClick={this.changeOccasionReserve}><h6 id="otherbutton" onClick={this.changeOccasionReserve} class="wabuttontext">อื่นๆ</h6></button>              
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <h4 class="wa">ทําให้วีดีโอของคุณน่าจดจํา!</h4>
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
                <input required id="submitreservation" type="submit" onClick={this.saveReserve} value="หน้าชําระเงิน"class="btn"/>
            </div>

         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#paymentpage').hidden = true
    document.querySelector('#realpayment').hidden = true

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    fetch(`/gotobook/${influencerusername}`)
    .then(response => response.json())
    .then(data => {
       // ReactDOM.render(<PaymentPage/>, document.querySelector('#paymentpage'));

        ReactDOM.render(<BookPage data={data}/>, document.querySelector('#wholereservepage'));

  });
});