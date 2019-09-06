import React, {Component} from 'react'
import DeveloperProjects from '../components/DeveloperProjects'
import Navbar from '../components/Navbar'
import SearchTopBar from '../components/SearchTopBar'
import DevelopersContainer from '../components/DevelopersContainer';

export default class Dashboard extends Component{
    state = {

    }

    render(){
        return(
            <div>
                <Navbar logout = {this.props.logout} goToDashboard = {this.props.goToDashboard} renderLoginOrHome = {this.props.renderLoginOrHome}/>
                <SearchTopBar/>
                <DevelopersContainer user = {this.props.user}/>
                <DeveloperProjects user = {this.props.user}/>
            </div>
        )
    }
}