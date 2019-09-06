import React from 'react'
import {Redirect} from 'react-router-dom'
import PersonalInfo from '../components/PersonalInfo'
import Skills from '../components/Skills'
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
// import Blogs from '../components/Blogs';
import {postAboutToDB, postSkillToDB} from '../utilFunctions'
import SearchTopBar from '../components/SearchTopBar';

export default class DeployContainer extends React.Component{

    state = {
        portfolio: null,
        projects: null
    }

    postAbout = (about) => {
            postAboutToDB(about)
    } 


    addSkill = (newSkill) => {
       postSkillToDB(newSkill)
    }

    componentDidMount(){
        fetch("http://localhost:3000/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(portfolio => this.setState({portfolio: portfolio}))

        fetch("http://localhost:3000/users/projects", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(projects => this.setState({projects: projects}))
    }


    render(){
        if(this.props.user === null){
            return (<Redirect to='/'/>)
        }
        return(
            <div>
                <Navbar logout = {this.props.logout} goToDashboard = {this.props.goToDashboard} renderLoginOrHome = {this.props.renderLoginOrHome}/>
                <SearchTopBar/>
                {
                  this.state.portfolio != null &&  
                  <PersonalInfo 
                    modifyAboutMe= {this.postAbout}
                    portfolio = {this.state.portfolio}
                    />
                    
                }
                <Skills 
                    user = {this.props.user}
                    modifySkills = {this.addSkill} 
                    />
                <div className = "pro-blog-container">
                    { this.state.projects != null && 
                    <Projects 
                    user = {this.props.user}
                    projects = {this.state.projects}/>
                    }
                    {/* <Blogs user = {this.props.user}/> */}
                </div>
            </div>
        )
    }
}