import React from 'react';
import '../stylesheets/PersonalInfo.css'



export default class PersonalInfo extends React.Component{
    
    state = {
        aboutMe: '',
        skillInput: '',
        skills: []
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addSkill = (event) => {
        event.preventDefault();
        // const newSkillArray = [...this.state.skills , this.state.skillInput]
        this.props.modifySkills(this.state.skillInput)
        const skillsContainer = document.querySelector('.skills-container');
        const newSkill = document.createElement('div')
        newSkill.className = "skill";
        newSkill.innerText = (this.state.skillInput).toLowerCase();
        const closeBtn = document.createElement('span')
        closeBtn.innerHTML = "&times;"
        newSkill.appendChild(closeBtn)
        skillsContainer.appendChild(newSkill)
        this.setState({skillInput: ''})
        // this.setState({skills: newSkillArray})
    }

    addAboutMe = (event) => {
        event.preventDefault();
        this.props.modifyAboutMe(this.state.aboutMe)
        this.setState({aboutMe: this.state.aboutMe})
    }

    componentDidMount(){
        const textarea = document.querySelector('.about-me-textarea');
        textarea.style.height = '10em';
        this.setState({aboutMe: this.props.portfolio.about_me, 
            skills: this.props.portfolio.skills 
            }) 
            console.log(this.props.portfolio.skills)
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
                    {   this.state.skills.length !== 0 &&
                        <div className = "skills-container">
                        {this.state.skills.map(skill => <div className = "skill">{skill}  <span className = "delete-skill">&times;</span></div>)}
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