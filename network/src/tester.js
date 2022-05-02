var postoption = ""
        if (document.querySelector('#typeofpage').value == "request")
        {
            //this is before influencer posted video
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div>
                    <div class="d-flex justify-content-center">
                        <label htmlFor="edit_post_txt">Click to change introduction video: </label>
                     </div>
                    <div class="custom-file">
                        <div class="d-flex justify-content-center">
                            <input type="file" onChange={this.chooseFileVideo} class="editintrovid" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <video hidden id="testervideo" width="320" height="240" controls>
                            <source src=""></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <input name="" type="hidden" id="sendingvideoidback"></input>
                    <input id="sendingbacktorequest"></input>
                    <button class="btn btn-primary" onClick={this.submitSave} id="submitrequested">Post</button>
                </div>
            }
            else
            {
                //this is after influencer posted video
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"
                if (this.props.data["data"][0].reviewcompleted != true)
                {
                    postoption = 
                    <div>
                        <h1>DONE</h1>
                        <video id="testervideo" width="320" height="240" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>


                        <h1>What you wrote: {this.props.data["forpostdata"][0]}</h1>
                        <h3>No reviews from customer yet</h3>
                    </div>
                }
                else
                {
                   // <img id="testerimage" alt="ye" width="800" height="500"></img>

                    postoption = 
                    <div>
                        <h1>DONE</h1>
                        <video id="testervideo" width="320" height="240" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>


                        <h1>What you wrote: {this.props.data["forpostdata"][0]}</h1>
                        <h3>Customer Review: {this.props.data["reviewvalue"]}</h3>
                    </div>
                }
            }
        }
        else
        {
            if (this.props.data["data"][0].completed != true)
            {
                postoption = 
                <div>
                    <h1>Waiting for influencer</h1>
                </div>
            }
            else
            {
                let link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4"

                if (this.props.data["data"][0].reviewcompleted != true)
                {
                    postoption = 
                    <div>
                        <h1>Done</h1>
                        <video id="testervideo" width="320" height="240" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>


                        <h2>Message from influencer: {this.props.data["forpostdata"][0]}</h2>
                        <input id="typeforreview"></input>
                        <select id="selectforreview">
                             <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>
                        <button onClick={this.submitReview} class="btn btn-primary">Submit</button>
                    </div>
                }
                else
                {
                    postoption = 
                    <div>
                        <h1>Done</h1>
                        <video id="testervideo" width="320" height="240" controls>
                            <source src={link}></source>
                            Your browser does not support the video tag.
                        </video>
                        <button id="savethelink" value={link} onClick={this.saveUrl}class="btn btn-primary">Copy Video to Post somewhere!</button>


                        <h2>Message from influencer: {this.props.data["forpostdata"][0]}</h2>
                        <h1>Ur Review</h1>
                        <h3>{this.props.data["reviewvalue"]}</h3>
                    </div>
                }
                
            }
          
        }