import React, {Component} from 'react'
import '../stylesheets/DevelopersContainer.css'

export default class DevelopersContainer extends Component{
    state = {
        developers: null
    }

    renderDevelopers = () => {
        return this.state.developers.map(developer => {
            return  <div className = "developer-container">
                        <p className = "developer-name">{developer.name}</p>
                        <div className = "developer-profile-links">
                            <img alt ="" src="https://image.flaticon.com/icons/svg/25/25231.svg" />
                            <img alt ="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Aiga_mail.svg/1024px-Aiga_mail.svg.png" />
                        </div>
                        <p className = "developer-title">Full Stack Developer</p>
                    </div>
        })
    }

    componentDidMount(){
        fetch("http://localhost:3000/users/developers", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(developers => this.setState({developers: developers}))
    }
    render(){
        return(
            <div className = "developers-main-container">
                {
                    this.state.developers !== null && this.renderDevelopers()
                }
            </div>
        )
    }
}