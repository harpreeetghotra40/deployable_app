import React,{Component} from 'react'
import { Modal} from 'react-bootstrap';
import {postProjectToDB, editDescInDB} from '../utilFunctions'
import '../stylesheets/Projects.css'

export default class Projects extends Component{
    state = {
        projects: null,
        modalShow: false,
        projectModal: false,
        displayThisProject: null,
        projectName: '',
        gitHubLink:'',
        imageLink:'',
        projectDescription:'',
        editProjectDescription:''
    }

    renderProjects = () => {
        return this.state.projects.map(project => 
            <div className = "project" key = {project.project_name}>
                <img src = {project.image_link} alt ="" className = "project-image" />
                <p className = "project-name" onClick = {this.displayProject} data-key = {project.project_name}>{project.project_name}</p>
            </div> 
            )
    }

    displayProject = (event) => {
      const projectName = event.target.dataset.key;
      fetch(`http://localhost:3000/projects/${projectName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(project => this.displayProjectShow(project))
    }

    displayProjectShow = (project) => {
      this.setState({displayThisProject: project})
      this.setState({projectModal: true})
    }

    editDescriptionHandler = (event) => {
      event.preventDefault();
      const newDesc = document.querySelector(".display-project-desc").value
      editDescInDB(this.state.displayThisProject, newDesc)
    }

    displayProjectModal = () =>{
      const project = this.state.displayThisProject;
     return(
        <>
        <Modal
        size="lg"
        show={this.state.projectModal}
        onHide={() => this.setState({projectModal: false})}
        >
        <Modal.Header closeButton>
          <Modal.Title>
            {project !== null ? <p className = "display-project-name">{project.project_name}</p> : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {project !== null ? <img alt ="" src ={project.image_link} className = "display-project-image"/> : null}
          {
            project !== null ? 
            <form onSubmit = {this.editDescriptionHandler}>
              <textarea className = "display-project-desc">
              {project.project_description}</textarea> 
              <button className = "change-personal-info-btn">Save</button>
            </form>
            : null
          }
        </Modal.Body>
        </Modal>
        </>
      )
    }

    addProjectToState = (project) => {
      if(project.projectName && project.projectName.length > 0){
        const newProjectArray = [...this.state.projects, project];
        this.setState({projects: newProjectArray})
      }
    }

    handleClose = (event) => {
      if(event){
        event.preventDefault();
      }
      const newProject = {
        project_name: this.state.projectName.toLowerCase(),
        github_link: this.state.gitHubLink,
        image_link: this.state.imageLink,
        project_description: this.state.projectDescription
      }
      this.addProjectToState(newProject)
      postProjectToDB(newProject)
      this.setState({modalShow: false})
    };

    handleShow = () => {
        this.setState({modalShow: true})
    };

    changeHandler = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }

    createProjectModal() {
      
        return (
          <>
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Yay, New Project!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form  onSubmit={this.handleClose}>
                <label>Name</label>
                <input className = "project-name-input"
                placeholder = "Project Name"
                name = "projectName"
                required
                value = {this.state.projectName}
                onChange ={this.changeHandler}
                />
                <label>GitHub</label>
                <input className = "project-name-input"
                placeholder = "GitHub link"
                name="gitHubLink"
                required
                value = {this.state.gitHubLink}
                onChange ={this.changeHandler}
                />
                <label>Image</label>
                <input className = "project-name-input"
                placeholder = "Image Link"
                name ="imageLink"
                required
                value = {this.state.imageLink}
                onChange ={this.changeHandler}
                />
                <label>Description</label>
                <textarea className = "project-name-input"
                placeholder = "Project Description"
                name="projectDescription"
                required
                value = {this.state.projectDescription}
                onChange ={this.changeHandler}
                />
                <input type="submit" className = "modal-create-project-btn"
                  value ="Create Project"
                />
              </form>
              </Modal.Body>
            </Modal>
          </>
        );
      }
      

    componentDidMount(){
        this.setState({projects: this.props.projects})
    }
    render(){
        return(
            
            <div className="projects-main-container">
                {this.createProjectModal()}
                {this.displayProjectModal()}
                <p className = "project-container-heading">Projects</p>
                <div className ="add-new-project-btn" onClick={this.handleShow}>&#x2b;</div>

                <div className="projects-container" >
                    {
                        this.state.projects !== null ? this.renderProjects(): null
                    }
                </div>

                
            </div>
        )
    }
}