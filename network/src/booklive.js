
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
      active:this.props.firstactive,
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
    let what = []
    //console.log("ok fuck me hard", this.state.active)
    //console.log("ok fuck me hard previousid", this.state.previousid)
    what.push(this.state.previousid)

    let idid = this.props.monthnumber.toString() + this.props.rowname.toString() 
    

    return (
        <li id={idid} class={this.state.active == this.props.rowname ? "active":"notactive"} onClick={() => this.clickHe(this.props.rowname, idid)}>{this.props.rowname}</li>
    )
  }
}

class BookLivePage extends React.Component{
    constructor(props) {
        super(props);
        this.changeMonth = this.changeMonth.bind(this);
        this.monthConversion = this.monthConversion.bind(this);
        this.clickDay = this.clickDay.bind(this);


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
          currentdateclicked:""

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
        
        if (firstchar1 == firstchar2)
        {
          document.getElementById(this.state.notactive).className = "notactive"

        }
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

    changeMonth(where)
    {
      if (this.state.notactive != "")
      {
        document.getElementById(this.state.notactive).className = "notactive"
      }


      let tuatan = this.state.monthnumber
      if (where == "next")
      {
        this.setState({
          monthnumber: this.state.monthnumber + 1,

        })
        tuatan = tuatan + 1

        console.log(tuatan)
        this.monthConversion(tuatan)

      }
      else
      {
        this.setState({
          monthnumber: this.state.monthnumber - 1

        })
        tuatan = tuatan - 1
        this.monthConversion(tuatan)
        console.log(tuatan)
      }

      

    }


      render() 
      {
        let daythai = ""
        console.log("LUFFY GEAR 5", this.state.currentdateclicked)
        let whatttttt = this.monthConversion(this.state.monthnumber, "fadfadsf")

        if (this.state.dayclicked == 0)
        {
          daythai = "อาทิตย์"
        }
        else if (this.state.dayclicked == 1)
        {
          daythai = "จันทร์"

        }
        else if (this.state.dayclicked == 2)
        {
          daythai = "อังคาร"

        }
        else if (this.state.dayclicked == 3)
        {
          daythai = "พุธ"

        }
        else if (this.state.dayclicked == 4)
        {
          daythai = "พฤหัส"

        }
        else if (this.state.dayclicked == 5)
        {
          daythai = "ศุกร์"

        }
        else
        {
          daythai = "เสาร์"

        }
        let combination = "วัน" + daythai + "ที่" + this.state.currentdateclicked + whatttttt + "2022"

        const date_rows = [];
        console.log("ACTIVE", this.state.active)
        console.log("current month", this.state.currentmonth)
        console.log("month numberbrbrbrbrbrbrbr", this.state.monthnumber)


        const d = new Date();
        let month = d.getMonth();
        let howmanydays = new Date(2022, this.state.monthnumber + 1, 0).getDate();
        console.log("how many fucking days?!", howmanydays)


        for (let i = 1; i < howmanydays + 1; i++)
        {
          date_rows.push(<BookLiveRow rowname={i} monthnumber={this.state.monthnumber} firstactive={this.state.active} onClickDay={this.clickDay}/>)
        }

   
        return (
          <div class="divsearch d-flex justify-content-center">
             
            
              <div class="calendar">
                <div class="month d-flex justify-content-between">   
                {this.state.currentmonth < this.state.monthnumber ?
                <button onClick={() => this.changeMonth("back")}  class="btn prev">เดือนก่อนหน้า</button>:null}

                <div class="d-flex flex-column">
                  <h5 class="whatmonth">{whatttttt}</h5>
                </div>   

                {this.state.monthnumber < 11 ? 
                  <button onClick={() => this.changeMonth("next")} class="btn next">เดือนถัดไป</button>:null}
                  
                  </div>

    
              <ul class="weekdays">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul class="days"> 
              {date_rows}
              </ul>
              <h1>{combination}</h1>



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