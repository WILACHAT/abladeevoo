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
class InfluencerFeedRows extends React.Component {
constructor(props) {
  super(props);
}
render()
{
  return(
    <div>
      <h4>{this.props.review}</h4>
    </div>
  )
}

}
class InfluencerFeedTable extends React.Component {
  constructor(props) {
    super(props);
  }
    render()
    {
      const rows = [];

      for (let i = 0; i < this.props.data["alldata"].length; i++)
      {
        rows.push( 
          <InfluencerFeedRows 
          review={this.props.data["alldata"][i]}/>
        );
      }
    
      return (
        <div>
            <h1>Reviews of Customers</h1>
            <table className="table table-hover table-sm">
                <h1>{rows}</h1>
            </table>
        </div>
      )
    }
  }

class InfluencerFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedPortal = this.changeFeedPortal.bind(this);
      this.chooseFile = this.chooseFile.bind(this);


      
      document.querySelector('#maininfluencer').hidden = false;
      document.querySelector('#reviewsmainfluencer').hidden = true;
      

    }
    chooseFile(e)
    {
      console.log('yo')
      console.log(document.querySelector('#inputGroupFile01').value)
      let fileinput = document.querySelector('#inputGroupFile01').files[0]
      console.log("fileinput", fileinput)
      console.log("fileinput2", fileinput['type'])
      
      let type= ""
      if (fileinput['type'] == "video/quicktime")
      {
        type= "video"
        console.log("is it in here")
      }
      else
      {
        type= "image"
      }

      
      let formData = new FormData();
      formData.append("media", fileinput);
      
      const getcooked = getCookie('csrftoken')
      fetch(`/forupload/${type}`, {
        method: 'POST',
        headers:{'X-CSRFToken': getcooked},
        body: formData

      })
      .then(response => response.json())
        .then(data => {
          console.log("returned data", data)

          document.querySelector('#testerimage').src = data['url_image']
        });
    }

    
    changeFeedPortal(e)
    {
        const getcooked = getCookie('csrftoken');
        if (e.target.id == "publicfeedbutid")
        {
          console.log("this", this.props.data)
            document.querySelector('#maininfluencer').hidden = false;
            document.querySelector('#reviewsmainfluencer').hidden = true;
            var feedtype = "main"
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
                
                console.log("gimme data", data)
              //ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
            //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


          });
         
        }
        else if (e.target.id == "reviewfeedbutid")
        {
            document.querySelector('#maininfluencer').hidden = true;
            document.querySelector('#reviewsmainfluencer').hidden = false;
            var feedtype = "review"
            console.log("this.props", this.props.data)
            fetch(`/gotoinfluencer/${this.props.data["username"]}/${feedtype}`)
            .then(response => response.json())
            .then(data => {
                console.log("gimme data", data)
              ReactDOM.render(<InfluencerFeedTable data={data}/>, document.querySelector('#reviewsmainfluencer'));
            //  ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


          });
                  
        }
    }
   
    render() {
       // console.log("please print this out first", username)

      //  console.log("please print this out", this.props.username)
        const bookhtmllink = "/book/"+this.props.data["username"]
        console.log("sameperson", this.props.data["sameperson"])

        //<button onClick={this.subscribeButton}>{this.state.subscribecheck == "true" ? "Subscribed":"Subscribe"}</button>


       // console.log("arai gor mai roo but yea", username)
        return (
         <div>
             <h1>{this.props.data['username']}</h1>
            <button type="button" class="btn btn-primary" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
            <button type="button" class="btn btn-primary" id="reviewfeedbutid" onClick={this.changeFeedPortal}>Reviews</button>
            {this.props.data["sameperson"] != 1 ? <a name="posterr" class="btn btn-primary" href={bookhtmllink}>Reserve</a>:null }
            <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
  </div>
        <div class="custom-file">
          <input type="file" onChange={this.chooseFile} class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
        </div>
        <img id="testerimage" alt="ye" width="800" height="500"></img>

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