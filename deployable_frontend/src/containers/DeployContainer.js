import React from 'react'
import {Redirect} from 'react-router-dom'
import PersonalInfo from '../components/PersonalInfo'
import Navbar from '../components/Navbar';

export default class DeployContainer extends React.Component{

    state = {
        portfolio: null,
        skills: null
    }

    postAboutToDB =(about) => {
        if(about.length === 0){
            console.log("empty String")
            return
        }
        fetch("http://localhost:3000/users/about", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify({
                about_me: about,
            })
        })
        .then(newPortfolio => newPortfolio.json())
        .then(newPortfolio => {
            console.log(newPortfolio)
            this.setState({portfolio: newPortfolio})
        })
    }

    postSkillToDB = (newSkill) => {
        if(newSkill.length === 0){
            console.log("empty String")
            return
        }
        fetch("http://localhost:3000/users/skills", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify({
                skill_name: newSkill
            })
        })
        .then(response => response.json())
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

        fetch("http://localhost:3000/users/skills", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(skills => this.setState({skills: skills}))
        console.log(this.state.skills)
    }


    render(){
        if(this.props.user === null){
            return (<Redirect to='/'/>)
        }
        return(
            <div>
                <Navbar logout = {this.props.logout}/>
                {
                  this.state.skills != null &&  
                  <PersonalInfo 
                    modifyAboutMe= {this.postAboutToDB}
                    modifySkills= {this.postSkillToDB}
                    portfolio = {this.state.portfolio}
                    skills = {this.state.skills}
                    />
                    
                }
            </div>
        )
    }
}