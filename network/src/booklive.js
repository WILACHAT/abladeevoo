
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
class BookLiveRow extends React.Component
{
  constructor(props)
  {
    super(props);
    this.clickHe = this.clickHe.bind(this);

    this.state = 
    {
      active:"",
      previousid:""
    }
 

  }



  clickHe(value, idid)
  {
    console.log("tong took laew pa")
    console.log(this.state.active)
    console.log(this.state.previousid)

  
    console.log("successfull or nah")
    this.setState({
      active:value,
      previousid:idid
    })

    this.props.onClickDay(idid, value)
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
          console.log("MONLEY D  LUFFY", idid)
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
        this.pickTime = this.pickTime.bind(this);
        this.dayThai = this.dayThai.bind(this);

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
            booktime1:"",
            booktime2:"",
            booktime3:""
          }
        }
      
    dayThai(clicked)
    {
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
    pickTime(e)
    {
      console.log("this is picktime of course")
      console.log("this is picktime of course", e)
      console.log("this is picktime of course", e.target.id)
      if (this.state.currentdateclicked == "")
      {
        Swal.fire({
          icon: 'error',
          text: 'กรุณาเลือกวันที่ที่จะจองคอล',
        })
      }
      else
      {
        let daythai = this.dayThai(this.state.dayclicked)
        let whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf")
        daythai = this.dayThai(this.state.dayclicked)
        this.setState({booktime1: "วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022" + "เวลา" + " " + e.target.id})
        //append into an array or smthing
        //if theres one in the array use booking two if theres two use booking 3
      }
      
      

    }
    
    clickDay(idid, value)
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
      this.setState({notactive:idid,dayclicked:dayy,currentdateclicked:value})
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
    }
      render() 
      {
        let stateonearray = this.state.onearray
        let daythai = ""
        console.log("LUFFY GEAR 5", this.state.currentdateclicked)
        let whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf")
        daythai = this.dayThai(this.state.dayclicked)

        
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
            console.log("check for usecase", usecase)
            one = (this.state.active + 1 + i) % howmanydays
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
          date_rows.push(<BookLiveRow rowname={i} monthnumber={this.state.monthnumber} firstactive={this.state.active} currentmonth={this.state.currentmonth} onearray={onearray} onClickDay={this.clickDay}/>)
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

              <div>
             
                <button id="time1" onClick={this.pickTime}>12-12:30</button>
                <button id="time2" onClick={this.pickTime}>12:30-13</button>
                <button id="time3" onClick={this.pickTime}>13-13:30</button>     
                <button id="time4" onClick={this.pickTime}>13:30-14</button>
                <button id="time5" onClick={this.pickTime}>14-14:30</button>
                <button id="time6" onClick={this.pickTime}>14:30-15</button>
              </div>
              <h1>{this.state.booktime1}</h1>



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