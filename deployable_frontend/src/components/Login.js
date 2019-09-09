import React, {Component} from 'react'
import Authentication from '../Authentication'
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'

export default class Login extends Component{

    state = {
        email: "",
        password: "",
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const auth = new Authentication();
        const response = auth.login(this.state);
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
                <div className = "form-container ">
                    <form onSubmit = {this.submitHandler} className = "form">
                        <h3><strong>Log in</strong></h3>
                        <p>Enter your details below.</p>
                        <label className = "form-label">Email</label>
                        <input autoFocus placeholder="email@email.com" className = "regular-input" type="email" required name="email" value ={this.state.email} onChange = {this.changeHandler} autoComplete="off"/>
                        <label className = "form-label">Password</label>
                        <input placeholder="password" className = "regular-input" type="password" required name="password" value ={this.state.password} onChange = {this.changeHandler} autoComplete="off"/>
                        <input type="submit" value="Login" />
                        New User? <Link to="/signup">Sign Up</Link> here.
                    </form>
                </div>
            </div>
        )
    }
}