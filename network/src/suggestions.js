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
      //if (e.target.value !=  "")
     // {
      //  document.querySelector('#suggestions_por_react_popular').hidden = true;
      //}
      this.props.oncheckSearch(e.target.value);

    }
      render() 
      {
   
        return (
          <div class="d-flex justify-content-center">
          <div class="divsearch d-flex justify-content-center">
            <form>
          <input
            id="searchid"
            type="text"
            class="inputsearch form-control d-flex justify-content-center"
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
    console.log("checker checky for newdata", this.state.newdata)
     console.log("this is dataaaaaa mama mama", data)
     this.setState({
      newdata: data["newdata"]
    })


    });
    }
    render() {
      const suggestion_rows = [];
      console.log("this.state.new", this.state.newdata)
      /*
      <div id="control-suggestions">
      <div class="d-flex justify-content-start">
       <SearchBar searchtext={this.state.searchtext} oncheckSearch={this.mainSearch}/>
      </div>
      </div>
      */
      
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
      console.log(this.props.type)
        return (
          <div id="control-suggestions" class="control-suggestions">
            
            {this.props.type == "main" ? <div class="d-flex justify-content-center">
           <SearchBar searchtext={this.state.searchtext} oncheckSearch={this.mainSearch}/>
          </div>:<null></null>}
          
          <div class="divofstartitle">
              <h3 class="startitleindex mt-3">{this.props.type == "main" ? "สตาร์":"ป๊อปปูล่า"}</h3>
          </div>

          <div class="content mt-3 mb-5">
              <div class="box">{suggestion_rows}</div>
            </div>

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
         link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/a42c13e2-bc2f-11ec-866f-acde480011221.jpg"
      }

      
      // might be of use so yea
      const ininfluencer_link = "/ininfluencer/"+this.props.username
      //<a name="posterr" href={portalname} class="h4 colorstyle">{this.props.portalname}</a> 

      //not sure wa mee tummai but geb whai gorn
      //<h5>{this.props.influencer_ornot}</h5>
      //<h5>{this.props.freeze_account}</h5>
        return (
          <div>
        <a name="goodmorning" class="goodmorning d-flex justify-content-center mb-3" href={ininfluencer_link}> 
          <div class="d-flex flex-column">
            <img class="imgindex" width="240" height="300" src={link}></img>
            <a name="posterr" class="h4 colorstyle">{this.props.username}</a> 
            <h5>{this.props.fullname}</h5>
          </div>

        </a>
        <hr class="hrindex"></hr>
        </div>
        )

      }
    }

document.addEventListener('DOMContentLoaded', function() {
      fetch(`/inzwerg4jgnsd9aadif67`)
      .then(response => response.json())
      .then(data => {        
        console.log("this is newdata", data["newdata"])
        console.log("this is populardata", data["populardata"])


        ReactDOM.render(<SuggestionTable data={data["newdata"]} type="main"/>, document.querySelector('#suggestions_por_react'));
        ReactDOM.render(<SuggestionTable data={data["populardata"]} type="popular"/>, document.querySelector('#suggestions_por_react_popular'));

      });
    
     
    });
    