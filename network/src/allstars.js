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

class AllStarsTable extends React.Component {
    constructor(props) {
      super(props);
  
    }

        render()
        {  
            const allstars_row = [];
            for (let i = 0; i < this.props.data.length; i++)
                {
                    console.log(i)
                    //console.log("lol wtf", this.props.data[i])
                    allstars_row.push(
                        <AllStarsRow
                        id={this.props.data[i].id}
                        username={this.props.data[i].influencer}
                        email={this.props.data[i].email}
                        influencer_ornot={this.props.data[i].influencer_ornot}
                        freeze_account={this.props.data[i].freeze_account}
                        fullname={this.props.data[i].profile_fullname}
                        profile_picture={this.props.data[i].profile_picture}
                        lengthh={this.props.data.length}
                            />
                );
                }
            return(
            <div>
                <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column">
                        <h1>yo wassup</h1>
                        <h1>arrigato</h1>
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
                        <a name="goodmorning" class="goodmorning mb-3" href={ininfluencer_link}> 
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
      


  