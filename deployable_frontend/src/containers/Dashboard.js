import React, {Component} from 'react'
import {Alert, Button} from 'react-bootstrap'
import DeveloperProjects from '../components/DeveloperProjects'
import Navbar from '../components/Navbar'
import SearchTopBar from '../components/SearchTopBar'
import DevelopersContainer from '../components/DevelopersContainer';
import '../stylesheets/App.css'

export default class Dashboard extends Component{
    state = {
        show: false,
    }
    render(){
        return(
            <div>
                <Navbar logout = {this.props.logout} goToDashboard = {this.props.goToDashboard} renderLoginOrHome = {this.props.renderLoginOrHome}/>
                <SearchTopBar/>
                <DevelopersContainer user = {this.props.user} />
                <DeveloperProjects user = {this.props.user}/>
            </div>
        )
    }
}