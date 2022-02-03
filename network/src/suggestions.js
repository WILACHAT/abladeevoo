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
        return (
            <div id="check">
                <h1>LETS FUCKING GO</h1>
            </div>
        )

    }
  }
  
document.addEventListener('DOMContentLoaded', function() {
    console.log("walouchy check")
    //let userid_clicked = document.getElementById("hiddenportalid").value
    //const pagination = document.querySelector('#hidden_pagination').value
   // console.log("userid_clicked", userid_clicked)
   // userid_clicked = parseInt(userid_clicked)
      fetch(`/allportal`)
      .then(response => response.json())

      .then(data => {
        console.log("data", data)
        
        ReactDOM.render(<SuggestionTable data={data}/>, document.querySelector('#suggestions_por_react'));
    
      });
    
     
    });
    