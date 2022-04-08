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

  class SuggestionTable extends React.Component {
    constructor(props) {
      super(props);
     
    }
    render() {
      const suggestion_rows = [];
      for (let i = 0; i < this.props.data.length; i++)
      {
        console.log("lol wtf", this.props.data[i])
        suggestion_rows.push(
          <SuggestionsRow
              id={this.props.data[i].id}
              username={this.props.data[i].username}
              email={this.props.data[i].email}
              influencer_ornot={this.props.data[i].influencer_ornot}
              freeze_account={this.props.data[i].freeze_account}/>
        );
      }
        return (
        <div id="control-suggestions">
            <h2 class="d-flex justify-content-center mt-2">Welcome to Ablaze</h2>
            <h4 class="d-flex justify-content-center">Personalized videos from your favorite stars</h4>

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
      // might be of use so yea
      const ininfluencer_link = "/ininfluencer/"+this.props.username
      //<a name="posterr" href={portalname} class="h4 colorstyle">{this.props.portalname}</a> 

        return (
        <div id="suggestion_row_id">
          <a name="posterr" href={ininfluencer_link} class="h4 colorstyle">{this.props.username}</a> 
          <h5>{this.props.influencer_ornot}</h5>
          <h5>{this.props.freeze_account}</h5>
        </div>
        )

      }
    }

document.addEventListener('DOMContentLoaded', function() {
      fetch(`/inzwerg4jgnsd9aadif67`)
      .then(response => response.json())
      .then(data => {        
        ReactDOM.render(<SuggestionTable data={data}/>, document.querySelector('#suggestions_por_react'));
    
      });
    
     
    });
    