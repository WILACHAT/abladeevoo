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
class InfluencerFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedPortal = this.changeFeedPortal.bind(this);
      
      document.querySelector('#maininfluencer').hidden = false;
      document.querySelector('#reviewsmainfluencer').hidden = true;
      

    }
    

    changeFeedPortal(e)
    {
        if (e.target.id == "publicfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = false;
            document.querySelector('#reviewsmainfluencer').hidden = true;
            var feedtype = "main"
            fetch(`/gotoinfluencer/${this.props.data}/${feedtype}`)

            .then(response => response.json())
            .then(data => {
              //when the data is returned use reactdom render new table 
              ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));
        
            });

        }
        else if (e.target.id == "reviewfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = true;
            document.querySelector('#reviewsmainfluencer').hidden = false;
            var feedtype = "review"
            fetch(`/gotoinfluencer/${this.props.data}/${feedtype}`)

            .then(response => response.json())
            .then(data => {
            //when the data is returned use reactdom render new table 

              ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));
        
            });
            
           
        }
    }
   
    render() {
       // console.log("please print this out first", username)

      //  console.log("please print this out", this.props.username)
        const bookhtmllink = "/book/"+this.props.data["username"]

       // console.log("arai gor mai roo but yea", username)
        return (
         <div>
             <h1>{this.props.data['username']}</h1>
            <button type="button" class="btn btn-primary" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
            <button type="button" class="btn btn-primary" id="reviewfeedbutid" onClick={this.changeFeedPortal}>Reviews</button>
            <a name="posterr" class="btn btn-primary" href={bookhtmllink}>Reserve</a> 
         </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    console.log("walachat")
    var influencerusername = document.getElementById('getinfluencerusername').dataset.username;
    var feedtype = "main"
    console.log("influencer username", influencerusername)

    fetch(`/gotoinfluencer/${influencerusername}/${feedtype}`)
    .then(response => response.json())
    .then(data => {
        console.log("gimme data", data)
      ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
    //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


  });
});