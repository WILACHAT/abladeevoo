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
        suggestion_rows.push(
          <SuggestionsRow
              id={this.props.data[i].id}
              portalname={this.props.data[i].portalname}
              websiteurl={this.props.data[i].websiteurl}
              portaldes={this.props.data[i].portaldes}
              currenttime={this.props.data[i].currenttime}/>
        );
      }
        return (
        <div id="control-suggestions">
            <h1>LETS GO?</h1>
            <table>
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
      const portal_link = "/portal/"+this.props.portalname
        return (
        <div id="suggestion_row_id">
          <a name="posterr" href={portal_link} class="h4 colorstyle">{this.props.portalname}</a> 
          <h1 onClick={this.clickHref}>waan</h1>
          <h5>{this.props.portaldes}</h5>
          <h5>{this.props.currenttime}</h5>
        </div>
        )

      }
    }

document.addEventListener('DOMContentLoaded', function() {
      fetch(`/allportal`)
      .then(response => response.json())

      .then(data => {        
        ReactDOM.render(<SuggestionTable data={data}/>, document.querySelector('#suggestions_por_react'));
    
      });
    
     
    });
    