import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            newPostModal: false,
            newPostData: {
                title: "",
                content: "",
                user_id: "",
            },
        };
    }
    loadPost() {
        axios
            .get("http://127.0.0.1:8000/api/posts")
            .then((response) => {
                this.setState({
                    posts: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addPost() {
        axios
            .post("http://127.0.0.1:8000/api/posts", this.state.newPostData)
            .then((response) => {
                let { post } = this.state;
                this.loadPost();
                this.setState({
                    posts,
                    newPostModal: false,
                    newPostData: {
                        title: "",
                        content: "",
                        user_id: "",
                    },
                });
            });
    }
    componentWillMount(){
        
    }
    render() {
        return (
            <div className="container">
                <h1>Example 4</h1>
            </div>
        );
    }
}
if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
