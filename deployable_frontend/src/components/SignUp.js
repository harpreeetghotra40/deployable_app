import React, {Component} from 'react'
import Authentication from '../Authentication'
import {Link} from 'react-router-dom'

export default class SignUp extends Component{
    state = {
        name: '',
        email: '',
        password: ''
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
                alert(res.errors.messages[0]);
                return;
            }
            this.props.setCurrentUser(res.jwt);
        })
    }
    render(){
        return(
            <div>
                <form onSubmit = {this.submitHandler}>
                    <label>
                        Name:
                    <input type="text" required name="name" value ={this.state.name} onChange = {this.changeHandler} autoComplete="off"/>
                    </label>
                    <label>
                        Email:
                    <input type="email" required name="email" value ={this.state.email} onChange = {this.changeHandler} autoComplete="off"/>
                    </label>
                    <label>
                        Password:
                    <input type="password" required name="password" value ={this.state.password} onChange = {this.changeHandler} autoComplete="off"/>
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}