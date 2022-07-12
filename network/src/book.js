
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
      this.onType = this.onType.bind(this);

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
                        <input maxlength="60" class="inputheho" required id="from_intro" placeholder="จากใคร"></input>
                    </div>
                </div>

                
            </div>,
        reserve_occasion_html:
            <div name="occasionname"id="birthday_html_id">
                <div>
                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">เนื่องในวันสําคัญอะไร</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input maxlength="100"  class="inputheho" required name="occa1" placeholder="วันเกิด, วันครบรอบ, งานบวช"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">ข้อมูลเพิ่มเติมเกี่ยวกับวันสําคัญ</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="inputage1"maxlength="100" class="inputheho" required name="occa2" placeholder="เกิดวันที่ 7 กรกฏาคม ขึ้น 20 ปี, ครบรอบวันที่ 7 กรกฏาคม ขึ้น 20 ปี"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <div class="d-flex flex-column">
                            <label class="wa">อยากให้สตาร์พูด/ทําอะไรให้</label>
                                <div class="d-flex justify-content-center">
                                    <p id="daytext1" class="watsarabun">0</p>
                                    <p class="watsarabun">/250</p>
                                </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <input maxlength="250" data-yea="day1" onChange={this.onType}class="inputheho" required name="occa3"placeholder="ร้องเพลงสุขสันต์วันเกิด พร้อมคำอวยพร"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <div class="d-flex flex-column">
                            <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                            <div class="d-flex justify-content-center">
                                <p id="daytext2" class="watsarabun">0</p>
                                <p class="watsarabun">/250</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input maxlength="250" data-yea="day2" onChange={this.onType} class="inputheho" id="optional/occa4" name="occa4" placeholder="รอชมผลงานอยู่นะ!"></input>
                    </div>

                </div>
            </div>,
        colorof1:"someoneelsehtml",
        colorof2:"birthday"
      }

    }

    onType(e)
    {
        console.log("yoyoyo")
        console.log("this is the targets", e)
        console.log("this is the targets", e.target.value)
        console.log("this is the targets", e.target.value.length)
        console.log("this is the targets", e.target.dataset.yea)
        if (e.target.dataset.yea == "gumlungjai1")
        {
            document.getElementById('gumlungjaitext1').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "gumlungjai2")
        {
            document.getElementById('gumlungjaitext2').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "pao1")
        {
            document.getElementById('paotext1').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "pao2")
        {
            document.getElementById('paotext2').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "other1")
        {
            document.getElementById('othertext1').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "other2")
        {
            document.getElementById('othertext2').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "day1")
        {
            document.getElementById('daytext1').innerHTML = e.target.value.length
        }
        else if (e.target.dataset.yea == "day2")
        {
            document.getElementById('daytext2').innerHTML = e.target.value.length
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
                                <input maxlength="60"class="inputheho" required id="from_intro" placeholder="จากใคร"></input>
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

        
        try 
        {
            document.getElementsByName("occa1")[0].value = ""
        } catch(err) {}

        try 
        {
            document.getElementsByName("occa2")[0].value = ""
        } catch(err) {}

        try 
        {
            document.getElementsByName("occa3")[0].value = ""
        } catch(err) {}

        try 
        {
            document.getElementsByName("occa4")[0].value = ""
        } catch(err) {}

        try 
        {
            document.getElementById('gumlungjaitext1').innerHTML = "0"
        } catch(err) {}

        try 
        {
            document.getElementById('gumlungjaitext2').innerHTML = "0"
        } catch(err) {}
        
        try 
        {
            document.getElementById('paotext1').innerHTML = "0"
        } catch(err) {}

        try 
        {
            document.getElementById('paotext2').innerHTML = "0"
        } catch(err) {}
        try 
        {
            document.getElementById('othertext1').innerHTML = "0"
        } catch(err) {}
        try 
        {
            document.getElementById('othertext2').innerHTML = "0"
        } catch(err) {}
        try 
        {
            document.getElementById('daytext1').innerHTML = "0"
        } catch(err) {}
        try 
        {
            document.getElementById('daytext2').innerHTML = "0"
        } catch(err) {}




        console.log("this is e", e)
        if (e.target.id == "birthdaybutton")
        {
            console.log("birthday")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="birthday_html_id">
                        <div>
                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">เนื่องในวันสําคัญอะไร</label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <input maxlength="100"  class="inputheho" required name="occa1" placeholder="วันเกิด, วันครบรอบ, งานบวช"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <label class="wa">ข้อมูลเพิ่มเติมเกี่ยวกับวันสําคัญ</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="inputage1"maxlength="100" class="inputheho" required name="occa2" placeholder="เกิดวันที่ 7 กรกฏาคม ขึ้น 20 ปี, ครบรอบวันที่ 7 กรกฏาคม ขึ้น 20 ปี"></input>
                    </div>
                    
                 
                    <div class="d-flex justify-content-center mt-2">
                        <div class="d-flex flex-column">
                            <label class="wa">อยากให้สตาร์พูด/ทําอะไรให้</label>
                            <div class="d-flex justify-content-center">
                                <p id="daytext1" class="watsarabun">0</p>
                                <p class="watsarabun">/250</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input maxlength="250" data-yea="day1" onChange={this.onType} class="inputheho" required name="occa3"placeholder="ร้องเพลงสุขสันต์วันเกิด พร้อมคำอวยพร"></input>
                    </div>

                    <div class="d-flex justify-content-center mt-2">
                        <div class="d-flex flex-column">
                            <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                            <div class="d-flex justify-content-center">
                                <p id="daytext2" class="watsarabun">0</p>
                                <p class="watsarabun">/250</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input maxlength="250" data-yea="day2" onChange={this.onType} class="inputheho" id="optional/occa4" name="occa4" placeholder="รอชมผลงานอยู่นะ!"></input>
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
                                <input maxlength="100" class="inputheho" required name="occa1" placeholder="ให้กำลังใจ ตั้งใจทำงาน"></input><br></br>
                            </div>

                            <div class="d-flex justify-content-center mt-2">
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากให้สตาร์พูด/ทําอะไรให้</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="gumlungjaitext1" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input id="inputgumlungjai1" data-yea="gumlungjai1"onChange={this.onType} maxlength="250" class="inputheho" required name="occa2" placeholder="พูดให้กำลังใจ ให้มีไฟทำงาน"></input><br></br>
                            </div>
                        

                            <div class="d-flex justify-content-center mt-2">
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="gumlungjaitext2" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input data-yea="gumlungjai2" onChange={this.onType} maxlength="250" id="optional/occa3" class="inputheho" name="occa3" placeholder="รอชมผลงานอยู่นะ!"></input><br></br>
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
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากให้สตาร์ล้อเลียนว่าอย่างไรบ้าง</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="paotext1" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center"> 
                                <input maxlength="250" data-yea="pao1" onChange={this.onType} class="inputheho" required name="occa1" placeholder="ล้อเลียนให้ตั้งใจติวหนังสือ"></input>
                            </div>

                            <div class="d-flex justify-content-center mt-2">
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="paotext2" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center">
                                <input maxlength="250" data-yea="pao2" onChange={this.onType} id="optional/occa2" class="inputheho" name="occa2" placeholder="รอชมผลงานอยู่นะ!"></input>
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
                                <input maxlength="250" class="inputheho" required name="occa1" placeholder="เรียนจบปริญญาตรี"></input>
                            </div>
                           
                            <div class="d-flex justify-content-center mt-2">
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากให้สตาร์พูด/ทําอะไร</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="othertext1" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input maxlength="250" data-yea="other1" onChange={this.onType} class="inputheho" required name="occa2" placeholder="อวยพร และพูดแสดงความยินดี"></input>
                            </div>
                           
                            <div class="d-flex justify-content-center mt-2">
                                <div class="d-flex flex-column">
                                    <label class="wa">อยากบอกอะไรเพิ่มเติมกับสตาร์</label>
                                    <div class="d-flex justify-content-center">
                                        <p id="othertext2" class="watsarabun">0</p>
                                        <p class="watsarabun">/250</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input maxlength="250" data-yea="other2" onChange={this.onType} id="optional/occa3" class="inputheho" name="occa3" placeholder="รอชมผลงานอยู่นะ!"/>
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
                            <input maxlength="60" class="inputheho" required id="to_intro" placeholder="ถึงใคร"></input>
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
                        <button type="button" class= {this.state.colorof2 == "birthday" ? "btn successbutton mr-3": "btn failbutton mr-3"} id="birthdaybutton" onClick={this.changeOccasionReserve}><h6 id="birthdaybutton" onClick={this.changeOccasionReserve} class="wabuttontext">วันสําคัญ</h6></button>
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
                <input class="datechecker" required id="date_inputid" name="date_inputname" type="date"></input>
            </div>

            <div class="d-flex justify-content-center mt-1">
                <h6>*ถ้าสตาร์ทําเสร็จไม่ทันวันที่นี้คุณจะได้เงินคืน*</h6>
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