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
      console.log("kaidoded", e.target.value)

    }
      render() 
      {
   
        return (
          <div class="divsearch d-flex justify-content-center">
          <input
            id="searchid"
            type="text"
            class="inputhehosearch form-control d-flex justify-content-center"
            placeholder="ค้นหา"
            value={this.props.searchtext} 
            onChange={this.checkSearch}
            />
          </div>
        );
      }


  }

class AllStarsTable extends React.Component {
    constructor(props) {
      super(props);
      this.mainSearch = this.mainSearch.bind(this)
      this.onSort = this.onSort.bind(this)

      
      this.state = 
      {
        searchtext:"",
        newdata: this.props.data
      }

  
    }
    onSort()
    {
        let sortingvalue = document.querySelector('#sortingallstars').value
        const getcooked = getCookie('csrftoken')
        fetch(`/allstarsapi`, {
        method: 'POST',
        headers:{'X-CSRFToken': getcooked},
          body: JSON.stringify({
            type:"sort",

            sortingvalue:  sortingvalue
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log("tra1", data)

            this.setState({
                newdata: data
              })
              console.log("tra", this.state.newdata)
         
          });
    }
    mainSearch(searchtext)
    {
      
      console.log("searchtext", searchtext)
      this.setState({searchtext: searchtext})
      const getcooked = getCookie('csrftoken')
      fetch(`/allstarsapi`, {
      method: 'POST',
      headers:{'X-CSRFToken': getcooked},
        body: JSON.stringify({

          //add state of newdata right here
          type:"search",
          searchvalue:  searchtext
            })
        })
        .then(response => response.json())
        .then(data => {
        console.log("checker checky for newdata", this.state.newdata)
         console.log("this is dataaaaaa mama mama", data)
         this.setState({
          newdata: data
        })
        console.log("kaidoded2", this.state.newdata)
    
    
        });
    }

        render()
        {  
            const allstars_row = [];
            for (let i = 0; i < this.state.newdata.length; i++)
                {
                    console.log(i)
                    //console.log("lol wtf", this.props.data[i])
                    allstars_row.push(
                        <AllStarsRow
                        id={this.state.newdata[i].id}
                        username={this.state.newdata[i].username}
                        email={this.state.newdata[i].email}
                        influencer_ornot={this.state.newdata[i].influencer_ornot}
                        freeze_account={this.state.newdata[i].freeze_account}
                        fullname={this.state.newdata[i].profile_fullname}
                        profile_picture={this.state.newdata[i].profile_picture}
                        lengthh={this.state.newdata.length}
                            />
                );
                }
            return(
            <div>
                <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column">
                        <select onChange={this.onSort} id="sortingallstars" class="inputdara">
                            <option value="none">เรียงลำดับ(ทั้งหมด)</option>
                            <option value="pricehighlow">ราคา: สูง-ตํ่า</option>
                            <option value="pricelowhigh">ราคา: ตํ่า-สูง</option>
                            <option value="followershighlow">ผู้ติดตาม: สูง-ตํ่า</option>
                            <option value="followerslowhigh">ผู้ติดตาม: ตํ่า-สูง</option>
                            <option value="numreviews">จํานวนรีวิว</option>
                            <option value="catinflu">ประเภท: อินฟลูเอนเซอร์</option>
                            <option value="catactor">ประเภท: นักแสดง</option>
                            <option value="catathelete">ประเภท: นักกีฬา</option>
                            <option value="catstreamer">ประเภท: สตรีมเมอร์/เกมเมอร์</option>
                            <option value="catothers">ประเภท: อื่นๆ</option>


                        </select>
                        <div class="d-flex justify-content-center">
                        <SearchBar searchtext={this.state.searchtext} oncheckSearch={this.mainSearch}/>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center twooneallstar">{allstars_row}</div>
            </div>

                  
            )
        }
    
    }

    class AllStarsRow extends React.Component {
        constructor(props) {
          super(props);
      
        }
    
            render()
            {  
                let link
                if (this.props.profile_picture != null)
                {
                  link = "https://res.cloudinary.com/ablaze-project/image/upload/f_jpg/" + this.props.profile_picture + ".jpg"
                }
                else
                {
                   link = "https://cdn.discordapp.com/attachments/971813409052041219/978974514404810802/screenshot.png"
                }
                const ininfluencer_link = "/ininfluencer/"+this.props.username

                console.log("fullname", this.props.fullname)
                console.log("username", this.props.username)

                return(
                
                    <div class="sizeofcolumnallstars">

                        <div>
                        <a class="d-flex justify-content-center mb-3 goodmorningallstars" href={ininfluencer_link}> 
                        <div class="d-flex flex-column">
                            <img class="imgindex" width="240" height="300" src={link}></img>
                            <h5 name="posterr" class="indexusername">{this.props.username}</h5> 
                            <h5 class="indexfullname">{this.props.fullname}</h5>
                        </div>

                        </a>
                        <hr class="hrindex"></hr>
                
                        </div>                    
                    </div>
                )
            }
        
        }

    document.addEventListener('DOMContentLoaded', function() {
        fetch(`/allstarsapi`)
        .then(response => response.json())
        .then(data => {        
            console.log("this is data", data)
     
  
        
          ReactDOM.render(<AllStarsTable data={data}/>, document.querySelector('#allstarscover'));
    
  
        });
      
       
      });
      


  