import React from 'react'
import {Redirect} from 'react-router-dom'
import EnterPersonalInfo from '../components/EnterPersonalInfo'

export default class DeployContainer extends React.Component{
    state = {
        skills: [],
        aboutMe: ''
    }

    postAboutToDB =(about) => {
        if(about.length === 0){
            console.log("empty String")
            return
        }
        fetch("http://localhost:3000/portfolio/about", {
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
        .then(newAbout => newAbout.json())
        .then(newAbout => this.setState({aboutMe: newAbout}))
    }

    postSkillToDB = (newSkill) => {
        if(newSkill.length === 0){
            console.log("empty String")
            return
        }
        fetch("http://localhost:3000/portfolio/skills", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify({
                skill: newSkill,
            })
        })
        .then(skills => skills.json())
        .then(skills => this.setState({skills: skills}))
    }


    render(){
        if(this.props.user === null){
            return (<Redirect to='/'/>)
        }
        return(
            <div>
                <button onClick={(event) => this.props.logout(event)}>Logout</button>
                <EnterPersonalInfo 
                    modifyAboutMe= {this.postAboutToDB}
                    modifySkills= {this.postSkillToDB}
                />
                <div>{console.log(this.state.aboutMe)}</div>
            </div>
        )
    }
}