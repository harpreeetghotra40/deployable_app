import React from 'react';
import '../stylesheets/PersonalInfo.css'



export default class PersonalInfo extends React.Component{
    
    state = {
        aboutMe: '',
        skillInput: '',
        skills: null
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addSkill = (event) => {
        event.preventDefault();
        const newSkillArray = [...this.state.skills , {skill_name: this.state.skillInput}]
        this.props.modifySkills(this.state.skillInput)
        this.setState({skills: newSkillArray})
    }

    addAboutMe = (event) => {
        event.preventDefault();
        this.props.modifyAboutMe(this.state.aboutMe)
        this.setState({aboutMe: this.state.aboutMe})
    }

    componentDidMount(){
        this.setState({
            aboutMe: this.props.portfolio.about_me,
            skills: this.props.skills
        }) 
        // console.log(this.props.skills)
    }
    
    render(){
        return(
            <div className ="personal-info-container">
                <form onSubmit = {this.addAboutMe} className = "info-form">
                    <label className = "form-label">
                        Hey There,
                    </label>
                        <textarea
                        name ="aboutMe" 
                        value = {this.state.aboutMe} 
                        onChange ={this.changeHandler}
                        className = "about-me-textarea"
                        />
                    
                    <button>Save</button>
                </form>
                <form onSubmit ={this.addSkill}>
                    <label className = "form-label">
                        Skills
                    </label>
                    {   
                        this.state.skills !== null &&
                        <div className = "skills-container">
                        {this.state.skills.map(skill => <div className = "skill" key = {skill.skill_name}>{skill.skill_name}  <span className = "delete-skill">&times;</span></div>)}
                        </div>
                    }
                        <input 
                        name ="skillInput" 
                        value = {this.state.skillInput} 
                        onChange ={this.changeHandler}
                        />
                    <button>Add New Skill</button>
                </form>
            </div>
        )
    }
}