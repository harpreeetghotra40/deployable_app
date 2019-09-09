import React,{Component} from 'react'
import { Modal} from 'react-bootstrap';
import '../stylesheets/DeveloperProjects.css'

export default class Projects extends Component{
    state = {
        projects: null,
        displayThisProject: null,
        projectModal: false,
        devName: this.props.query
    }

  renderProjects = () => {
      return this.state.projects.map(project => 
          <div className = "project" key = {project.project_name}>
              <img src = {project.image_link} alt ="" className = "project-image" />
              <p className = "project-name" onClick = {this.displayProject} data-key = {project.project_name}>
                {project.project_name}
                <a href={project.github_link}><img className = "project-git-link" target="_blank" alt ="" src="https://image.flaticon.com/icons/svg/25/25231.svg" /></a>
              </p>
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
          {
            project !== null ? 
            <p className = "display-project-name">{project.project_name}</p> 
            : null
          }
        </Modal.Title>
        { this.props.query !== null && <p className = "dev-name">{this.props.query}</p>}
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

    getAllProjects = () => {
      fetch(`http://localhost:3000/projects?user=${this.props.query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }).then(res => res.json())
        .then(projects => this.setState({projects: projects}))
    }

    componentDidMount(){
      this.getAllProjects();
    }

    componentDidUpdate(prevProps) {
      if(!(this.props.query === prevProps.query)) // Check if it's a new user, you can also use some unique property
      {
        this.getAllProjects();
      }
    }

    getDevInfo = () => {
      return <div className = "dev-info-container">
                <h3 className = "dev-info-name">{this.props.devDesc.name}</h3>
                <p>{this.props.devDesc.about_me}</p>
            </div>
    }

    render(){
        return(
            <div className="developer-projects-main-container">
                {this.displayProjectModal()}
                <div>
                  {this.props.devDesc !== null && this.getDevInfo()}
                </div>
                <p className = "developer-project-container-heading">Projects</p>
                <div className="developer-projects-container" >
                    {
                        this.state.projects !== null ? this.renderProjects(): null
                    }
                </div>

                
            </div>
        )
    }
}