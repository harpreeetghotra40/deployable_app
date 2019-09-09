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

    patchSkillsInDB = (event) => {
        console.log(event.target.parentElement)
        // event.target.parentElement.remove();
        const deleteSkill = event.target.parentElement.dataset.key;
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
        .then(newSkills => this.setState({skills: newSkills}))
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

    renderSkills = () => {
        return this.state.skills.map(skill => <div className = "skill" key = {skill.skill_name} data-key = {skill.skill_name}>{skill.skill_name}  
                    <span onClick = {this.patchSkillsInDB}className = "delete-skill">&times;</span>
                </div>
            )
    }

    componentDidMount(){
        fetch("http://localhost:3000/users/skills", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(skills => this.setState({skills: skills}))
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
                            this.renderSkills()
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
                    <button className = "change-personal-info-btn" onClick = {() => this.props.setShow()}>Add New Skill</button>
            </form>
            </div>
        )
    }
}