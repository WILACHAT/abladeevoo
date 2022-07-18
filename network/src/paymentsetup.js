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
                        <label>ตั้งราคาต่อวีดีโอ (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input type="number" class="inputhehore"id="setpriceid" placeholder="ตัวอย่าง: 500"></input>
                    </div>
            </div>,
       
            innerpaymentdiv: 
            <div>
                  <div class="d-flex justify-content-center">
                      <label>เลือกบัญชีธนาคารการรับเงิน</label>
                  </div>
                  
                  <div class="d-flex justify-content-center">
                      <select class="inputhehore" name="selectbank" id="selectbankid">
                          <option value="nothing"></option>
                          <option value="bbl">Bangkok Bank</option>
                          <option value="bay">Krungsri Bank</option>
                          <option value="kbank">Kasikorn Bank</option>
                          <option value="ktb">Krungthai Bank</option>
                          <option value="scb">Siam Commercial Bank</option>
                          <option value="ttb">TMB-Thanachart Bank</option>
                      </select>
                  </div>
      
                  <div class="d-flex justify-content-center mt-2">
                      <label>ชื่อ-นามสกุล (ไทย หรือ อังกฤษ)</label>
                  </div>
                  <div class="d-flex justify-content-center">
                      <input class="inputhehore" id="fullnamebankid" placeholder="ตัวอย่าง: วิรชัช วีสกุล"></input>
                  </div>
              
                  <div class="d-flex justify-content-center mt-2">
                      <label>เลขที่บัญชีธนาคาร</label>
                  </div>    
                  <div class="d-flex justify-content-center">
                      <input class="inputhehore" id="accountnumberid" type="number" placeholder="ตัวอย่าง: 0384683978"></input>
                  </div>
                  
                  <div class="d-flex justify-content-center mt-2">
                      <label>อีเมล</label>
                  </div>
                  <div class="d-flex justify-content-center">
                      <input class="inputhehore" id="emailid" placeholder="ตัวอย่าง: araisukyarng@gmail.com"></input>
                  </div>
                  <div class="d-flex justify-content-center mt-3">
                    <p>*ในขณะนี้ไม่สามารถสร้างบัญชีการเงินได้มากกว่าหนึ่งอัน  แต่สามารถเปลี่ยนข้อมูลบัญชีของท่านได้*</p>
                  </div>

                  <div class="d-flex justify-content-center">
                    <label class="wa d-flex justify-content-center mt-2">*กรุณาตรวจสอบเลขที่บัญชีอีกครั้ง*</label>
                  </div>

                  <div class="d-flex justify-content-center">
                      <button class="btn registerbtn" onClick={() => this.onSubmit("new")}>สร้างบัญชีการเงิน</button>
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
            <div class="d-flex justify-content-center">
                <div class="coversprice">
                    <div class="d-flex justify-content-center">
                        <label>ราคาต่อวีดีโอ (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h5 class="registertitleprice">{this.props.data["price"]} ฿</h5>
                    </div>
                    <hr></hr>

                    <div class="d-flex justify-content-center">
                        <button class="btn registerbtn" onClick={this.changePrice}>เปลี่ยนราคา</button>
                    </div>
                </div>
            </div>,

            brand:this.props.data["brand"],
            name:this.props.data["name"],
            number:this.props.data["number"],
            email:this.props.data["email"],
           
            innerpaymentdiv: 
            <div class="d-flex justify-content-center mt-5">
                <div class="coversbank mb-5">
                    <div class="d-flex justify-content-center">
                        <label>ธนาคารที่ใช้อยู่</label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <h5>{this.props.data["brand"]}</h5>
                    </div>
                    <hr></hr>

        
                    <div class="d-flex justify-content-center mt-2">
                        <label>ชื่อจริงและนามสกุล</label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <h5>{this.props.data["name"]}</h5>
                    </div>
                    <hr></hr>

                    <div class="d-flex justify-content-center mt-2">
                        <label>เลขที่บัญชีลงท้าย 4ตัว</label>
                    </div>


                    <div class="d-flex justify-content-center">
                        <h5>******{this.props.data["number"]}</h5>
                    </div>
                    <hr></hr>

        
                    <div class="d-flex justify-content-center mt-2">
                        <label>อีเมล</label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <h5>{this.props.data["email"]}</h5> 
                    </div>
                    <hr></hr>

                    <div class="d-flex justify-content-center">
                        <button class="btn registerbtn" onClick={this.changePayment}>เปลี่ยนธนาคาร</button>
                    </div>
                </div>
            </div>
            }
        }
  }
  setPrice(e)
  {
      let price = document.querySelector('#setpriceid').value
      let type = "paymentchange"
      price = document.querySelector('#setpriceid').value
      let checkforprice = parseInt(price)
      if (checkforprice < 50)
      {
        Swal.fire({
            icon: 'error',
            title: 'มีปัญหา',
            text: 'ราคาต่อวีดีโอต้องเท่ากับหรือมากกว่า 50 บาท!',

          })
      }
      else if (checkforprice > 10000)
      {
        Swal.fire({
            icon: 'error',
            title: 'มีปัญหา',
            text: 'ราคาต่อวีดีโอต้องน้อยกว่าหรือเท่ากับ 10000 บาท!',

          })
      }
      else
      {
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
              Swal.fire({
                  icon: 'success',
                  title: 'สําเร็จ!',
                })
              this.setState({
                  price:data["price"],
                  innerpricediv: 
                  <div class="d-flex justify-content-center">
                  <div class="coversprice">
                      <div class="d-flex justify-content-center">
                          <label>ราคาต่อวีดีโอ (THB)</label>
                      </div>
                      <div class="d-flex justify-content-center">
                          <h5 class="registertitleprice">{data["price"]} ฿</h5>
                      </div>
                      <hr></hr>
  
                      <div class="d-flex justify-content-center">
                          <button class="btn registerbtn" onClick={this.changePrice}>เปลี่ยนราคา</button>
                      </div>
                  </div>
              </div>})
                
                //if data returns successful show beautiful success stuff
                //if not show failed html
            });   
      }
      

  }
  onSubmit(status)
  {
      let type = ""
      let price = ""
      if (status == "change")
      {
         type = "existpostupdate"
      }
      else
      {
        type = "notexistpost"
        price = document.querySelector('#setpriceid').value
        if (price == "")
        {
            price = 1
        }
      }

      let checker = 0
      if (document.querySelector('#selectbankid').value == "nothing")
      {
        checker = 1
      }
      else if (document.querySelector('#accountnumberid').value == "")
      {
        checker = 1
      }
      else if (document.querySelector('#fullnamebankid').value == "")
      {
        checker = 1

      }
      else if (document.querySelector('#emailid').value == "")
      {
          checker = 1
      }

      if (checker == 0)
      {
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
                Swal.fire({
                    icon: 'success',
                    title: 'สําเร็จ!',
                  })

                document.querySelector('#checkexistid').value = "exist"
    
                //if data returns successful show beautiful success stuff
                //if not show failed html
    
                if (data["lol"] == "dumb" || data["lol"] != null)
                {
                    this.setState({
                        price : data["price"],
                        innerpricediv: 
                        <div class="d-flex justify-content-center">
                        <div class="coversprice">
                            <div class="d-flex justify-content-center">
                                <label>ราคาต่อวีดีโอ (THB)</label>
                            </div>
                            <div class="d-flex justify-content-center">
                                <h5 class="registertitleprice">{price} ฿</h5>
                            </div>
                            <hr></hr>
        
                            <div class="d-flex justify-content-center">
                                <button class="btn registerbtn" onClick={this.changePrice}>เปลี่ยนราคา</button>
                            </div>
                        </div>
                    </div>
                    })
                }
                this.setState({
                    
                    brand: data["brand"],
                    name: data["name"],
                    number: data["number"],
                    email: data["email"],
    
                    innerpaymentdiv: 
                    <div class="d-flex justify-content-center mt-5">
                    <div class="coversbank">
                        <div class="d-flex justify-content-center">
                            <label>ธนาคารที่ใช้อยู่</label>
                        </div>
    
                        <div class="d-flex justify-content-center">
                            <h5>{data["brand"]}</h5>
                        </div>
                        <hr></hr>
    
            
                        <div class="d-flex justify-content-center mt-2">
                            <label>ชื่อจริงและนามสกุล</label>
                        </div>
    
                        <div class="d-flex justify-content-center">
                            <h5>{data["name"]}</h5>
                        </div>
                        <hr></hr>
    
                        <div class="d-flex justify-content-center mt-2">
                            <label>เลขที่บัญชีลงท้าย 4ตัว</label>
                        </div>
    
    
                        <div class="d-flex justify-content-center">
                            <h5>******{data["number"]}</h5>
                        </div>
                        <hr></hr>
    
            
                        <div class="d-flex justify-content-center mt-2">
                            <label>อีเมล</label>
                        </div>
    
                        <div class="d-flex justify-content-center">
                            <h5>{data["email"]}</h5> 
                        </div>
                        <hr></hr>
    
                        <div class="d-flex justify-content-center">
                            <button class="btn registerbtn" onClick={this.changePayment}>เปลี่ยนธนาคาร</button>
                        </div>
                    </div>
                </div>
    
                })
    
          });
      }
      else
      {
          alert("ฟอร์มถูกกรอกไม่ครบ")
      }
 
        
  }
  cancelPriceChange(e)
  {
    this.setState({
    innerpricediv: 
    <div class="d-flex justify-content-center">
                <div class="coversprice">
                    <div class="d-flex justify-content-center">
                        <label>ราคาต่อวีดีโอ (THB)</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h5 class="registertitleprice">{this.props.data["price"]} ฿</h5>
                    </div>
                    <hr></hr>

                    <div class="d-flex justify-content-center">
                        <button class="btn registerbtn" onClick={this.changePrice}>เปลี่ยนราคา</button>
                    </div>
                </div>
            </div>,
    })
  }
  cancelChange(e)
  {
      
    this.setState({
                
        innerpaymentdiv: 
        <div class="d-flex justify-content-center mt-5">
        <div class="coversbank">
            <div class="d-flex justify-content-center">
                <label>ธนาคารที่ใช้อยู่</label>
            </div>

            <div class="d-flex justify-content-center">
                <h5>{this.props.data["brand"]}</h5>
            </div>
            <hr></hr>


            <div class="d-flex justify-content-center mt-2">
                <label>ชื่อจริงและนามสกุล</label>
            </div>

            <div class="d-flex justify-content-center">
                <h5>{this.props.data["name"]}</h5>
            </div>
            <hr></hr>

            <div class="d-flex justify-content-center mt-2">
                <label>เลขที่บัญชีลงท้าย 4ตัว</label>
            </div>


            <div class="d-flex justify-content-center">
                <h5>******{this.props.data["number"]}</h5>
            </div>
            <hr></hr>


            <div class="d-flex justify-content-center mt-2">
                <label>อีเมล</label>
            </div>

            <div class="d-flex justify-content-center">
                <h5>{this.props.data["email"]}</h5> 
            </div>
            <hr></hr>

            <div class="d-flex justify-content-center">
                <button class="btn registerbtn" onClick={this.changePayment}>เปลี่ยนธนาคาร</button>
            </div>
        </div>
    </div>
        })
  }
  changePrice(e)
  {
        if (document.querySelector('#checkexistid').value == "exist")
        {
            this.setState({
                innerpricediv: 
                <div>
                    <div class="d-flex justify-content-center">
                        <div class="coversprice">
                                <div class="d-flex justify-content-center">
                                    <label>ตั้งราคาต่อวีดีไอ (THB)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input class="inputheho"id="setpriceid" placeholder="ตัวอย่าง: 500"></input>
                                </div>
                                <hr></hr>

                                <div class="d-flex justify-content-center">
                                    <button class="btn registerbtnlog" onClick={this.setPrice}>ตั้งราคาต่อวีดีโอ</button>
                                </div>
                                <div class="d-flex justify-content-center mt-2">
                                    <button class="btn registerbtnloglog" onClick={this.cancelPriceChange}>ยกเลิก</button>
                                </div>
                        </div>
                    </div>
                </div>
                
              })
        }
  }
  changePayment(e)
  {


      if (document.querySelector('#checkexistid').value == "exist")
      {
            this.setState({
                
                innerpaymentdiv:   
              

    <div class="d-flex justify-content-center mt-5">
        <div class="coversbank">
            <div class="d-flex justify-content-center">
                <label>เปลี่ยนธนาคาร</label>
            </div>

            <div class="d-flex justify-content-center">
                    <select class="inputheho" name="selectbank" id="selectbankid">
                        <option value="nothing"></option>
                        <option value="bbl">Bangkok Bank</option>
                        <option value="bay">Krungsri Bank</option>
                        <option value="kbank">Kasikorn Bank</option>
                        <option value="ktb">Krungthai Bank</option>
                        <option value="scb">Siam Commercial Bank</option>
                        <option value="ttb">Thanachart Bank</option>
                    </select>
            </div>
            <hr></hr>


            <div class="d-flex justify-content-center mt-2">
                <label>ชื่อ-นามสกุล  (ไทย หรือ อังกฤษ)</label>
            </div>

            <div class="d-flex justify-content-center">
                <input class="inputheho"id="fullnamebankid" placeholder="ตัวอย่าง: วิรชัช วีสกุล"></input>
            </div>
            <hr></hr>

            <div class="d-flex justify-content-center mt-2">
                <label>เลขที่บัญชีใหม่</label>
            </div>


            <div class="d-flex justify-content-center">
                <input class="inputheho" id="accountnumberid" placeholder="ตัวอย่าง: 0384683978"></input>
            </div>
            <hr></hr>


            <div class="d-flex justify-content-center mt-2">
                <label>อีเมล</label>
            </div>

            <div class="d-flex justify-content-center">
                <input class="inputheho" placeholder="ตัวอย่าง: araisukyarng@gmail.com" id="emailid"></input>
            </div>
            <hr></hr>

            <label class="wa d-flex justify-content-center mt-2">*กรุณาตรวจสอบเลขที่บัญชีอีกครั้ง*</label>

            <div class="d-flex justify-content-center">
            <button class="btn registerbtn" onClick={() => this.onSubmit("change")}>เปลี่ยนบัญชีรับเงิน</button>
            </div>
            <div class="d-flex justify-content-center mt-2">
                    <button class="btn registerbtnloglog" onClick={this.cancelChange}>ยกเลิก</button>
                </div>
        </div>
    </div>


        })

    
      }
    
      
  }
  
  render() {
     
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
            <div class="godown">
            </div>
            <div class="d-flex justify-content-center mb-4">
                <h2 class="registertitle">การเงิน</h2>
            </div>
            {this.state.innerpricediv}
            {this.state.innerpaymentdiv}
            

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

          //if data returns successful show beautiful success stuff
          //if not show failed html
          ReactDOM.render(<PaymentSetup data={data}/>, document.querySelector('#paymentpay'));

      });
  
   
  });
  