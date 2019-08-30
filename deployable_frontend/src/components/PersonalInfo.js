import React from 'react';
import '../stylesheets/PersonalInfo.css'



export default class PersonalInfo extends React.Component{
    
    state = {
        aboutMe: ''
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addAboutMe = (event) => {
        event.preventDefault();
        this.props.modifyAboutMe(this.state.aboutMe, this.props.user)
        this.setState({aboutMe: this.state.aboutMe})
    }

    componentDidMount(){
        this.setState({
            aboutMe: this.props.portfolio.about_me,
        }) 
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
                    <button className = "change-personal-info-btn">Save</button>
                </form>
            </div>
        )
    }
}