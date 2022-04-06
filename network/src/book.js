document.addEventListener('DOMContentLoaded', function() {

    //might be dealing with money stuff here
    var idk = document.querySelector('#wholereservepage');
   

    document.querySelector('#compose-form').onsubmit=save_post;

});
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
function save_post()
{
    var typeintro = "";
    var tointro = "";
    var fromintro = "";
    var typeoccasion = "";
    var firstinputocca = "";
    var secondinputocca = "";
    var thirdinputocca = "";
    var fourthinputocca = "";

    const getcooked = getCookie('csrftoken')
    var checkerintro = document.getElementsByName("introname")[0].id
    tointro = document.querySelector('#to_intro').value;
    typeintro = checkerintro;
    
    
    if (checkerintro == "someoneelse_html_id")
    {
       fromintro =  document.querySelector('#from_intro').value;
    }
    
    var checkeroccasion = document.getElementsByName("occasionname")[0].id
    typeoccasion = checkeroccasion

    //still incorrect will have to check about the documents

    firstinputocca = document.getElementsByName("occa1").value
    secondinputocca = document.getElementsByName("occa2").value
    if (document.getElementsByName("occa3") != null)
    {
    thirdinputocca = document.getElementsByName("occa3").value
    }
    if (document.getElementsByName("occa4") != null)
    {
    fourthinputocca = document.getElementsByName("occa4").value
    }

    
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;

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
        fourthinputocca: fourthinputocca

      })
    })
    
 
    .then(result => {
        window.location.href = "/";
    });
    
    return false;
}
class BookPage extends React.Component {
    constructor(props) {
      super(props);
      this.changeIntroReserve = this.changeIntroReserve.bind(this);
      this.changeOccasionReserve = this.changeOccasionReserve.bind(this);


      //the number of steps can be state as well i believe
      this.state = {
        reserve_into_html: 
            <div name="introname"id="someoneelse_html_id">
                <div>
                    <h1>Who is this cameo from?</h1>
                    <input id="from_intro" placeholder="From"></input>
                </div>
            </div>,
        reserve_occasion_html:
            <div name="occasionname"id="birthday_html_id">
                <div>
                    <input placeholder="When is their birthday?"></input><br></br>
                    <input placeholder="How old are they turning?"></input><br></br>
                    <input placeholder="Instructions for"></input><br></br>
                    <input placeholder="Optional"></input>
                </div>
            </div>
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
                            <input id="from_intro"placeholder="From"></input>
                        </div>
                     </div>
            });
        }
        else
        {
            console.log("is it anotherpeoplehtml")
            this.setState({
                reserve_into_html:
                <div name="introname" id="myself_html_id">
                </div>
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
                            <input name="occa1" placeholder="When is their birthday?"></input><br></br>
                            <input name="occa2" placeholder="How old are they turning?"></input><br></br>
                            <input name="occa3" placeholder="Instructions for"></input><br></br>
                            <input name="occa4" placeholder="Optional"></input>
                        </div>
                    </div>
            })
        }
        else if (e.target.id == "peptalkbutton")
        {
            console.log("peptalk")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="peptalk_html_id">
                        <div>
                            <input name="occa1" placeholder="What's going on with the recipient?"></input><br></br>
                            <input name="occa2" placeholder="How can ... help?"></input><br></br>
                            <input name="occa3" placeholder="Optional details"></input>
                        </div>
                    </div>
            })

        }
        else if (e.target.id == "roastbutton")
        {
            console.log("roast")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="roastbutton_html_id">
                        <div>
                            <input name="occa1" placeholder="What would you like Kevin McKidd to roast the recipient about?"></input><br></br>
                            <input name="occa2" placeholder="Optional"></input>
                        </div>
                    </div>
            })

        }
        else
        {
            console.log("other lets go")
            this.setState({
                reserve_occasion_html:
                    <div name="occasionname" id="other_html_id">
                        <div>
                            <input placeholder="What's the occasion?"></input><br></br>
                            <input placeholder="Instructions for"></input><br></br>
                            <input placeholder="Optional"/>
                        </div>
                    </div>
            })

        }
    }

    
    render() {

        return (
         <div>
             <div id="intro">
                <h1>who is this for</h1>
                <button type="button" class="btn btn-primary" id="someoneelsehtml" onClick={this.changeIntroReserve}>Someone Else</button>
                <button type="button" class="btn btn-primary" id="myselfhtml" onClick={this.changeIntroReserve}>Myself</button>
             </div>
             <input id="to_intro" placeholder="To"></input>
             {this.state.reserve_into_html}
             
             <div id="occasion">
                <h1>whats the occasion</h1>
                <button type="button" class="btn btn-primary" id="birthdaybutton" onClick={this.changeOccasionReserve}>Birthday</button>
                <button type="button" class="btn btn-primary" id="peptalkbutton" onClick={this.changeOccasionReserve}>Pep Talk</button>
                <button type="button" class="btn btn-primary" id="roastbutton" onClick={this.changeOccasionReserve}>Roast</button>
                <button type="button" class="btn btn-primary" id="otherbutton" onClick={this.changeOccasionReserve}>Other</button>

             </div>
             <h1>Make your request memorable</h1>
             {this.state.reserve_occasion_html}

             

            
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