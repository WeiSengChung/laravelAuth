import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Modal,
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
            loginModal: false,
            loginData: {
                email: "",
                password: "",
            },
            loginResponseData: {},
            newPostData: {
                title: "",
                content: "",
                user_id: "",
            },
            updatePostModal: false,
            updatePostData: {
                id: "",
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
            .post("http://127.0.0.1:8000/api/post", this.state.newPostData)
            .then((response) => {
                this.loadPost();
                let { posts } = this.state;
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
    updatePost() {
        axios
            .put(
                "http://127.0.0.1:8000/api/post/" +
                    this.state.updatePostData.id,
                this.state.updatePostData
            )
            .then((response) => {
                this.loadPost();
                let { posts } = this.state;
                this.setState({
                    posts,
                    updatePostModal: false,
                    updatePostData: {
                        id: "",
                        title: "",
                        content: "",
                        user_id: "",
                    },
                });
            });
    }

    deletePost(id) {
        if (confirm("Do you want delete this Post?")) {
            axios
                .delete("http://127.0.0.1:8000/api/post/" + id, {})
                .then((response) => {
                    this.loadPost();
                });
        }
    }

    login() {
        axios
            .post("http://127.0.0.1:8000/api/auth/login", this.state.loginData)
            .then((response) => {
                let { loginResponseData } = this.state;
                loginResponseData = response.data;
                this.setState({
                    loginResponseData,
                    loginModal: false,
                    loginData: {
                        email: "",
                        password: "",
                    },
                });
                this.loadPost();
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred during login.");
            });
    }

    componentWillMount() {
        if (!this.state.loginResponseData?.access_token) {
            this.toggleLoginModal();
        } else this.loadPost();
    }
    toggleNewPostModal() {
        this.setState({
            newPostModal: !this.state.newPostModal,
        });
    }
    toggleLoginModal() {
        this.setState({
            loginModal: !this.state.loginModal,
        });
    }
    toggleUpdatePostModal() {
        this.setState({
            updatePostModal: !this.state.updatePostModal,
        });
    }
    render() {
        let posts = this.state.posts.map((post) => {
            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                        <Button
                            color="success"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                                this.setState({
                                    updatePostModal: true,
                                    updatePostData: {
                                        id: post.id,
                                        title: post.title,
                                        content: post.content,
                                        user_id: post.user_id,
                                    },
                                });
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            className="mr-2"
                            onClick={() => this.deletePost(post.id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="container">
                <Button
                    color="primary"
                    onClick={this.toggleLoginModal.bind(this)}
                >
                    Login
                </Button>
                <Button
                    color="primary"
                    onClick={this.toggleNewPostModal.bind(this)}
                >
                    Add Post
                </Button>
                <Modal
                    isOpen={this.state.newPostModal}
                    toggle={this.toggleNewPostModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleNewPostModal.bind(this)}>
                        {" "}
                        Add New Post
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.newPostData.title}
                                onChange={(e) => {
                                    let { newPostData } = this.state;
                                    newPostData.title = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.newPostData.content}
                                onChange={(e) => {
                                    let { newPostData } = this.state;
                                    newPostData.content = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.newPostData.user_id}
                                onChange={(e) => {
                                    let { newPostData } = this.state;
                                    newPostData.user_id = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.addPost.bind(this)}
                        >
                            Add Post{" "}
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={this.toggleNewPostModal.bind(this)}
                        >
                            {" "}
                            Cancel{" "}
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.updatePostModal}
                    toggle={this.toggleUpdatePostModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleUpdatePostModal.bind(this)}>
                        {" "}
                        Update Post
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.updatePostData.title}
                                onChange={(e) => {
                                    let { updatePostData } = this.state;
                                    updatePostData.title = e.target.value;
                                    this.setState({ updatePostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.updatePostData.content}
                                onChange={(e) => {
                                    let { updatePostData } = this.state;
                                    updatePostData.content = e.target.value;
                                    this.setState({ updatePostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.updatePostData.user_id}
                                onChange={(e) => {
                                    let { updatePostData } = this.state;
                                    updatePostData.user_id = e.target.value;
                                    this.setState({ updatePostData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.updatePost.bind(this)}
                        >
                            Update Post{" "}
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={this.toggleUpdatePostModal.bind(this)}
                        >
                            {" "}
                            Cancel{" "}
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.loginModal}
                    toggle={this.toggleLoginModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleLoginModal.bind(this)}>
                        {" "}
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.loginData.email}
                                onChange={(e) => {
                                    let { loginData } = this.state;
                                    loginData.email = e.target.value;
                                    this.setState({ loginData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                value={this.state.loginData.password}
                                onChange={(e) => {
                                    let { loginData } = this.state;
                                    loginData.password = e.target.value;
                                    this.setState({ loginData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.login.bind(this)}>
                            Login{" "}
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={this.toggleLoginModal.bind(this)}
                        >
                            {" "}
                            Cancel{" "}
                        </Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{posts}</tbody>
                </Table>
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
