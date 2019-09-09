import React, {Component} from 'react'
import Authentication from '../Authentication'
import {Link} from 'react-router-dom'
import '../stylesheets/SignUp.css'
import logo from '../images/logo.png'

export default class SignUp extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        github_profile_link:''
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const auth = new Authentication();
        const response = auth.signup(this.state);
        response.then(res => {
            if (res.errors !== undefined) {
                alert(res.errors.messages);
                return;
            }
            this.props.setCurrentUser(res.jwt);
        })
    }

    render(){
        return(
            <div className = "login-main-container row">
                <div className = "app-info-container ">
                    <img alt="" src={logo} className = "logo-image"/>
                    <p>Deployable</p>
                </div>
                <form onSubmit = {this.submitHandler} className = "form">
                    <h3><strong>Sign up</strong></h3>
                    <br></br>
                    <label className = "form-label">Full Name</label>
                    <input autoFocus className = "regular-input" placeholder="Full Name" type="text" required name="name" value ={this.state.name} onChange = {this.changeHandler} autoComplete="off"/>    
                    <label className = "form-label">Email</label>
                    <input className = "regular-input" placeholder="email@email.com" type="email" required name="email" value ={this.state.email} onChange = {this.changeHandler} autoComplete="off"/>
                    <label className = "form-label">Password</label>
                    <input className = "regular-input" placeholder="password" type="password" required name="password" value ={this.state.password} onChange = {this.changeHandler} autoComplete="off"/>
                    <label className = "form-label">GitHub</label>
                    <input className = "regular-input" placeholder="GitHub Profile Link" type="text" required name="github_profile_link" value ={this.state.github_profile_link} onChange = {this.changeHandler} autoComplete="off"/>
                    <input className = "regular-input" placeholder="Full Name" type="submit" value="SignUp" />
                    or <Link to="/login">Login</Link> instead.
                </form>
            </div>
        )
    }
}