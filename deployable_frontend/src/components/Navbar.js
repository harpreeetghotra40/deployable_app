import React, {Component} from 'react'
import '../stylesheets/Navbar.css'

export default class Navbar extends Component{
    render(){
        return(
            <div className = "navbar">
                <button onClick={(event) => this.props.logout(event)}>Logout</button>
            </div>
        )
    }
}