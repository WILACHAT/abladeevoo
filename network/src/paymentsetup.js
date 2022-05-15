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
    this.changePayment = this.changePayment.bind(this);
    this.changePrice = this.changePrice.bind(this);

    this.cancelChange = this.cancelChange.bind(this);
    this.cancelPriceChange = this.cancelPriceChange.bind(this);

    this.setPrice = this.setPrice.bind(this);


    if (document.querySelector('#checkexistid').value != "exist")
    {
        this.state = 
        {
            innerpricediv: 
            <div>
                <div class="d-flex justify-content-center">
                        <label>Set Price (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="setpriceid"></input>
                </div>
            </div>,
       
            innerpaymentdiv: 
            <div>
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
                      <button class="btn btn-primary" onClick={() => this.onSubmit("new")}>Submit</button>
                  </div>
            </div>
        }
    }
    else
        {
        this.state = 
        {
            price:this.props.data["price"],
            innerpricediv: 
            <div>
                <label>Set Price (THB)</label>
                <h2>{this.props.data["price"]}</h2>
                <button onClick={this.changePrice}>Change Price</button>
            </div>,

            brand:this.props.data["brand"],
            name:this.props.data["name"],
            number:this.props.data["number"],
            email:this.props.data["email"],
           
            innerpaymentdiv: 
            <div>
    
                <label>Current Bank</label>
                <h2>{this.props.data["brand"]}</h2>
    
                <label>Full Name</label>
                <h2>{this.props.data["name"]}</h2>
    
                <label>Account Number</label>
                <h2>{this.props.data["number"]}</h2>
    
                <label>Email</label>
                <h2>{this.props.data["email"]}</h2>
    
                <button onClick={this.changePayment}>Change Banking</button>
            </div>
            }
        }
  }
  setPrice(e)
  {
      let price = document.querySelector('#setpriceid').value
      let type = "paymentchange"
      price = document.querySelector('#setpriceid').value
      const getcooked = getCookie('csrftoken')

      fetch(`/paymentsetupapi`, {
          method: 'POST',
          headers:{'X-CSRFToken': getcooked},
          body: JSON.stringify({
              price: price,
              type: type
              })
          })
          .then(response => response.json())
          .then(data => {
            this.setState({
                price:data["price"],
                innerpricediv: 
                <div>
                    <label>Set Price (THB)</label>
                    <h2>{data["price"]}</h2>
                    <button onClick={this.changePrice}>Change Price</button>
                </div>})
              
              //if data returns successful show beautiful success stuff
              //if not show failed html
              console.log(data)
          });      

  }
  onSubmit(status)
  {
      console.log("this is status", status)
      let type = ""
      let price = ""
      console.log("what is the status")
      if (status == "change")
      {
         type = "existpostupdate"
      }
      else
      {
        type = "notexistpost"
        price = document.querySelector('#setpriceid').value
      }
      
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
            email: document.querySelector('#emailid').value,
            price: price,
            type: type

            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("suk mah dik", data)
            console.log("suk mah dik", data["brand"])
            console.log("suk mah dik", data["number"])
            console.log("suk mah dik", data["email"])
            console.log("suk mah dik", data["number"])
            document.querySelector('#checkexistid').value = "exist"

            //if data returns successful show beautiful success stuff
            //if not show failed html
            console.log()

            if (data["lol"] == "dumb" || data["lol"] != null)
            {
                console.log("is this in here wtf pls dont be in here")
                this.setState({
                    price : data["price"],
                    innerpricediv: 
                    <div>
                        <label>Set Price (THB)</label>
                        <h2>{data["price"]}</h2>
                        <button onClick={this.changePrice}>Change Price</button>
                    </div>
                })
            }
            this.setState({
                
                

                brand: data["brand"],
                name: data["name"],
                number: data["number"],
                email: data["email"],

                innerpaymentdiv: 
            <div>
                <label>Current Bank</label>
                <h2>{data["brand"]}</h2>
    
                <label>Full Name</label>
                <h2>{data["name"]}</h2>
    
                <label>Account Number</label>
                <h2>{data["number"]}</h2>
    
                <label>Email</label>
                <h2>{data["email"]}</h2>
    
                <button onClick={this.changePayment}>Change Payment</button>
            </div>

            })

        });
        
  }
  cancelPriceChange(e)
  {
    this.setState({
    innerpricediv: 
    <div>
        <label>Set Price (THB)</label>
        <h2>{this.state.price}</h2>
        <button onClick={this.changePrice}>Change Price</button>
    </div>})
  }
  cancelChange(e)
  {
      
    this.setState({
                
        innerpaymentdiv: 
            <div>
            <label>Current Bank</label>
            <h2>{this.state.brand}</h2>

            <label>Full Name</label>
            <h2>{this.state.name}</h2>

            <label>Account Number</label>
            <h2>{this.state.number}</h2>

            <label>Email</label>
            <h2>{this.state.email}</h2>

            <button onClick={this.changePayment}>Change Payment</button>
        </div>
        })
  }
  changePrice(e)
  {
        console.log("this is in changeprice")
        if (document.querySelector('#checkexistid').value == "exist")
        {
            this.setState({
                innerpricediv: 
                <div>
                  <div class="d-flex justify-content-center">
                    <label>Set Price (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="setpriceid"></input>
                    </div>
                    <div class="d-flex justify-content-center mt-1">
                        <button class="btn btn-primary" onClick={this.setPrice}>Set Price</button>
                    </div>
                    <div class="d-flex justify-content-center mt-1">
                        <button class="btn btn-primary" onClick={this.cancelPriceChange}>Cancel</button>
                    </div>
                </div>
              })
        }
  }
  changePayment(e)
  {
        console.log("this is in changepayment")


      if (document.querySelector('#checkexistid').value == "exist")
      {
            this.setState({
                
                innerpaymentdiv:   
                <div>
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
                    <button class="btn btn-primary" onClick={() => this.onSubmit("change")}>Change Payment</button>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <button class="btn btn-primary" onClick={this.cancelChange}>Cancel</button>
                </div>
          </div>
        })

    
      }
    
      
  }
  
  render() {
      console.log("what the fuck is this", this.props.data)
      console.log("what the fuck is this", this.props.data["brand"])
      console.log("what the fuck is this", this.props.data["name"])
      console.log("what the fuck is this", this.props.data["number"])
      console.log("what the fuck is this", this.props.data["price"])
      console.log("exists?", document.querySelector('#checkexistid').value)
      /* <div class="d-flex justify-content-center">
                        <label>Set Price (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input id="setpriceid"></input>
                    </div>
                    <div class="d-flex justify-content-center mt-1">
                        <button class="btn btn-primary" onClick={this.setPrice}>Change Price</button>
                    </div>
        */

      return (
        <div>
            <h2 class="godown">Payment</h2>
            {this.state.innerpricediv}
            {this.state.innerpaymentdiv}
            <p>*Note Khun samard mee dai kae 1 account</p>
            

        </div>
      )

    }
  }

document.addEventListener('DOMContentLoaded', function() {

    let type = "notexist"    
    if (document.querySelector('#checkexistid').value == "exist")
    {
        type = "exist"
    }
    else
    {
        type = "notexistnotpost"
    }

    

    const getcooked = getCookie('csrftoken')
    fetch(`/paymentsetupapi`, {
      method: 'POST',
      headers:{'X-CSRFToken': getcooked},
      body: JSON.stringify({
          type: type

          })
      })
      .then(response => response.json())
      .then(data => {
            console.log("sscary", data)

          //if data returns successful show beautiful success stuff
          //if not show failed html
          ReactDOM.render(<PaymentSetup data={data}/>, document.querySelector('#paymentpay'));

      });
  
   
  });
  