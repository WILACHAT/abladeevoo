
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
class SearchOverlay extends React.Component{
    constructor(props) {
        super(props);
        this.forFetching = this.forFetching.bind(this);
        console.log("WALOUCH NO !")
 

    }
    forFetching()
    {
        const csrftoken = getCookie('csrftoken');
        var pagination = 1
        var postvalue = document.querySelector('#textareapostid').value
        var portalid = document.querySelector('#getportalid_id').dataset.portalId
        console.log("forFetching", postvalue)

        fetch(`/gotoportal/${portalid}/${pagination}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                portalid: portalid,
                posttype: this.props.data,
                postvalue: postvalue

            })
        })        
        .then(response => response.json())
        .then(data => {
            console.log("waan check", data)
            ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));

        });
    }
    
    render() {
        return (
            <div id="overlayrc">
                <h1>what is this</h1>
                <textarea id="textareapostid"></textarea>
                <button type="button" class="btn btn-primary" id="postinfeedid" onClick={this.forFetching}></button>
            </div>
        )
    }
}
class PortalFeedRows extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4>{this.props.post_info}</h4>
                <h4>{this.props.posttype}</h4>
            </div>
        )
    }
}
class PortalFeedTable extends React.Component{
    constructor(props) {   
        super(props);
        this.postButton = this.postButton.bind(this); 
      //  console.log("posts", this.props.portal_name)
       // console.log("posts1", this.props.data["data"][0].portal_id)
        //console.log("posts2", this.props.data["data"][0].post_info)
        console.log("data", this.props.data)
       
    }
    postButton() {
        console.log("heldskfnalsdkfnalsy")
        ReactDOM.render(<SearchOverlay data={this.props.data}/>, document.querySelector('#' + this.props.data["posttype"]));
    }
    render() {
        const rows = [];
        if (this.props.data["data"] == undefined)
        {
            console.log("hey")
        }
        else
        {

            for (let i = 0; i < this.props.data["data"].length; i++)
            {
                rows.push( 
                    <PortalFeedRows 
                    id={this.props.data["data"][i].id}
                    portal_id={this.props.data["data"][i].portal_id}
                    post_info={this.props.data["data"][i].post_info}
                    type_posts={this.props.data["data"][i].type_posts}
                    currenttime={this.props.data["data"][i].timestamp}/>
                );
            } 
        }

       
        return (
            <div>
                <button type="button" class="btn btn-primary" id="storefeedid" onClick={this.postButton}>Post</button>
                <table className="table table-hover table-sm">
                    <tbody> {rows} </tbody>
                </table>
            </div>
        )
    }
}
class PortalFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedPortal = this.changeFeedPortal.bind(this);
      this.subscribeButton = this.subscribeButton.bind(this);
      console.log("SUBSCRIBER COUNT", this.props.data["subscriber_counts"])
      console.log("SUBSCRIBER CHCEK", this.props.data["subscribecheck"])


      document.querySelector('#publicfeedid').hidden = false;
      document.querySelector('#memberfeedid').hidden = true;
      document.querySelector('#communitypageid').hidden = true;
      document.querySelector('#storepageid').hidden = true;
      this.state = {
        subscriber_counts: this.props.data["subscriber_counts"],
        subscribecheck: this.props.data["subscribecheck"]
      };
   
    }
    

    changeFeedPortal(e)
    {
        if (e.target.id == "publicfeedbutid")
        {
            document.querySelector('#publicfeedid').hidden = false;
            document.querySelector('#memberfeedid').hidden = true;
            document.querySelector('#communitypageid').hidden = true;
            document.querySelector('#storepageid').hidden = true;
            const csrftoken = getCookie('csrftoken')
            var portalid = document.querySelector('#getportalid_id').dataset.portalId
            var pagination = 1
            fetch(`/gotoportal/${portalid}/${pagination}`)

            .then(response => response.json())
            .then(data => {
              console.log("newdata ugggg", data)
              ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));
        
            });
        }
        else if (e.target.id == "memberfeedbutid")
        {
            const csrftoken = getCookie('csrftoken')
            var portalid = document.querySelector('#getportalid_id').dataset.portalId
            var pagination = 1

            document.querySelector('#publicfeedid').hidden = true;
            document.querySelector('#memberfeedid').hidden = false;
            document.querySelector('#communitypageid').hidden = true;
            document.querySelector('#storepageid').hidden = true;
        
            
            fetch(`/gotoportal/${portalid}/${pagination}`, {
                method: 'PUT',
                headers: {'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    portalid: portalid,
                    posttype: "memberfeedid"
                })
            })        
            .then(response => response.json())
            .then(data => {
                console.log("memberfeed", data)
                ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#memberfeedid'));

            });

        
        }
        else if (e.target.id == "communityfeedbutid")
        {
            document.querySelector('#publicfeedid').hidden = true;
            document.querySelector('#memberfeedid').hidden = true;
            document.querySelector('#communitypageid').hidden = false;
            document.querySelector('#storepageid').hidden = true;
        }
        else if (e.target.id == "storefeedid")
        {
            document.querySelector('#publicfeedid').hidden = true;
            document.querySelector('#memberfeedid').hidden = true;
            document.querySelector('#communitypageid').hidden = true;
            document.querySelector('#storepageid').hidden = false;
        }

    }
    subscribeButton() {
        
        const csrftoken = getCookie('csrftoken')
        var portalid = document.querySelector('#getportalid_id').dataset.portalId
        var pagination = 1
        fetch(`/subscribeornot/${portalid}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                portalid: portalid,
                posttype: this.props.data,
                subscribecheck: this.state.subscribecheck
            })
        })        
        .then(response => response.json())
        .then(data => {

            this.setState({
                subscriber_counts: data["subscriber_counts"],
                subscribecheck: data["subscribecheck"] 
               
            });

        });
    }
    render() {

        return (
        <div id="control-suggestions">
            <h4>{this.props.data.portalname["portal_name"]}</h4>
            <button type="button" class="btn btn-primary" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
            <button type="button" class="btn btn-primary" id="memberfeedbutid" onClick={this.changeFeedPortal}>Member Feed</button>
            <button type="button" class="btn btn-primary" id="communityfeedbutid" onClick={this.changeFeedPortal}>Community</button>
            <button type="button" class="btn btn-primary" id="storefeedid" onClick={this.changeFeedPortal}>Store</button>
            <button type="button" class="btn btn-success" id="subscribebutton" onClick={this.subscribeButton}>{this.state.subscribecheck == "true" ? "Subscribed":"Subscribe"}</button>
            <h6>Member: {this.state.subscriber_counts}</h6>
        </div>
        )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    console.log("waan")
    var portalid = document.getElementById('getportalid_id').dataset.portalId;
    var pagination = 1
    fetch(`/gotoportal/${portalid}/${pagination}`)
    .then(response => response.json())
    .then(data => {
      ReactDOM.render(<PortalFeedTitle data={data}/>, document.querySelector('#firstfeedid'));
      ReactDOM.render(<PortalFeedTable data={data}/>, document.querySelector('#publicfeedid'));


    });
});
    
