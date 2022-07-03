
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
class BookingTimeRow extends React.Component
{
  constructor(props)
  {
    super(props);
    this.clickButton = this.clickButton.bind(this);

    this.state = 
    {
      buttonred1:"",
      buttonred2:"",
      buttonred3:""
    }

  }
  clickButton(e)
  {
    console.log("remake", e.target.id)
   
    if (e.target.id == this.state.buttonred1)
    {
      document.getElementById(e.target.id).style.backgroundColor = ""

      this.setState({buttonred1:""})
    }
    else if (e.target.id == this.state.buttonred2)
    {
      document.getElementById(e.target.id).style.backgroundColor = ""

      this.setState({buttonred2:""})
    }
    else
    {
      document.getElementById(e.target.id).style.backgroundColor = ""

      this.setState({buttonred3:""})
    }
  
    
    if (document.getElementById('booktimearrayid').children.length == 0)
    {
      console.log("when click1")
      document.getElementById(e.target.id).style.backgroundColor = "red"
      this.setState({buttonred1:e.target.id})
    }
    else if (document.getElementById('booktimearrayid').children.length == 1)
    {
      console.log("when click2")
      document.getElementById(e.target.id).style.backgroundColor = "red"

      console.log("when click2",document.getElementById(e.target.id))

      this.setState({buttonred2:e.target.id})
    }
    else if (document.getElementById('booktimearrayid').children.length == 2)
    {
      console.log("when click3")
      console.log("when click3",document.getElementById(e.target.id))
      document.getElementById(e.target.id).style.backgroundColor = "red"


      this.setState({buttonred3:e.target.id})
    }
    this.props.onClickButton(e.target.innerHTML, e.target.id)
  }
  render()
  {
    console.log("redbutton", this.state.buttonred1)
    
    console.log("remake needs to show twice")
    let buttons = ""
    const mystyle = {
      backgroundColor: 'red',
    };
    const mystylenothing = {
      backgroundColor: ''
    };


    let buttonid = this.props.monthnumber.toString() + this.props.active.toString() + "button" + this.props.timesomething.toString()

    console.log("buttonred1", this.state.buttonred1)
    console.log("buttonred2", this.state.buttonred2)
    console.log("buttonred3", this.state.buttonred3)

    if (this.state.buttonred1 == buttonid || this.state.buttonred2 == buttonid || this.state.buttonred3 == buttonid)
    { 
      try {
  
        buttons = <button style={mystyle} id={buttonid} onClick={this.clickButton}>{this.props.timesomething}</button>
        document.getElementById(buttonid).style.backgroundColor == "red"

      }
      catch(err) {
        console.log("in here error")

     } 
    }
    else
    {
      console.log("waok")
      buttons = <button style={mystylenothing} id={buttonid} onClick={this.clickButton}>{this.props.timesomething}</button>
    }
   
    console.log("WILACHAT IS THE BEST", this.state.buttonred1)



    console.log("hotel id", buttons.props.id)
    console.log("hotel style", buttons.props.style)


    return (
        <div id="coversallbooktimeid" class="coversallbooktimeid">
           {buttons}
        </div>
    )
  }
}
class BookLiveRow extends React.Component
{
  constructor(props)
  {
    super(props);
    this.clickHe = this.clickHe.bind(this);
    this.pickTime = this.pickTime.bind(this);
    this.dayThaiSecond = this.dayThaiSecond.bind(this);
    this.secondMonthConversion = this.secondMonthConversion.bind(this);

    this.state = 
    {
      active:"",
      previousid:"",
      dayclickedlower:"",
      deletionstate:""
    }
 

  }
  secondMonthConversion(month)
  {
    console.log("blah", month)
    let blah = this.props.onClickedMonthConversion(month)
    console.log("blah1", blah)
    return blah;

  }
  dayThaiSecond(dayclicked)
  {
    console.log("is this in fuck me??", dayclicked)
    let youwillsee = this.props.onClickedDayThai(dayclicked)
    return youwillsee
   
  }
  pickTime(innerhtml, clickbuttonid, e)
    {      
      if (this.state.active == "")
      {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล',
        })
      }
      else
      {
        console.log("SUZUKI", this.state.dayclickedlower)
        let daythai = this.dayThaiSecond(this.state.dayclickedlower)
        console.log("FUCK ME3", daythai)
        let whatttttt = this.secondMonthConversion(this.props.monthnumber)

        let idnumber = ""
        let randomtext = ""
        let randomtextagain = ""
        let checker = 0

        //append into an array or smthing
        //if theres one in the array use booking two if theres two use booking 3
        if (document.getElementById('booktimearrayid').children.length > 2)
        {
          for (let i = 0; i < document.getElementById('booktimearrayid').children.length; i++)
            {
              let fakramdomtext = document.getElementById('booktimearrayid').children[i].innerHTML
              randomtext = fakramdomtext.replace('<button>X</button>','')
             
              if (randomtext == "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)
              {
                document.getElementById(clickbuttonid).style.backgroundColor = ""
                document.getElementById('booktimearrayid').children[i].remove()
              }
            }

          console.log("cant add anymore mofo")
        }
        else
        {
          let targetdiv = document.getElementById('booktimearrayid');
          let div = document.createElement("div")
          let button = document.createElement("button");
          idnumber = ""

          if (document.getElementById('booktimearrayid').children.length == 0)
          {
            
            idnumber = 1
          }
          else if (document.getElementById('booktimearrayid').children.length == 1)
          {

            idnumber = 2
          }
          else
          {
            idnumber = 3
          }
          button.innerHTML = "X";
          button.onclick = function () {
            let removebutton = document.getElementById("วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml)
            console.log("removebutton id", removebutton)
            try{
              document.getElementById(clickbuttonid).style.backgroundColor = ""
            }
            catch(err){
            }
            removebutton.remove()
          };

          div.id = "วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml

          for (let i = 0; i < targetdiv.children.length; i++)
          {
            console.log("tilly birds", targetdiv.children)
            randomtextagain = "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml
            randomtext = targetdiv.children[i].innerHTML
            randomtext = randomtext.replace('<button>X</button>','')
            if (randomtext == randomtextagain)
            {
              console.log("getsunova")
              checker = 1
              
            }
          }
          if (checker == 0)
          {
            console.log("check for targetdiv", targetdiv)
            console.log("wakawaka1", document.getElementById('booktimearrayid'))
            console.log("i dont know the", targetdiv)
            targetdiv.append(div)

            div.append("วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)
            div.append(button)
          }
          else
          {
           
            console.log("kwai", "วัน" + daythai + "ที่" + idnumber + whatttttt + "2022" + "เวลา" + " " + innerhtml)
            console.log("kwai", idnumber)

            console.log("cocaine",clickbuttonid)

            console.log("cocaine",document.getElementById(clickbuttonid).style.backgroundColor)
            
            document.getElementById(clickbuttonid).style.backgroundColor = ""
            console.log("cocaine",document.getElementById(clickbuttonid).style.backgroundColor)



            let fakeidnumber = idnumber - 1
            let fakramdomtext = ""

            let yea = clickbuttonid

            const after = yea.substring(yea.indexOf('n') + 1);
            console.log("successfull sure", after)


            console.log("fakkkey", "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)

            console.log("god", document.getElementById('booktimearrayid').children.length)
            for (let i = 0; i < document.getElementById('booktimearrayid').children.length; i++)
            {
              let fakramdomtext = document.getElementById('booktimearrayid').children[i].innerHTML
              randomtext = fakramdomtext.replace('<button>X</button>','')
              console.log("almost the best", document.getElementById('booktimearrayid').children[i].innerHTML)
              console.log("almost the best", "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)

              if (randomtext == "วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)
              {

                console.log("almost the best")
                document.getElementById('booktimearrayid').children[i].remove()
              }
            }

            //let removebutton = document.getElementById("วัน" + daythai + "ที่" + this.state.active + whatttttt + "2022" + "เวลา" + " " + innerhtml)
           // removebutton.remove()
          }
          //checker is a lil bit weird
          console.log("this is checker", checker)


         // targetdiv.insertAdjacentHTML('afterend', this.state.booktime1);  
         
  
        }
      }
    }
    



  clickHe(value, idid)
  {
    
    let montheng = ""
    if (this.props.monthnumber == 5)
    {
      console.log("in here now?")
      montheng = "June"
    }
    else if (this.props.monthnumber == 6)
    {
      montheng = "July"
    }
    else if (this.props.monthnumber == 7)
    {
      montheng = "August"
    }
    else 
    {
      montheng = "September"
    }

    let currentdate = montheng + " " + value + ", " + "2022"
    const z = new Date(currentdate);
    let dayy = z.getDay();

    console.log("day experimentation2", dayy)

  
    console.log("successfull or nah")
    this.setState({
      active:value,
      previousid:idid,
      dayclickedlower:dayy
    })

    const button_time_rows = [];
    let timesomething = ""
    for (let j = 0; j < 6; j++)
    {
      timesomething = j + 1
      button_time_rows.push(<BookingTimeRow monthnumber={this.props.monthnumber} timesomething={timesomething} active={value} onClickButton={this.pickTime}/>)
    }

    this.props.onClickDay(idid, value, button_time_rows)
  }
  
 
  render()
  {

    
    const mystyle = {
      pointerEvents: 'none',
      opacity: 0.3
    };
    const mystylecorrect = {
      pointerEvents: 'auto',
      opacity: 1
    };

    let idid = this.props.monthnumber.toString() + this.props.rowname.toString() 
    let what = ""
    
    for (let i = 0; i < this.props.onearray.length; i++)
    {
      if (idid == this.props.onearray[i])
        {
          what=<button style={mystylecorrect} id={idid} class={this.state.active == this.props.rowname ? "active":"notactive"} onClick={() => this.clickHe(this.props.rowname, idid)}>{this.props.rowname}</button>

          break;
        }
        what=<button style={mystyle} id={idid} class={this.state.active == this.props.rowname ? "active":"notactive"} onClick={() => this.clickHe(this.props.rowname, idid)}>{this.props.rowname}</button>

    }
  
    return (
      <li>
        {what}
      </li>
    )
  }
}

class BookLivePage extends React.Component{
    constructor(props) {
        super(props);
        this.changeMonth = this.changeMonth.bind(this);
        this.monthConversion = this.monthConversion.bind(this);
        this.clickDay = this.clickDay.bind(this);
        this.dayThai = this.dayThai.bind(this);
        this.saveReserve = this.saveReserve.bind(this);



        const d = new Date();
        let month = d.getMonth();
        let thaimonth = this.monthConversion(month, "constructor")

        const w = new Date();
        let day = w.getDate();
        console.log("this is day", day)

        console.log("this is thaimonth", thaimonth)
        /* request for live -> choose 3 time -> in inbox -> normal -> history ror doo wa what time dai bab dara is choosing time then por dai gor ja plien pen showwela nun mee 3 steps un pokati mee kae 2 then dara choose time to accept OR cancel order
        -> then when wun nud sed gor ma jer gun torn t decidated place wela nun (you cant just randomly call cuz that is dumb) */
          this.state = 
          {
            active:day,
            notactive:"",
            currentmonth: month,
            themonth: thaimonth,
            monthnumber: month,
            themonthdetail: "",
            dayclicked:"",
            currentdateclicked:"",
            daysallow:[],
            constantbuttonrows:""
          
          }
        }
      
    
    saveReserve(e)
    {
      console.log("saving")
      let randomtext = ""
      let savetextarray = []
      if ( document.getElementById('booktimearrayid').children.length == 0)
      {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล',
        })
      }
      else if (document.getElementById('liveinfoid').value == "")
      {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล',
        })
      }
      else
      {
        for (let i = 0; i <  document.getElementById('booktimearrayid').children.length; i++)
        {
          randomtext = document.getElementById('booktimearrayid').children[i].innerHTML
  
          randomtext = randomtext.replace('<button>X</button>','')
          savetextarray.push(randomtext)
          
        }
  

        if (savetextarray[1] == undefined)
        {
          savetextarray[1] = ""
        }
        if (savetextarray[2] == undefined)
        {
          savetextarray[2] = ""
        }

        if (savetextarray)
        document.querySelector('#storevalueid').value = JSON.stringify({
          savetextarray1: savetextarray[0],
          savetextarray2: savetextarray[1],
          savetextarray3: savetextarray[2],
          liveinfovalue: document.getElementById('liveinfoid').value
        })
  
        document.querySelector('#paymentpage').hidden = false
        document.querySelector('#livebookid').hidden = true
        document.querySelector('#realpayment').hidden = false
              
      }
     
    }
    dayThai(clicked)
    {
      console.log("is this in fuck me? 23", clicked)
      let daythai = ""
      if (clicked == 0)
        {
          daythai = "อาทิตย์"
        }
        else if (clicked == 1)
        {
          daythai = "จันทร์"

        }
        else if (clicked == 2)
        {
          daythai = "อังคาร"

        }
        else if (clicked == 3)
        {
          daythai = "พุธ"

        }
        else if (clicked == 4)
        {
          daythai = "พฤหัส"

        }
        else if (clicked == 5)
        {
          daythai = "ศุกร์"

        }
        else
        {
          daythai = "เสาร์"

        }
        return daythai
    }
    
    clickDay(idid, value, buttonrows)
    {
      
      console.log("this is the VALUE", value)

      console.log("this is the idid", this.state.notactive)
      console.log("this is clickday", idid)
      let firstchar1 = idid.charAt(0);
      let firstchar2 = this.state.notactive.charAt(0);

      console.log("whatever")
      console.log(this.state.monthnumber)
      console.log(this.state.active)
      document.getElementById(this.state.monthnumber.toString() + this.state.active.toString()).className = "notactive"

      let montheng = ""
      if (this.state.monthnumber == 5)
      {
        montheng = "June"
      }
      else if (this.state.monthnumber == 6)
      {
        montheng = "July"
      }
      else if (this.state.monthnumber == 7)
      {
        montheng = "August"
      }
      else 
      {
        montheng = "September"
      }

      let currentdate = montheng + " " + value + ", " + "2022"
      console.log("checkPLEASEEEE", currentdate)

      console.log("check the firstchar1", firstchar1)
      console.log("check the firstchar2", firstchar2)

      if (this.state.notactive != "")
      {
        console.log("does this always print", idid)
        
        if (firstchar1 == firstchar2)
        {
          document.getElementById(this.state.notactive).className = "notactive"

        }
        console.log("i think i found where the fucking shit is")
        document.getElementById(idid).className = "active"
      }

      const z = new Date(currentdate);
      let dayy = z.getDay();
      console.log("day experimentation", dayy)
      this.setState({notactive:idid,dayclicked:dayy,currentdateclicked:value, constantbuttonrows:buttonrows})
    }
   
    monthConversion(month, check)
    {
      console.log("this is month", month)
      let thaimonth = ""
      if (month == 0)
      {
        thaimonth = "มกราคม"
      
      }
      else if (month == 1)
      {
        thaimonth = "กุมภาพันธ์"

      }
      else if (month == 2)
      {
        thaimonth = "มีนาคม"
      }
      else if (month == 3)
      {
        thaimonth = "เมษายน"

      }
      else if (month == 4)
      {
        thaimonth = "พฤษภาคม"

      }
      else if (month == 5)
      {
        thaimonth = "มิถุนายน"
      }
      else if (month == 6)
      {
        thaimonth = "กรกฎาคม"

      }
      else if (month == 7)
      {
        thaimonth = "สิงหาคม"

      }
      else if (month == 8)
      {
        thaimonth = "กันยายน"

      }
      else if (month == 9)
      {
        thaimonth = "ตุลาคม"

      }
      else if (month == 10)
      {
        thaimonth = "พฤศจิกายน"

      }
      else
      {
        thaimonth = "ธันวาคม"

      }
    
      return thaimonth
      
      
    }

    changeMonth(where, onearray)
    {
      console.log("this is one array in changemonth", onearray)
      this.setState({onearray:onearray})
      if (this.state.notactive != "")
      {
        console.log("FAIL")
        console.log("this.state.notactive", this.state.notactive)
        try {
          
          document.getElementById(this.state.notactive).className = "notactive"
        }
        catch(err) {
          console.log("whateber")
        }
       

      }
     // document.getElementById(this.state.monthnumber.toString() + this.state.active.toString()).className = "notactive"

      let tuatan = this.state.monthnumber
      if (where == "next")
      {
        this.setState({
          monthnumber: this.state.monthnumber + 1,

        })
        tuatan = tuatan + 1
        this.monthConversion(tuatan)
        
      }
      else
      {
        this.setState({
          monthnumber: this.state.monthnumber - 1

        })
        tuatan = tuatan - 1
        this.monthConversion(tuatan)
      }
      console.log("walouch", this.state.monthnumber)

    }
     
      render() 
      {

        console.log("STRESSING")
        let stateonearray = this.state.onearray
        let daythai = ""
        console.log("LUFFY GEAR 5", this.state.currentdateclicked)
        let whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf")
        daythai = this.dayThai(this.state.dayclicked)

        console.log("red hair", whatttttt)

        let combination = "วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022"

        const date_rows = [];
       
        console.log("ACTIVE", this.state.active)
        console.log("current month", this.state.currentmonth)
        console.log("month numberbrbrbrbrbrbrbr", this.state.monthnumber)


        const d = new Date();
        let month = d.getMonth();
        let howmanydays = new Date(2022, this.state.monthnumber + 1, 0).getDate();

        let one = ""
        let onearray = []

        
        if (stateonearray == undefined)
        {
          let usecase = this.state.currentmonth
          for (let i = 0; i < 14; i++)
          {
            one = (this.state.active + i) % howmanydays
            if (one == 0)
            {
              one = howmanydays
              onearray.push(usecase.toString() + one.toString())
              usecase = usecase + 1
            }
            else
            {
              onearray.push(usecase.toString() + one.toString())
            }
          }
        }
        else
        {
          onearray=stateonearray
        }
        

        for (let i = 1; i < howmanydays + 1; i++)
        {
          date_rows.push(<BookLiveRow rowname={i} monthnumber={this.state.monthnumber} firstactive={this.state.active} currentmonth={this.state.currentmonth} onearray={onearray} onClickDay={this.clickDay} onClickedDayThai={this.dayThai} onClickedMonthConversion={this.monthConversion} />)
        }
        console.log("NFT IS WEIRD", date_rows)
     

      
        return (
          <div class="divsearch d-flex justify-content-center">
             
              <div class="calendar">
                <div class="month d-flex justify-content-between">   
                  {this.state.currentmonth < this.state.monthnumber ?
                  <button onClick={() => this.changeMonth("back", onearray)}  class="btn prev">เดือนก่อนหน้า</button>:null}

                  <div class="d-flex flex-column">
                    <h5 class="whatmonth">{whatttttt}</h5>
                  </div>   

                  {this.state.monthnumber < 11 ? 
                    <button onClick={() => this.changeMonth("next", onearray)} class="btn next">เดือนถัดไป</button>:null}
                    
                  </div>

    
              <ul class="days"> 
              {date_rows}
              </ul>
              <h1>{combination}</h1>

             {this.state.constantbuttonrows}

              <div id="booktimearrayid">
              </div>

              <div class="mt-3">
                <p>อยากคุยเรื่องอะไร</p>
                <input id="liveinfoid" class="inputheho"></input>
              </div>

              <div class="d-flex justify-content-center mt-2 mb-5">
                <input required id="submitreservation" type="submit" onClick={this.saveReserve} value="หน้าชําระเงิน"class="btn"/>
            </div>

      </div>
  </div>
        );
      }
  }

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#paymentpage').hidden = true;
    document.querySelector('#realpayment').hidden = true;

    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    ReactDOM.render(React.createElement(BookLivePage), document.querySelector('#livebookid'));

});