import React, {Component} from 'react'
import Authentication from '../Authentication'
import {Link} from 'react-router-dom'
import '../stylesheets/SignUp.css'
import { Redirect } from 'react-router-dom'

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
            <div>
                
                <form onSubmit = {this.submitHandler} className = "form">
                    <h1>Sign Up</h1>
                    <input className = "regular-input" placeholder="Full Name" type="text" required name="name" value ={this.state.name} onChange = {this.changeHandler} autoComplete="off"/>    
                    <input className = "regular-input" placeholder="email@email.com" type="email" required name="email" value ={this.state.email} onChange = {this.changeHandler} autoComplete="off"/>
                    <input className = "regular-input" placeholder="password" type="password" required name="password" value ={this.state.password} onChange = {this.changeHandler} autoComplete="off"/>
                    <input className = "regular-input" placeholder="GitHub Profile Link" type="text" required name="github_profile_link" value ={this.state.github_profile_link} onChange = {this.changeHandler} autoComplete="off"/>
                    <input className = "regular-input" placeholder="Full Name" type="submit" value="SignUp" />
                    or <Link to="/login">Login</Link> instead.
                </form>
            </div>
        )
    }
}