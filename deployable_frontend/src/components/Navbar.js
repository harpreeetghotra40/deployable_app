import React, {Component} from 'react'
import '../stylesheets/Navbar.css'

export default class Navbar extends Component{
    render(){
        return(
            <div className = "deployable-navbar">
                <button className = "logout-btn" onClick={(event) => this.props.renderLoginOrHome(event)}>Home</button>
                <button className = "logout-btn" onClick={(event) => this.props.goToDashboard(event)}>Dashboard</button>
                <button className = "logout-btn" onClick={(event) => this.props.logout(event)}>Logout</button>
            </div>
        )
    }
}