import React, {Component} from 'react'
import '../stylesheets/Navbar.css'

export default class Navbar extends Component{
    render(){
        return(
            <div className = "navbar">
                <button className = "logout-btn" onClick={(event) => this.props.logout(event)}>Logout</button>
            </div>
        )
    }
}