import React from 'react'
import {Redirect} from 'react-router-dom'
import PersonalInfo from '../components/PersonalInfo'
import Skills from '../components/Skills'
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Blogs from '../components/Blogs';
import {postAboutToDB, postSkillToDB} from '../utilFunctions'

export default class DeployContainer extends React.Component{

    state = {
        portfolio: null,
        skills: null,
        projects: null
    }

    postAbout = (about) => {
            postAboutToDB(about)
    } 


    addSkill = (newSkill) => {
       postSkillToDB(newSkill)
    }

    patchSkillsInDB = (deleteSkill) => {
        const newSkillsArray = this.state.skills.filter(skill => skill.skill_name !== deleteSkill)
        this.setState({skills: newSkillsArray})
        fetch("http://localhost:3000/users/skills", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify({
                delete_skill: deleteSkill
            })
        }).then(res => res.json())
        .then(skills => this.setState({skills: skills}))
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

        // fetch("http://localhost:3000/users/skills", {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accepts': 'application/json',
        //         'Authorization': `Bearer ${this.props.user}`
        //     }
        // }).then(res => res.json())
        // .then(skills => this.setState({skills: skills}))

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
                <Navbar logout = {this.props.logout}/>
                {
                  this.state.portfolio != null &&  
                  <PersonalInfo 
                    modifyAboutMe= {this.postAbout}
                    portfolio = {this.state.portfolio}
                    />
                    
                }
                <Skills 
                    user = {this.props.user}
                    skills = {this.state.skills} 
                    modifySkills = {this.addSkill} 
                    deleteSkill = {this.patchSkillsInDB}/>
                <div className = "pro-blog-container">
                    { this.state.projects != null && 
                    <Projects projects = {this.state.projects}/>}
                    <Blogs/>
                </div>
            </div>
        )
    }
}