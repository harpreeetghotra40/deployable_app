import React from 'react';

export default class EnterPersonalInfo extends React.Component{
    state = {
        aboutMe: '',
        skillInput: ''
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addSkill = (event) => {
        event.preventDefault();
        // const newSkillArray = [...this.state.skills , this.state.skillInput]
        this.props.modifySkills(this.state.skillInput)
        this.setState({skillInput: ''})
        // this.setState({skills: newSkillArray})
    }

    addAboutMe = (event) => {
        event.preventDefault();
        this.props.modifyAboutMe(this.state.aboutMe)
        this.setState({aboutMe: ''})
    }
    render(){
        return(
            <div>
                <form onSubmit = {this.addAboutMe}>
                    <label>
                        About me:
                        <textarea
                        name ="aboutMe" 
                        value = {this.state.aboutMe} 
                        onChange ={this.changeHandler}
                        />
                    </label>
                    <button>Save</button>
                </form>
                <form onSubmit ={this.addSkill}>
                    <label>
                        Skills:
                        <input 
                        name ="skillInput" 
                        value = {this.state.skillInput} 
                        onChange ={this.changeHandler}
                        />
                    </label>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}