import React from 'react'
import '../stylesheets/PersonalInfo.css'

export default class Skills extends React.Component{

    state = {
        skillInput: '',
        skills: null
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    deleteSkill = (event) => {
        this.props.deleteSkill(event.target.parentElement.dataset.key)
        event.target.parentElement.remove();
    }

    addSkill = (event) => {
        event.preventDefault();
        const newArr = this.state.skills.map(skill => skill.skill_name)
        if(!newArr.includes(this.state.skillInput.toLowerCase()))
        {
            const newSkillArray = [...this.state.skills , {skill_name: this.state.skillInput}]
            this.props.modifySkills(this.state.skillInput)
            this.setState({skills: newSkillArray})
        }
        this.setState({skillInput: ''})
        
    }

    componentDidMount(){
        this.setState({
            skills: this.props.skills
        }) 
        // console.log(this.props.skills)
    }

    render(){
        return(
            <div className = "main-skills-container">
            <form onSubmit ={this.addSkill}>
                <label className = "form-label">
                    Skills
                </label>
                    {   
                        this.state.skills !== null &&
                        <div className = "skills-container">
                        {
                            this.state.skills.map(skill => <div className = "skill" key = {skill.skill_name} data-key = {skill.skill_name}>{skill.skill_name}  
                            <span onClick = {this.deleteSkill}className = "delete-skill">&times;</span></div>
                            )
                        }
                        </div>
                    }
                        <input 
                        name ="skillInput" 
                        value = {this.state.skillInput} 
                        onChange ={this.changeHandler}
                        placeholder = "add new skill..."
                        className = "add-skill-input"
                        />
                    <button className = "change-personal-info-btn">Add New Skill</button>
            </form>
            </div>
        )
    }
}