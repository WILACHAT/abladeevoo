var postoption = "";
if (document.querySelector('#typeofpage').value == "request") {
    //this is before influencer posted video
    if (this.props.data["data"][0].completed != true) {
        postoption = React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { "class": "d-flex justify-content-center" },
                React.createElement(
                    "label",
                    { htmlFor: "edit_post_txt" },
                    "Click to change introduction video: "
                )
            ),
            React.createElement(
                "div",
                { "class": "custom-file" },
                React.createElement(
                    "div",
                    { "class": "d-flex justify-content-center" },
                    React.createElement("input", { type: "file", onChange: this.chooseFileVideo, "class": "editintrovid", id: "inputGroupFile01", "aria-describedby": "inputGroupFileAddon01" })
                )
            ),
            React.createElement(
                "div",
                { "class": "d-flex justify-content-center" },
                React.createElement(
                    "video",
                    { hidden: true, id: "testervideo", width: "320", height: "240", controls: true },
                    React.createElement("source", { src: "" }),
                    "Your browser does not support the video tag."
                )
            ),
            React.createElement("input", { name: "", type: "hidden", id: "sendingvideoidback" }),
            React.createElement("input", { id: "sendingbacktorequest" }),
            React.createElement(
                "button",
                { "class": "btn btn-primary", onClick: this.submitSave, id: "submitrequested" },
                "Post"
            )
        );
    } else {
        //this is after influencer posted video
        var link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";
        if (this.props.data["data"][0].reviewcompleted != true) {
            postoption = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "DONE"
                ),
                React.createElement(
                    "video",
                    { id: "testervideo", width: "320", height: "240", controls: true },
                    React.createElement("source", { src: link }),
                    "Your browser does not support the video tag."
                ),
                React.createElement(
                    "button",
                    { id: "savethelink", value: link, onClick: this.saveUrl, "class": "btn btn-primary" },
                    "Copy Video to Post somewhere!"
                ),
                React.createElement(
                    "h1",
                    null,
                    "What you wrote: ",
                    this.props.data["forpostdata"][0]
                ),
                React.createElement(
                    "h3",
                    null,
                    "No reviews from customer yet"
                )
            );
        } else {
            // <img id="testerimage" alt="ye" width="800" height="500"></img>

            postoption = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "DONE"
                ),
                React.createElement(
                    "video",
                    { id: "testervideo", width: "320", height: "240", controls: true },
                    React.createElement("source", { src: link }),
                    "Your browser does not support the video tag."
                ),
                React.createElement(
                    "button",
                    { id: "savethelink", value: link, onClick: this.saveUrl, "class": "btn btn-primary" },
                    "Copy Video to Post somewhere!"
                ),
                React.createElement(
                    "h1",
                    null,
                    "What you wrote: ",
                    this.props.data["forpostdata"][0]
                ),
                React.createElement(
                    "h3",
                    null,
                    "Customer Review: ",
                    this.props.data["reviewvalue"]
                )
            );
        }
    }
} else {
    if (this.props.data["data"][0].completed != true) {
        postoption = React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Waiting for influencer"
            )
        );
    } else {
        var _link = "https://res.cloudinary.com/ablaze-project/video/upload/f_mp4/" + this.props.data["forpostdata"][1] + ".mp4";

        if (this.props.data["data"][0].reviewcompleted != true) {
            postoption = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Done"
                ),
                React.createElement(
                    "video",
                    { id: "testervideo", width: "320", height: "240", controls: true },
                    React.createElement("source", { src: _link }),
                    "Your browser does not support the video tag."
                ),
                React.createElement(
                    "button",
                    { id: "savethelink", value: _link, onClick: this.saveUrl, "class": "btn btn-primary" },
                    "Copy Video to Post somewhere!"
                ),
                React.createElement(
                    "h2",
                    null,
                    "Message from influencer: ",
                    this.props.data["forpostdata"][0]
                ),
                React.createElement("input", { id: "typeforreview" }),
                React.createElement(
                    "select",
                    { id: "selectforreview" },
                    React.createElement(
                        "option",
                        { value: "1" },
                        "1"
                    ),
                    React.createElement(
                        "option",
                        { value: "2" },
                        "2"
                    ),
                    React.createElement(
                        "option",
                        { value: "3" },
                        "3"
                    ),
                    React.createElement(
                        "option",
                        { value: "4" },
                        "4"
                    ),
                    React.createElement(
                        "option",
                        { value: "5" },
                        "5"
                    )
                ),
                React.createElement(
                    "button",
                    { onClick: this.submitReview, "class": "btn btn-primary" },
                    "Submit"
                )
            );
        } else {
            postoption = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Done"
                ),
                React.createElement(
                    "video",
                    { id: "testervideo", width: "320", height: "240", controls: true },
                    React.createElement("source", { src: _link }),
                    "Your browser does not support the video tag."
                ),
                React.createElement(
                    "button",
                    { id: "savethelink", value: _link, onClick: this.saveUrl, "class": "btn btn-primary" },
                    "Copy Video to Post somewhere!"
                ),
                React.createElement(
                    "h2",
                    null,
                    "Message from influencer: ",
                    this.props.data["forpostdata"][0]
                ),
                React.createElement(
                    "h1",
                    null,
                    "Ur Review"
                ),
                React.createElement(
                    "h3",
                    null,
                    this.props.data["reviewvalue"]
                )
            );
        }
    }
}