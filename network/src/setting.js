
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
class EachTimeSettingOptions extends React.Component
{
  constructor(props)
  {
    super(props);
    this.choosetime = this.choosetime.bind(this);

  }
  choosetime(e)
  {
      console.log("wilachat")
      if (e.target.className == "timebuttonsuccess")
      {
          e.target.className = "timebutton"
      }
      else
      {
        e.target.className = "timebuttonsuccess"
      }
     

  }

  render()
  {
    let buttons = ""
    for (let i = 0; i < this.props.time.length; i++)
    {
        if (this.props.time == this.props.timearray[i])
        {
            buttons = <button id={"choosetimebutton" + this.props.idnumber} class="timebuttonsuccess" onClick={this.choosetime}>{this.props.time}</button>

            console.log("SUCCESSFUL")
            break;
        }
        else
        {            
           buttons = <button id={"choosetimebutton" + this.props.idnumber} class="timebutton" onClick={this.choosetime}>{this.props.time}</button>

        }
    }
    
    return (
        <div>
        {buttons}
        </div>
    )
}
}

class SettingOptions extends React.Component
{
  constructor(props)
  {
    super(props);
    this.savethetime = this.savethetime.bind(this);
    this.pauseLive = this.pauseLive.bind(this);
    this.pauseCustom = this.pauseCustom.bind(this);

    this.state = 
      {
        timearray:this.props.data,
        customvdo:this.props.customvdo,
        livevdo:this.props.livevdo
      }

  }
  pauseCustom()
  {
    Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html:
                    
            'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',
      
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Pause Account',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-up"></i> No',
        cancelButtonAriaLabel: 'Thumbs down'
        })
        .then((result) => { 
            console.log(result) 
            const getcooked = getCookie('csrftoken')
            let type = ""
            if (result["isConfirmed"] == true)
            {

                if (this.state.customvdo == true)
                {
                    type= "pausecustom"
                }
                else
                {
                    type= "unpausecustom"
                }
                fetch(`/setting`, {
                method: 'POST',
                headers:{'X-CSRFToken': getcooked},
                body: JSON.stringify({
                    arraytime:  "",
                    type: type
                        })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log("ngongs", data["customvdo"])
                    this.setState({customvdo:data["customvdo"]})

                });
                
            }
        
        })
            
      
  }
  pauseLive()
  {
    Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html:
                    
            'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',
      
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Pause Account',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-up"></i> No',
        cancelButtonAriaLabel: 'Thumbs down'
        })
        .then((result) => { 
            console.log(result) 
            const getcooked = getCookie('csrftoken')
            let type = ""
            if (result["isConfirmed"] == true)
            {
                if (this.state.livevdo == true)
                {
                    type= "pauselive"
                }
                else
                {
                    type= "unpauselive"
                }
                
                fetch(`/setting`, {
                method: 'POST',
                headers:{'X-CSRFToken': getcooked},
                body: JSON.stringify({
                    arraytime:  "",
                    type: type
                        })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({livevdo:data["livevdo"]})

                });
                
        
            }
        
        })
  }
  savethetime(e)
  {
    let arraytime = []
    for (let i = 0; i < document.getElementById("rachar").children.length; i++)
    {
        if (document.getElementById("rachar").children[i].children[0].className == "timebuttonsuccess")
        {
            arraytime.push(document.getElementById("rachar").children[i].children[0].innerHTML)
        }
    }

    Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html:
                    
            'Are you <b>certain</b> that you want to hide the account. Customer would not be able to request but you would still be able to complete request that is already requested.',
      
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Pause Account',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-up"></i> No',
        cancelButtonAriaLabel: 'Thumbs down'
        })
        .then((result) => { 
            let arraytime = ""
            console.log(result) 
            const getcooked = getCookie('csrftoken')
            
            if (result["isConfirmed"] == true)
            {
                
                fetch(`/setting`, {
                method: 'POST',
                headers:{'X-CSRFToken': getcooked},
                body: JSON.stringify({
                arraytime:  arraytime,
                type: "settime"
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log("this is datanewtime", data["time"])
                    this.setState({timearray:data["time"]})
                    //if data returns successful show beautiful success stuff
                    //if not show failed html
                    //location.reload();
        
                });
                

            }
            
        })

  }

  render()
  {

  
    const rows = []
    const time = ['7:00-7:30', '7:30-8:00', '8:00-8:30', '8:30-9:00', '9:00-9:30', '9:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00', '20:00-20:30', '20:30-21:00', '21:00-21:30', '21:30-22:00']
    for (let i = 0; i < time.length; i ++)
    {
        rows.push(<EachTimeSettingOptions time={time[i]} idnumber={i} timearray={this.state.timearray} />)
    }
    
    return (
        <div>
            <div class="d-flex justify-content-center">
            <div class="accountsettingsecondcolumn">
                <h1 class="settingheading">วีดีโอคัสตอม</h1>
                <button id="customstatusid" class="pauseaccountbtn mt-2" onClick={this.pauseCustom}>{this.state.customvdo == true ? "หยุดการสั่งวีดีโอคัสตอม":"เริ่มการสั่งวีดีโอคัสตอม"}</button>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="accountsettingsecondcolumn">
                <h1 class="settingheading">ไลฟ์วีดีโอ</h1>

                <button class="pauseaccountbtn mt-2" onClick={this.pauseLive}>{this.state.livevdo == true ? "หยุดการไลฟ์วีดีโอ":"เริ่มการไลฟ์วีดีโอ"}</button>
                <hr></hr>
                <h3 class="settingheading2 mt-3">เลือกเวลาที่สดวกไลฟ์</h3>
                {this.state.livevdo == true ? 
                <div>
                <div id="rachar">
                    {rows}
                </div>
                <button onClick={this.savethetime} class="savethetime mt-3">ตั้งเวลาไลฟ์</button>
                </div>
                :
                null}

           </div>
        </div>
        </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const getcooked = getCookie('csrftoken')

    fetch(`/setting`, {
        method: 'POST',
        headers:{'X-CSRFToken': getcooked},
          body: JSON.stringify({
            type:"beginning"

              })
          })
          .then(response => response.json())
          .then(data => {
            console.log("everything", data)
            console.log("mono", data["time"])
            console.log("mono", data["customvdo"])

            ReactDOM.render(<SettingOptions data={data["time"]} customvdo={data["customvdo"]} livevdo={data["livevdo"]}/>, document.querySelector('#settingsreactid'));

          });
   

});