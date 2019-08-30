import React,{Component} from 'react'
import '../stylesheets/Projects.css'

export default class Projects extends Component{
    state = {
        projects: ''
    }
    render(){
        return(
            <div className="projects-main-container">
                <p className = "project-container-heading">Projects</p>
                <div className ="add-new-project-btn">&#x2b;</div>

                <div className="projects-container" >
                    <div className="project">
                        <p className = "project-name">Project Name</p>
                    </div>
                    <div className="project">
                        <p className = "project-name">Project Name</p>
                    </div>
                    <div className="project">
                        <p className = "project-name">Project Name</p>
                    </div>
                </div>

                
            </div>
        )
    }
}