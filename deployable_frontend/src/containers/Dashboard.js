import React, {Component} from 'react'
import Navbar from '../components/Navbar'
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
                <DevelopersContainer user = {this.props.user} />
            </div>
        )
    }
}