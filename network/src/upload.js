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
const e = React.createElement;

class TwoButtons extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {

      return e(
        <h1>New Portal</h1>
      );
    }
  }
  const domContainer = document.querySelector('#new_portal');
  console.log("domContainer", domContainer)
ReactDOM.render(e(TwoButtons), domContainer);
ReactDOM.render(<EditPage 
    id={this.props.id} 
    postinfo={this.props.post_info}
    curuser={this.props.curuser}
    timestamp={this.props.time_stamp}/>, document.querySelector('#posting_view'));
  