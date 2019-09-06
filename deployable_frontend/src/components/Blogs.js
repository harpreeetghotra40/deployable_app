import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import {postBlogToDB} from '../utilFunctions'
import '../stylesheets/Blogs.css'

export default class Blogs extends Component{

    state = {
        modalShow: false,
        blogs: null,
        title:'',
        imageLink:'',
        blogLink: ''
    }

    renderBlogs = () => {
        return this.state.blogs.map(blog => 
            <div className = "blog" key = {blog.title} data-key = {blog.title}>
                <img src = {blog.image_link} alt ="" className = "project-image"/>
                <p className = "blog-name">{blog.title}</p>
            </div> 
            )
    }

    addBlogToState = (blog) => {
        if(blog.blogName && blog.BlogName.length > 0){
          const newBlogArray = [...this.state.blogs, blog];
          this.setState({blogs: newBlogArray})
        }
        
      }

    handleClose = (event) => {
        if(event){
          event.preventDefault();
        }
        
            const newBlog = {
                title: this.state.title,
                blog_link: this.state.blogLink,
                image_link: this.state.imageLink,
            }
            this.addBlogToState(newBlog)
            postBlogToDB(newBlog)
        this.setState({modalShow: false})
    }
  
      handleShow = () => {
          this.createBlogModal();
          this.setState({modalShow: true})
      };
  
      changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
      }

    createBlogModal() {
      
        return (
          <>
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Yay, New Project!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form  onSubmit={this.handleClose}>
                <label>Name</label>
                <input className = "project-name-input"
                placeholder = "Blog Title"
                name = "title"
                required
                value = {this.state.title}
                onChange ={this.changeHandler}
                />
                <label>Link</label>
                <input className = "project-name-input"
                placeholder = "Blog link"
                name="blogLink"
                required
                value = {this.state.blogLink}
                onChange ={this.changeHandler}
                />
                <label>Image</label>
                <input className = "project-name-input"
                placeholder = "Image Link"
                name ="imageLink"
                required
                value = {this.state.imageLink}
                onChange ={this.changeHandler}
                />
                <input type="submit" className = "modal-create-project-btn"
                  value ="Add Blog"
                />
              </form>
              </Modal.Body>
            </Modal>
          </>
        );
      }
    
    componentDidMount(){
        fetch("http://localhost:3000/users/blogs", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(blogs => this.setState({blogs: blogs}))
    }

    render(){
        return(
            <div className="blogs-main-container">
                {this.createBlogModal()}
                <p className = "blog-container-heading">Blogs</p>
                <div className ="add-new-blog-btn" onClick={this.handleShow}>&#x2b;</div>
                <div className="blogs-container" >
                {
                    this.state.blogs !== null ? this.renderBlogs(): null
                }
                </div>
            </div>
        )
    }
}