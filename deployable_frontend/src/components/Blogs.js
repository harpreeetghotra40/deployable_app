import React,{Component} from 'react'
import '../stylesheets/Blogs.css'

export default class Blogs extends Component{
    render(){
        return(
            <div className="blogs-main-container">
                <p className = "blog-container-heading">Blogs</p>
                <div className ="add-new-blog-btn">&#x2b;</div>
                <div className="blogs-container" >
                    <div className="blog">
                        <p className = "blog-name">Blog Name</p>
                    </div>
                    <div className="blog">
                        <p className = "blog-name">Blog Name</p>
                    </div>
                    <div className="blog">
                        <p className = "blog-name">Blog Name</p>
                    </div>
                    <div className="blog">
                        <p className = "blog-name">Blog Name</p>
                    </div>
                </div>
            </div>
        )
    }
}