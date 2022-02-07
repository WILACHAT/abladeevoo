
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
        console.log("haha", this.props.data)
        console.log("ha name", this.props.portalname)

    }
    forFetching()
    {
        const csrftoken = getCookie('csrftoken');
        var portalid = 1
        var pagination = 1
        var postvalue = document.querySelector('#textareapostid').value
        console.log("forFetching", postvalue)

        fetch(`/gotoportal/${portalid}/${pagination}`, {
            method: 'PUT',
            headers: {'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                portalname: this.props.portalname,
                posttype: this.props.data,
                postvalue: postvalue

            })
        })        
        .then(response => response.json())
        .then(data => {
            console.log("waan check ")
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
                <table className="table table-hover table-sm">
                    <tbody> {rows} </tbody>
                </table>
            </div>
        )
    }
}
class PortalFeedTable extends React.Component{
    constructor(props) {   
        super(props);
        this.postButton = this.postButton.bind(this); 
        console.log("datadatadata", this.props.data)
      //  console.log("posts", this.props.portal_name)
       // console.log("posts1", this.props.data["data"][0].portal_id)
        //console.log("posts2", this.props.data["data"][0].post_info)
        //console.log("posts3", this.props.data["data"][0].type_posts)

    }
    postButton() {
        ReactDOM.render(<SearchOverlay data="publicfeedid" portalname={this.props.data}/>, document.querySelector('#publicfeedid'));
    }
    render() {
      //  const rows = [];
      //  for (let i = 0; i < this.props.data["data"].length; i++)
      //  {
       //   rows.push(
       //     <PortalFeedRows
       //      />
        //  );

       //  }
        return (
            <div>
                <h1>this is public feed</h1>
                <button type="button" class="btn btn-primary" id="storefeedid" onClick={this.postButton}>Post</button>
            </div>
        )
    }
}
class PortalFeedTitle extends React.Component {
    constructor(props) {
      super(props);
      this.changeFeedPortal = this.changeFeedPortal.bind(this);
      document.querySelector('#publicfeedid').hidden = false;
      document.querySelector('#memberfeedid').hidden = true;
      document.querySelector('#communitypageid').hidden = true;
      document.querySelector('#storepageid').hidden = true;
    }

    changeFeedPortal(e)
    {
        if (e.target.id == "publicfeedbutid")
        {
            document.querySelector('#publicfeedid').hidden = false;
            document.querySelector('#memberfeedid').hidden = true;
            document.querySelector('#communitypageid').hidden = true;
            document.querySelector('#storepageid').hidden = true;
            ReactDOM.render(<PortalFeedTable data={this.props.data.portalname["portal_name"]}/>, document.querySelector('#publicfeedid'));


        }
        else if (e.target.id == "memberfeedbutid")
        {
            document.querySelector('#publicfeedid').hidden = true;
            document.querySelector('#memberfeedid').hidden = false;
            document.querySelector('#communitypageid').hidden = true;
            document.querySelector('#storepageid').hidden = true;
        
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
    render() {
      const suggestion_rows = [];
     /* for (let i = 0; i < this.props.data.length; i++)
      {
        suggestion_rows.push(
          <PortalFeedRow
              id={this.props.data[i].id}
              portalname={this.props.data[i].portalname}
              websiteurl={this.props.data[i].websiteurl}
              portaldes={this.props.data[i].portaldes}
              currenttime={this.props.data[i].currenttime}/>
                <table>
            <tbody> {suggestion_rows} </tbody>
            </table>
        );
      }
      */
        return (
        <div id="control-suggestions">
            <h4>{this.props.data.portalname["portal_name"]}</h4>
            <button type="button" class="btn btn-primary" id="publicfeedbutid" onClick={this.changeFeedPortal}>Public Feed</button>
            <button type="button" class="btn btn-primary" id="memberfeedbutid" onClick={this.changeFeedPortal}>Member Feed</button>
            <button type="button" class="btn btn-primary" id="communityfeedbutid" onClick={this.changeFeedPortal}>Community</button>
            <button type="button" class="btn btn-primary" id="storefeedid" onClick={this.changeFeedPortal}>Store</button>
            <button type="button" class="btn btn-primary" id="postinfeedid">Post</button>
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
      console.log("newdata ugggg", data)
      ReactDOM.render(<PortalFeedTitle data={data}/>, document.querySelector('#firstfeedid'));

    });
});
    
