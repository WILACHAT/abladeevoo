class InboxFeedRows extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        var occasion = ""
        if (this.props.whatoccasion == "birthday_html_id")
        {
            occasion = "Birthday"
        }
        else if(this.props.whatoccasion == "peptalk_html_id")
        {
            occasion = "Pep Talk"
        }
        else if(this.props.whatoccasion == "roastbutton_html_id")
        {
            occasion = "Roast"
        }
        else
        {
            occasion = "Others"
        }

        return(
            <div>
                <h4>{this.props.name}</h4>
                <h4>{this.props.giftornot == "someoneelse_html_id" ? "A gift":"For you"}</h4>
                <h4>{occasion}</h4>
                <h4>{this.props.completed == true ? "Completed" : "Not Complete"}</h4>
            </div>
        )
    }
}
document.addEventListener('DOMContentLoaded', function() {
    splittedwindow = window.location.href.split(" ");
    reservationid = splittedwindow[2]
    fetch(`/gotoeachreserve/${reservationid}`)
    .then(response => response.json())
    .then(data => {
        print("data")
     // ReactDOM.render(<InfluencerFeedTitle data={data}/>, document.querySelector('#toppart'));
  });

  
});