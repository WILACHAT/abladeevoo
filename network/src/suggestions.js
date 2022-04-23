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
  class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.checkSearch = this.checkSearch.bind(this);

    };
    checkSearch(e) {      
      this.props.oncheckSearch(e.target.value);

    }
      render() 
      {
   
        return (
          <div class="d-flex justify-content-end">
          <div class="divsearch d-flex justify-content-center">
          <form>
          <input
            id="searchid"
            type="text"
            class="inputsearch form-control mr-sm-2 mt-2 pb-2"
            placeholder="Search..."
            value={this.props.searchtext} 
            onChange={this.checkSearch}/>
        </form>
          </div>
          </div>
        );
      }


  }

  class SuggestionTable extends React.Component {
    constructor(props) {
      super(props);
      this.mainSearch = this.mainSearch.bind(this)
      console.log("this.props.dat", this.props.data)
      this.state = 
      {
        searchtext:"",
        newdata: this.props.data

      }
     
    }
    mainSearch(searchtext)
    {
      console.log("searchtext", searchtext)
      this.setState({searchtext: searchtext})
      const getcooked = getCookie('csrftoken')
      fetch(`/inzwerg4jgnsd9aadif67`, {
      method: 'POST',
      headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({
          //add state of newdata right here
          searchvalue:  searchtext
            })
    })
    
    .then(response => response.json())
    .then(data => {
     console.log("this is data", data)
     this.setState({
      newdata: data
    })

    });
    }
    render() {
      const suggestion_rows = [];
      console.log("this.state.new", this.state.newdata)
      for (let i = 0; i < this.state.newdata.length; i++)
      {
        //console.log("lol wtf", this.props.data[i])
        suggestion_rows.push(
          <SuggestionsRow
              id={this.state.newdata[i].id}
              username={this.state.newdata[i].username}
              email={this.state.newdata[i].email}
              influencer_ornot={this.state.newdata[i].influencer_ornot}
              freeze_account={this.state.newdata[i].freeze_account}
              fullname={this.state.newdata[i].fullname}
              profile_picture={this.state.newdata[i].profile_picture}/>
        );
      }
        return (
        <div id="control-suggestions">
            <h2 class="d-flex justify-content-center mt-2">Welcome to Ablaze</h2>
            <h4 class="d-flex justify-content-center">Personalized videos from your favorite stars</h4>
            <div class="d-flex justify-content-center">
             <SearchBar searchtext={this.state.searchtext} oncheckSearch={this.mainSearch}/>:
            </div>
            <table class="d-flex justify-content-center">
                <tbody> {suggestion_rows} </tbody>
            </table>
        </div>
        )

    }
  }
  class SuggestionsRow extends React.Component {
      constructor(props) {
      super(props);
      this.clickHref = this.clickHref.bind(this);

    }
    clickHref(e)
    {
      console.log("yo wassup")
    }
    render() {
      let link
      if (this.props.profile_picture != null)
      {
        link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profile_picture + ".jpg"
      }
      else
      {
        link = ""
      }

      
      // might be of use so yea
      const ininfluencer_link = "/ininfluencer/"+this.props.username
      //<a name="posterr" href={portalname} class="h4 colorstyle">{this.props.portalname}</a> 

        return (
        <div id="suggestion_row_id">
          <a name="posterr" href={ininfluencer_link} class="h4 colorstyle">{this.props.username}</a> 
          <h5>{this.props.influencer_ornot}</h5>
          <h5>{this.props.freeze_account}</h5>
          <h5>{this.props.fullname}</h5>
          <img width="350" height="200" src={link}></img>


        </div>
        )

      }
    }

document.addEventListener('DOMContentLoaded', function() {
      fetch(`/inzwerg4jgnsd9aadif67`)
      .then(response => response.json())
      .then(data => {        
        console.log("this is data", data)
        ReactDOM.render(<SuggestionTable data={data}/>, document.querySelector('#suggestions_por_react'));
    
      });
    
     
    });
    