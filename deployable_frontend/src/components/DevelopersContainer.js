import React, {Component} from 'react'
import DeveloperProjects from './DeveloperProjects'
import SearchTopBar from './SearchTopBar'
import '../stylesheets/DevelopersContainer.css'

export default class DevelopersContainer extends Component{
    state = {
        developers: null,
        projects: null,
        searchQuery: null,
        displayUsersProjects: null,
        devDesc: null
    }

    setSearchQuery = (event, query) => {
        event.preventDefault();
        if(query === "" || query === " ")
        {
            this.setState({searchQuery: null})
            this.getAllDevelopers()
        }else{
            this.setState({searchQuery: query})
            this.getDevelopers(query);
        }
        
        
    }

    getDevelopers = (query) => {
        fetch(`http://localhost:3000/users/developers?skills=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(developers => {
            this.setState({developers: developers[0]})
        })
    }

    getAllDevelopers = () => {
        fetch(`http://localhost:3000/users/developers?skills=${""}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(developers => {
            this.setState({developers: developers})
        })
    }

    showUserProjects = (event) => {
        this.setState({displayUsersProjects: event.target.innerText})
        const devDesc = this.state.developers.find(dev => {
            return dev.name === event.target.innerText;
        })
        this.setState({devDesc: devDesc})
        document.querySelector('.developers-main-container').childNodes.forEach(container => {
            if(container.classList.value.includes('focus')){
                container.classList.remove('focus')
            }
        })
        event.target.parentElement.classList.add('focus');
    }

    renderDevelopers = () => {
        return this.state.developers.map(developer => {
            return  <div className = "developer-container">
                        <p className = "developer-name" onClick = {(event) => this.showUserProjects(event)}>{developer.name}</p>
                        <div className = "developer-profile-links">
                           <a href={developer.github_profile_link}><img alt ="" src="https://image.flaticon.com/icons/svg/25/25231.svg" /></a> 
                           <a href={"mailto:" + developer.email}><img alt ="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Aiga_mail.svg/1024px-Aiga_mail.svg.png" /></a>
                        </div>
                        <p className = "developer-title">Full Stack Developer</p>
                    </div>
        })
    }

    componentDidMount(){
        this.getAllDevelopers();
    }
    render(){
        return(
            <>
            <SearchTopBar setQuery = {this.setSearchQuery}/>
            {
                this.state.searchQuery !== null && <p className = "search-query">Search skillset ...  {this.state.searchQuery}</p>
            }
            <div className = "developers-main-container">
                {
                    this.state.developers !== null && this.renderDevelopers()
                }
            </div>
            <DeveloperProjects 
                user = {this.props.user} 
                query = {this.state.displayUsersProjects}
                devDesc = {this.state.devDesc}
            />
            </>
        )
    }
}