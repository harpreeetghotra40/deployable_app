import React,{Component} from 'react'
import { Modal} from 'react-bootstrap';
import '../stylesheets/DeveloperProjects.css'

export default class Projects extends Component{
    state = {
        projects: null,
        displayThisProject: null,
        projectModal: false
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
    const projectName = event.target.dataset.key.toLowerCase();
    const reqproject = this.state.projects.filter(project => project.project_name === projectName)
    this.displayProjectShow(reqproject[0])
  }

  displayProjectShow = (project) => {
    this.setState({displayThisProject: project})
    this.setState({projectModal: true})
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
            <div className = "display-project-desc">
            {project.project_description}
            </div> 
          : null
        }
      </Modal.Body>
      </Modal>
      </>
    )
  }


    componentDidMount(){
      fetch("http://localhost:3000/projects", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(projects => this.setState({projects: projects}))
    }

    render(){
        return(
            <div className="developer-projects-main-container">
                {this.displayProjectModal()}
                <p className = "developer-project-container-heading">Top Projects</p>
                <div className="developer-projects-container" >
                    {
                        this.state.projects !== null ? this.renderProjects(): null
                    }
                </div>

                
            </div>
        )
    }
}