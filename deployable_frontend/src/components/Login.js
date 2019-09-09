import React, {Component} from 'react'
import Authentication from '../Authentication'
import {Link} from 'react-router-dom'

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
                    Deployable
                    <img alt="" src="../images/logo.png"/>
                </div>
                <div className = "form-container ">
                    <form onSubmit = {this.submitHandler} className = "form">
                        <h1><strong>Log in</strong></h1>
                        <p>Enter your details below.</p>
                        <input placeholder="email@email.com" className = "regular-input" type="email" required name="email" value ={this.state.email} onChange = {this.changeHandler} autoComplete="off"/>
                        <input placeholder="password" className = "regular-input" type="password" required name="password" value ={this.state.password} onChange = {this.changeHandler} autoComplete="off"/>
                        <input type="submit" value="Login" />
                        New User? <Link to="/signup">Sign Up</Link> here.
                    </form>
                </div>
            </div>
        )
    }
}