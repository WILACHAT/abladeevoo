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

class PaymentSetup extends React.Component {
    constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e)
  {
      console.log(document.querySelector('#selectbankid').value)
      document.querySelector('#fullnamebankid').value
      document.querySelector('#accountnumberid').value
      document.querySelector('#emailid').value

      console.log("yoooo")
      //send the info here to python
      const getcooked = getCookie('csrftoken')
      fetch(`/paymentsetupapi`, {
        method: 'POST',
        headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({
            bank: document.querySelector('#selectbankid').value,
            fullname: document.querySelector('#fullnamebankid').value,
            accountnumber: document.querySelector('#accountnumberid').value,
            email: document.querySelector('#emailid').value
            })
        })
        .then(response => response.json())
        .then(data => {
            //if data returns successful show beautiful success stuff
            //if not show failed html
            console.log(data)
        });
        
  }
  
  render() {
      return (
        <div>
            <h2 class="godown">Payment</h2>
            <div class="d-flex justify-content-center">
                <label>Select Bank</label>
            </div>
            
            <div class="d-flex justify-content-center">
                <select name="selectbank" id="selectbankid">
                    <option value="nothing"></option>
                    <option value="bbl">Bangkok Bank</option>
                    <option value="bay">Krungsri Bank</option>
                    <option value="kbank">Kasikorn Bank</option>
                    <option value="ktb">Krungthai Bank</option>
                    <option value="scv">Siam Commercial Bank</option>
                    <option value="ttb">Thanachart Bank</option>
                </select>
            </div>

            <div class="d-flex justify-content-center mt-2">
                <label>Full Name</label>
            </div>
            <div class="d-flex justify-content-center">
                <input id="fullnamebankid"></input>
            </div>
        
            <div class="d-flex justify-content-center mt-2">
                <label>Account Number</label>
            </div>    
            <div class="d-flex justify-content-center">
                <input id="accountnumberid"></input>
            </div>
            
            <div class="d-flex justify-content-center mt-2">
                <label>Email</label>
            </div>
            <div class="d-flex justify-content-center">
                <input id="emailid"></input>
            </div>

            <div class="d-flex justify-content-center mt-2">
                <button class="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </div>
      </div>
      )

    }
  }

document.addEventListener('DOMContentLoaded', function() {
    fetch(`/paymentsetupapi`)
    .then(response => response.json())
    .then(data => {        
        console.log("data", data)
     
    
    ReactDOM.render(<PaymentSetup />, document.querySelector('#paymentpay'));


    });
  
   
  });
  